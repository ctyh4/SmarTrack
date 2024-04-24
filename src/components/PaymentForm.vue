<template>
  <div class="header">
    <h2>Making a payment?<br> 
    Fill in the details and our algorithm 
    will choose the best card for you to use!</h2>
    
    <br><br>
  </div>
  
    
    <form @submit.prevent="submitForm">
    <div class="form-group">
      
      <label for="paymentAmount">Payment Amount:</label>
      <input
        type="number"
        id="paymentAmount"
        v-model="paymentAmount"
        required
      />
      <br><br>

    
      <label for="selectRecipient">Recipient:</label>
      <select id="selectRecipient" v-model="recipient" required>
        <option value="">Select a Recipient</option>
        <option
          v-for="recipient in recipients"
          :key="recipient"
          :value="recipient"
        >
          {{ recipient }}
        </option>
      </select>
      <br><br>
    

    
      <label for="selectCategory">Category:</label>
      <select id="selectCategory" v-model="category" required>
        <option value="">Select a Category</option>
        <option
          v-for="category in categories"
          :key="category"
          :value="category"
        >
          {{ category }}
        </option>
      </select>
      <br><br>
    

    
      <label for="selectCard">Selected Card:</label>
      <select id="selectCard" v-model="card" required>
        <option value="">Select a Card</option>
        <option v-for="card in cards" :key="card" :value="card">
          {{ card }}
        </option>
      </select>
    </div> 
    <div class = "submit">
      <button type="submit">Submit</button>
    </div>
  </form>
  

  <div v-if="bestCardInfo && bestCB">
    <h2 id="reco">
      We recommend you to use the {{ bestCardInfo }} <br> with total cashback of ${{ bestCB }}
    </h2>
    <div class="card-image-container">
      <img :src="imageUrl" :alt="card.id" class="card-image" />
    </div>
    <br><br>

  </div>
   
</template>

