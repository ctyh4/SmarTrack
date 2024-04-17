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
  </template>
  
<script>
    import firebaseApp from "../firebase.js";
    import { getFirestore, getDocs, collection } from "firebase/firestore";
    const db = getFirestore(firebaseApp);

    export default {
        name: "PaymentForm",
        data() {
        return {
            paymentAmount: 0,
            recipients: [],
            recipient: '',
            categories: [],
            category: ''

        };
        },
        mounted() {
            // Retrieve recipients from Firestore when the component is mounted
            this.getRecipients();
            this.getCategories();
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
            findBestCard() {
              console.log("Found best card")
            },
            submitForm() {
                // Here you can handle the form submission, for example, by sending the data to an API
                console.log('Payment Amount:', this.paymentAmount);
                console.log('Recipient:', this.recipient);
                console.log('Category:', this.category);
                
                // Reset form fields after submission
                this.paymentAmount= 0,
                this.recipient= '',
                this.category= ''
            }
        },
        watch: {
            recipient(newValue) {
              // Watcher for recipient changes
              if (newValue && this.category) {
                this.findBestCard();
              }
            },
            category(newValue) {
              // Watcher for category changes
              if (newValue && this.recipient) {
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
  