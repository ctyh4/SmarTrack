<template>
  <div class="card-item">
    <div class="card-image-container">
      <img :src="imageUrl" :alt="card.id" class="card-image" />
    </div>
    <div class="card-details">
      <h3 class="card-title">{{ card.id }}</h3>
      <button @click="learnMore(card.id)" class="learn-more-btn">
        Learn More
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
      imageUrl: SmarTrack, // Start with a default or fallback image
    };
  },
  created() {
    this.setImageUrl(this.card.id); // Set the image URL when the component is created
  },
  methods: {
    learnMore(cardId) {
      // Implement functionality for when 'Learn More' is clicked.
      // For example, you could emit an event or route to a detailed view.
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
  },
};
</script>

<style scoped>
.card-item {
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card-image-container {
  width: 100%;
  padding-top: 56.25%; /* 16:9 Aspect Ratio */
  position: relative;
}

.card-image {
  position: absolute;
  top: 50%;
  left: 50%;
  width: auto; /* Set width to auto to maintain image aspect ratio */
  max-width: 90%; /* Maximum width of the image, can be less */
  max-height: 80%; /* Maximum height of the image, adjust as needed */
  transform: translate(-50%, -50%);
}

.card-details {
  padding: 1rem;
  text-align: center;
}

.card-title {
  margin: 0.5rem 0;
}

.learn-more-btn {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
}

.learn-more-btn:hover {
  background-color: #0056b3;
  transform: translateY(-1px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}
</style>