<script>
import firebaseApp from "../firebase.js";
import SmarTrack from "@/assets/SmarTrack.png";
import {
  getFirestore,
  getDocs,
  collection,
  getDoc,
  doc,
  Timestamp,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
const db = getFirestore(firebaseApp);
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default {
  name: "PaymentForm",
  data() {
    return {
      imageUrl: SmarTrack,
      paymentAmount: 0,
      recipients: [],
      recipient: "",
      categories: [],
      category: "",
      user: false,
      bestCardInfo: "",
      bestCB: "",
      card: "",
      cards: [],
    };
  },
  mounted() {
    // Retrieve recipients from Firestore when the component is mounted
    this.getRecipients();
    this.getCategories();
    this.getCards();
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user;
      }
    });
  },
  methods: {
    async getRecipients() {
      try {
        const querySnapshot = await getDocs(collection(db, "Companies"));
        console.log(querySnapshot);
        querySnapshot.forEach((doc) => {
          // Push each recipient to the recipients array
          this.recipients.push(doc.id);
        });
      } catch (error) {
        console.error("Error getting recipients: ", error);
      }
    },
    async getCategories() {
      try {
        const querySnapshot = await getDocs(collection(db, "Categories"));
        console.log(querySnapshot);
        querySnapshot.forEach((doc) => {
          // Push each recipient to the recipients array
          this.categories.push(doc.id);
        });
      } catch (error) {
        console.error("Error getting categories: ", error);
      }
    },
    async getCards() {
      try {
        const auth = getAuth();
        onAuthStateChanged(auth, async (user) => {
          if (user) {
            this.user = user;
            const userEmail = String(user.email);
            const userDocRef = doc(db, "Users", userEmail);
            //console.log(userDocRef);
            const userDocSnap = await getDoc(userDocRef);
            const addedCards = userDocSnap.data().Inventory;
            this.cards = addedCards;
          }
        });
      } catch (error) {
        console.error("Error getting user document: ", error);
      }
    },

    async findBestCard() {
      try {
        console.log("Found best card");
        // Check through each card
        // give each card a number that represents the total cashback (including the company as well)
        // if number>current best, replace best card with that
        // if cb cap is true and cb cap has been met, disqualify
        // if min spend has not been met, automatically throw into best card
        // return best card
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth() + 1;
        const date = `${year}-${month}`;
        console.log(this.user);

        const userEmail = String(this.user.email);
        console.log(userEmail);
        const userDocRef = doc(db, "Users", userEmail);
        console.log(userDocRef);
        const userDocSnap = await getDoc(userDocRef);
        const addedCards = userDocSnap.data().Inventory;
        console.log(addedCards);

        const companyDocRef = doc(db, "Companies", String(this.recipient));
        const companyDocSnap = await getDoc(companyDocRef);
        const companyCBCards = companyDocSnap.data().CB; //Returns a dictionary of cards that are compatible with the company
        console.log(companyCBCards);

        let bestCard = null;
        let bestCashback = 0;

        //Iterate over each card in addedCards
        for (const cardId of addedCards) {
          let cardDocRef = doc(db, "Cards", cardId);
          let cardDocSnap = await getDoc(cardDocRef);
          let currentCashback = 0;

          if (cardDocSnap.data().Type == "DC") {
            //When card is a debit card, no need to worry about CB cap or minspend. Just calculate rebate
            currentCashback =
              (this.paymentAmount * cardDocSnap.data().Data.RebatePercent) /
              100;
            if (companyCBCards) {
              if (cardId in companyCBCards) {
                currentCashback +=
                  (this.paymentAmount * companyCBCards[cardId]) / 100;
              }
            }
          } else if (cardDocSnap.data().Type == "CC") {
            currentCashback =
              (this.paymentAmount * cardDocSnap.data().Data.CBPercent) / 100;
            console.log(currentCashback);
            if (companyCBCards) {
              if (cardId in companyCBCards) {
                currentCashback +=
                  (this.paymentAmount * companyCBCards[cardId]) / 100;
              }
            }
            //handle logic for cb cap is true and cb cap has been met, disqualify and if min spend has not been met, use it automatically
            if (cardDocSnap.data().Data.CBCap == true) {
              //check for current cb cap
              let current =
                userDocSnap.data().CardsWithCBCap[cardId][date].Current;
              //console.log(current)
              let limit = userDocSnap.data().CardsWithCBCap[cardId][date].Limit;
              //console.log(limit)
              if (current >= limit) {
                continue;
              }
              //if cashback met, continue. else, move on to next part.
              //We can safely assume cards that have met CB Limit would have met minspend, and hence have no value in being chosen
            }
            if (cardDocSnap.data().Data.MinSpend == true) {
              let spend =
                userDocSnap.data().CardsWithMinSpend[cardId][date].Current;
              //console.log(spend)
              let target =
                userDocSnap.data().CardsWithMinSpend[cardId][date].Target;
              //console.log(target)
              if (spend < target) {
                console.log(
                  `inside spendtarget if, ${bestCashback}, ${currentCashback}`
                );
                bestCard = cardId;
                bestCashback = currentCashback;
                console.log(
                  `Best card is ${bestCard} with cashback of $${bestCashback}, inside minspend check`
                );
                this.bestCardInfo = bestCard;
                this.bestCB = bestCashback;
                const image = await import(`@/assets/${cardId}.webp`);
                this.imageUrl = image.default;
              }
              // check if minspend is met
              //automatically qualify this card to be best card if minspend not met
            }
          }

          if (currentCashback > bestCashback) {
            bestCard = cardId;
            bestCashback = currentCashback;
          }
        }
        console.log(
          `Best card is ${bestCard} with cashback of $${bestCashback}`
        );
        this.bestCardInfo = bestCard;
        this.bestCB = bestCashback.toFixed(2);
        const image = await import(`@/assets/${bestCard}.webp`);
        this.imageUrl = image.default;
      } catch (error) {
        console.error("Error finding card: ", error);
        this.imageUrl = SmarTrack;
      }
    },

    async updateTransaction() {
      try {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth() + 1;
        const date = `${year}-${month}`;
        console.log(this.user);

        const userEmail = String(this.user.email);
        const userDocRef = doc(db, "Users", userEmail);
        const userDocSnap = await getDoc(userDocRef);

        const companyDocRef = doc(db, "Companies", this.recipient);
        const companyDocSnap = await getDoc(companyDocRef);
        const companyCBCards = companyDocSnap.data().CB; //Returns a dictionary of cards that are compatible with the company

        let cardCB = 0;

        let cardDocRef = doc(db, "Cards", this.card);
        let cardDocSnap = await getDoc(cardDocRef);

        if (cardDocSnap.data().Type == "DC") {
          //When card is a debit card, no need to worry about CB cap or minspend. Just calculate rebate
          cardCB =
            (this.paymentAmount * cardDocSnap.data().Data.RebatePercent) / 100;
          if (companyCBCards) {
            if (this.card in companyCBCards) {
              cardCB += (this.paymentAmount * companyCBCards[this.card]) / 100;
            }
          }
        } else if (cardDocSnap.data().Type == "CC") {
          cardCB =
            (this.paymentAmount * cardDocSnap.data().Data.CBPercent) / 100;
          if (companyCBCards) {
            if (this.card in companyCBCards) {
              cardCB += (this.paymentAmount * companyCBCards[this.card]) / 100;
            }
          }
          //handle logic for cb cap is true and cb cap has been met, disqualify and if min spend has not been met, use it automatically
          if (cardDocSnap.data().Data.CBCap == true) {
            //check for current cb cap
            let current =
              userDocSnap.data().CardsWithCBCap[this.card][date].Current;
            //console.log(current)
            let limit =
              userDocSnap.data().CardsWithCBCap[this.card][date].Limit;
            //console.log(limit)
            if (current >= limit) {
              cardCB = 0;
            } else if (current + cardCB > limit) {
              cardCB = limit - current;
              let updatedCB = limit;
              await updateDoc(userDocRef, {
                [`CardsWithCBCap.${this.card}.${date}.Current`]: updatedCB,
              });
            } else {
              let updatedCB = cardCB;
              await updateDoc(userDocRef, {
                [`CardsWithCBCap.${this.card}.${date}.Current`]: updatedCB,
              });
            }
          }
          //if cashback limit met, no CB will be awarded
          //if after spending, upcoming CB reward and current CB reward exceeds limit, upcoming CB reward will be the difference between limit and curret
          //Eg Limit is 500, current is 490. Even if CB reward is 50, the max CB you will receive is 500-490
          //We can safely assume cards that have met CB Limit would have met minspend, and hence have no value in being chosen

          if (cardDocSnap.data().Data.MinSpend == true) {
            let currentspend =
              userDocSnap.data().CardsWithMinSpend[this.card][date].Current;
            currentspend += this.paymentAmount;
            await updateDoc(userDocRef, {
              [`CardsWithMinSpend.${this.card}.${date}.Current`]: currentspend,
            });
          }
        }
        const nowDate = new Date();
        const formattedNowDate = `${nowDate.getFullYear()}-${(
          nowDate.getMonth() + 1
        )
          .toString()
          .padStart(2, "0")}-${nowDate
          .getDate()
          .toString()
          .padStart(2, "0")}T${nowDate
          .getHours()
          .toString()
          .padStart(2, "0")}:${nowDate
          .getMinutes()
          .toString()
          .padStart(2, "0")}`;
        const newTransaction = {
          amount: this.paymentAmount,
          category: this.category,
          recipient: this.recipient,
          card: this.card,
          timestamp: formattedNowDate,
          cardCB: cardCB,
        };

        // Add new transaction to the Transactions array using arrayUnion
        await updateDoc(userDocRef, {
          Transactions: arrayUnion(newTransaction),
        });
      } catch (error) {
        console.error("Error updating Transactions: ", error);
      }
    },
    submitForm() {
      // Here you can handle the form submission, for example, by sending the data to an API
      console.log("Payment Amount:", this.paymentAmount);
      console.log("Recipient:", this.recipient);
      console.log("Category:", this.category);

      if (this.card !== this.bestCardInfo) {
      // If the selected card is not the best card, ask for confirmation
      const proceed = window.confirm("The selected card is not the best card for this transaction. Do you want to proceed?");
      if (!proceed) {
        return; // Stop further execution if the user chooses not to proceed
      }
    }

      this.updateTransaction()
        .then(() => {
          // Reset form fields after successful submission
          this.paymentAmount = 0;
          this.recipient = "";
          this.category = "";
          this.card = ""; 
          this.imageUrl= SmarTrack;
          this.bestCardInfo= "";
          this.bestCB= "";
          window.alert("Transaction submitted successfully!");
        })
        .catch((error) => {
          console.error("Error submitting form:", error);
          // Optionally, provide feedback to the user about the error
        });
    },
  },
  watch: {
    recipient(newValue) {
      // Watcher for recipient changes
      if (newValue && this.category && this.paymentAmount > 0) {
        this.findBestCard();
      }
    },
    category(newValue) {
      // Watcher for category changes
      if (newValue && this.recipient && this.paymentAmount > 0) {
        this.findBestCard();
      }
    },
    paymentAmount(newValue) {
      if (newValue && this.recipient && this.category) {
        this.findBestCard();
      }
    },
  },
};
</script>

<style scoped>
.header {
  text-align: center;
}

label {
  font-weight: bold;
  display:block;
}


.form-group {
  margin-bottom: 1rem;
  display: block;
  text-align: center;
}

form {
  text-align: center;
  align-items: center;
  margin: auto;
}

input:hover {
  box-shadow: 3px 3px plum;
  border-radius: 2px;
}

.submit{
  text-align: center;
}
      
option {
  text-align: center; 
}

input{
  text-align: center; 
}
</style>

