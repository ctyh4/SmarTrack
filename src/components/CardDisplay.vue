<template>
  <div class="container">
    <div class="card-display">
        <div class="card-image-container">
            <img :src="imageUrl" :alt="card.id" class="card-image" />
        </div>

      <button class="card-details">
        <h2 class="card-title" @click="learnMore(card)">{{ card }}</h2>
      </button>

      <button class = "delete-btn" @click="deleteCard" style="font-size: 14px;">
            <img class = "delete-icon" src = "./../assets/delete_button.png">
        </button>
    </div>
  </div>
</template>
  
<script>
import SmarTrack from "@/assets/SmarTrack.png";

export default {
    props: {
      card: {
        type: Object,
        required: true,
      },
    },
    data() {
      return {
        imageUrl: SmarTrack, // Default image
      };
    },
    created() {
        this.setImageUrl(this.card); 
    },
    methods: {
      async deleteCard() {
        if (confirm(`Are you sure you want to delete the card "${this.card}"?`)) {
        this.$emit('delete-card', this.card, this.index);
      }
    },
    learnMore(cardId) {
      this.$router.push({
        name: "Indv Card",
        params: { cardId: cardId },
      });
    },
      async setImageUrl(cardId) {
      try {
        const image = await import(`@/assets/${cardId}.webp`);
        this.imageUrl = image.default; // Update the data property with the loaded image
      } catch (e) {
        console.error(e);
        this.imageUrl = SmarTrack; // Fallback if the image fails to load
      }
    },
    }
  }
  </script>
  
<style scoped>
.card-container {
  border: 1px solid #e0e0e0; 
  border-radius: 10px;
  width: 100%;
  overflow: hidden;
  background: #fff;
  margin-bottom: 1rem;
}

  .card-display {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    height: 130px;
    justify-content: space-between;
    padding: 1rem;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    /* overflow: hidden; */
    transition: box-shadow 0.3s ease;
  }
  
  .card-display:hover {
    box-shadow: 0 6px 12px rgba(0,0,0,0.15);
  }

  /* .card-image-container {
  width: 100%;
  height: 100px;
  padding-top: 50%;
  position: relative; 
  align-content: center;
} */

.card-image {
  flex-shrink: 0;
  margin-left: 10px;
  margin-top: 10px;
  width: 190px;
  height: 120px;
  justify-content: flex-start;
  align-items: center;
  border-radius: 5px;
  /* max-width: 90%;
  max-height: 80%; 
  transform: translate(-50%, -50%); */
}
  
  .card-details {
    padding: 20px;
    font-family: pjs;
    font-size: 20px;
    text-align: left;
    width: 500px;
    background-color: white;
    border: transparent;
    cursor: pointer;
  }
  
  .card-title {
    font-size: 20px;
    align-items: center;
    justify-content: flex-start;
    margin-left: 10px;
    left: 10px;
  }
  
  .delete-btn {
    background-color: white;
    border: none;
    margin-right: 10px;
    padding: 0.5rem 1rem;
    cursor: pointer;
    border-radius: 5px;
    cursor: pointer;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  .delete-icon {
    width: 17px;
    height: 22px;
  }

.delete-btn:hover {
  background-color: transparent;
  opacity: 0.3;
}
  </style>
  