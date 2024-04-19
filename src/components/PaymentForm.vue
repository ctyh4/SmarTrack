<template>
    <div>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="paymentAmount">Payment Amount:</label>
          <input type="number" id="paymentAmount" v-model="paymentAmount" required>
        </div>

        <div class="form-group">
        <label for="selectRecipient">Recipient:</label>
        <select id="selectRecipient" v-model="recipient" required>
          <option value="">Select a Recipient</option>
          <option v-for="recipient in recipients" :key="recipient" :value="recipient">{{ recipient }}</option>
        </select>
        </div>

        <div class="form-group">
        <label for="selectCategory">Category:</label>
        <select id="selectCategory" v-model="category" required>
          <option value="">Select a Category</option>
          <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
        </select>
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
    <h2 id="reco">{{ bestCardInfo }}</h2>

  </template>
  
<script>
    import firebaseApp from "../firebase.js";
    import { getFirestore, getDocs, collection, getDoc, doc } from "firebase/firestore";
    const db = getFirestore(firebaseApp);
    import { getAuth, onAuthStateChanged } from "firebase/auth";
    
    export default {
        name: "PaymentForm",
        data() {
        return {
            paymentAmount: 0,
            recipients: [],
            recipient: '',
            categories: [],
            category: '' ,
            user: false,
            bestCardInfo: ''
        };
        },
        mounted() {
            // Retrieve recipients from Firestore when the component is mounted
            this.getRecipients();
            this.getCategories();
            const auth = getAuth();
            onAuthStateChanged(auth,(user)=> {
              if (user){
                this.user = user;
              }
           })
        },
        methods: {
            async getRecipients() {
                try {
                    const querySnapshot = await getDocs(collection(db, 'Companies'));
                    console.log(querySnapshot)
                    querySnapshot.forEach(doc => {
                    // Push each recipient to the recipients array
                    this.recipients.push(doc.id);
                    });
                } catch (error) {
                    console.error('Error getting recipients: ', error);
                }
                },
            async getCategories() {
                try {
                    const querySnapshot = await getDocs(collection(db, 'Categories'));
                    console.log(querySnapshot)
                    querySnapshot.forEach(doc => {
                    // Push each recipient to the recipients array
                    this.categories.push(doc.id);
                    });
                } catch (error) {
                    console.error('Error getting categories: ', error);
                }
            },
            async findBestCard() {
              try{
                console.log("Found best card")
                // Check through each card
                // give each card a number that represents the total cashback (including the company as well)
                // if number>current best, replace best card with that
                // if cb cap is true and cb cap has been met, disqualify
                // if min spend has not been met, automatically throw into best card
                // return best card
                const currentDate = new Date();
                const year = currentDate.getFullYear();
                const month = currentDate.getMonth() + 1;
                const date = `${year}-${month}`
                

                const userEmail = String(this.user.email);
                const userDocRef = doc(db, "Users", userEmail);
                console.log(userDocRef);
                const userDocSnap = await getDoc(userDocRef);
                const addedCards = userDocSnap.data().Inventory;
                console.log(addedCards);

                const companyDocRef = doc(db, "Companies", String(this.recipient));
                const companyDocSnap = await getDoc(companyDocRef);
                const companyCBCards = companyDocSnap.data().CB //Returns a dictionary of cards that are compatible with the company
                console.log(companyCBCards)

                let bestCard = null;
                let bestCashback = 0;
                
                //Iterate over each card in addedCards
                for (const cardId of addedCards) {
                    let cardDocRef = doc(db, "Cards", cardId);
                    let cardDocSnap = await getDoc(cardDocRef);
                    let currentCashback = 0;

                    if (cardDocSnap.data().Type == "DC"){  //When card is a debit card, no need to worry about CB cap or minspend. Just calculate rebate
                      currentCashback = this.paymentAmount * cardDocSnap.data().Data.RebatePercent/100
                      if (cardId in companyCBCards) {
                        currentCashback += this.paymentAmount * companyCBCards[cardId]/100
                      }
                    }
                    else if (cardDocSnap.data().Type == "CC"){
                      currentCashback = this.paymentAmount * cardDocSnap.data().Data.CBPercent/100
                      console.log(currentCashback)
                      if (cardId in companyCBCards) {
                        currentCashback += this.paymentAmount * companyCBCards[cardId]/100
                        
                      }
                      //handle logic for cb cap is true and cb cap has been met, disqualify and if min spend has not been met, use it automatically
                      if (cardDocSnap.data().Data.CBCap == true){
                        //check for current cb cap 
                        let current = userDocSnap.data().CardsWithCBCap[cardId][date].Current
                        //console.log(current)
                        let limit = userDocSnap.data().CardsWithCBCap[cardId][date].Limit
                        //console.log(limit)
                        if (current >= limit){
                          continue
                        }
                        //if cashback met, continue. else, move on to next part. 
                        //We can safely assume cards that have met CB Limit would have met minspend, and hence have no value in being chosen
                      }
                      if (cardDocSnap.data().Data.MinSpend == true){
                        let spend = userDocSnap.data().CardsWithMinSpend[cardId][date].Current
                        //console.log(spend)
                        let target = userDocSnap.data().CardsWithMinSpend[cardId][date].Target
                        //console.log(target)
                        if (spend < target){
                          console.log(`inside spendtarget if, ${bestCashback}, ${currentCashback}`)
                          bestCard = cardId;
                          bestCashback = currentCashback
                          console.log(`Best card is ${bestCard} with cashback of ${bestCashback}, inside minspend check`)
                          this.bestCardInfo = `Best card is ${bestCard} with cashback of ${bestCashback}`
                        }
                        // check if minspend is met
                        //automatically qualify this card to be best card if minspend not met
                      }
                    }
            

                    if (currentCashback> bestCashback) {
                            bestCard = cardId;
                            bestCashback = currentCashback;
                    }
                }
                console.log(`Best card is ${bestCard} with cashback of ${bestCashback}`)
                this.bestCardInfo = `Best card is ${bestCard} with cashback of ${bestCashback}`;

              } catch (error){
                console.error('Error finding card: ', error);
              }
            },

            updateTransaction(){
              //update transaction into database
            },
            submitForm() {
                // Here you can handle the form submission, for example, by sending the data to an API
                console.log('Payment Amount:', this.paymentAmount);
                console.log('Recipient:', this.recipient);
                console.log('Category:', this.category);
                
                this.updateTransaction();

                // Reset form fields after submission
                this.paymentAmount= 0,
                this.recipient= '',
                this.category= ''
            }
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
            paymentAmount(newValue){
              if (newValue && this.recipient && this.category){
                this.findBestCard();
              }
            }
          }
    };
</script>
  
<style scoped>
  .form-group {
    margin-bottom: 1rem;
  }
</style>
  