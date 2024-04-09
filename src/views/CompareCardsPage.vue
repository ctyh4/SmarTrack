<template>
    <BackButton/>
    <HomeButton/>
    <div class="compare-cards-container">
        <IndvCard class="card-column"/> <!---IndvCard: card-data="card1" class="card-column"--->
        <IndvCard class="card-column"/>
    </div>
</template>

<script>
import BackButton from "@/components/BackButton.vue"
import HomeButton from "@/components/HomeButton.vue"
import IndvCard from  "@/components/IndvCard.vue"
export default {
    name: "ComparePage",
    components: {
        BackButton,
        HomeButton, 
        IndvCard
    },
    data() {
        return {
            card1: {
                // card 1 data
            },
            card2: {
                // card 2 data
            }
        }
    }
}
</script>

<style scoped>
.compare-cards-container {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.card-column {
  width: 48%;
}
</style>