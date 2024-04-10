<template>
    <div class="inventory">
        <!-- <table id="table" class="auto-index">
            <tr>
                
            </tr>
        </table><br><br> -->

        <div id="search-bar-container">
            <input id="search-bar" onkeyup="search()" type="text" name="search" placeholder="Search here">
 
            <ul id='list'>
              <li class="cards"><a href="#">OCBC Great Eastern Cashflow Credit Card</a></li>
              <li class="cards"><a href="#">OCBC Frank Debit Card</a></li>
              <li class="cards"><a href="#">HSBC Revolution Credit Card</a></li>
              <!-- <li class="cards"><a href="#">POSB Everyday Credit Card</a></li>
              <li class="cards"><a href="#">POSB Debit Card</a></li>
              <li class="cards"><a href="#">UOB UnionPay Platinum Card</a></li>
              <li class="cards"><a href="#">DBS Yuu Card</a></li>
              <li class="cards"><a href="#">DBS Live Fresh Card</a></li> -->
            </ul>
        </div> 
    </div>
</template>

<script>
import firebaseApp from '../firebase.js';
import { getFirestore } from 'firebase/firestore';
import{ collection, getDocs, doc, deleteDoc } from 'firebase/firestore';

const db = getFirestore(firebaseApp);

export default {
    mounted() {
        async function display() {
            let allDocuments = await getDocs(collection(db, "Cards"))

            let index = 1
            
            allDocuments.forEach((docs) => {
                let documentData = docs.data()

                let card = (documentData.Card)

                let table = document.getElementById("table")
                let row = table.insertRow(index)

                let cell1 = row.insertCell(0);
            })
        }
    }
}
</script>