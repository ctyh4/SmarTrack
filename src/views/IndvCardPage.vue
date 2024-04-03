<template>
    <div class="container">
        <div class="main-container">
            <BackButton/>
            <HomeButton/>
            <IndvCard/>
        </div>
        <div class="compare-container">
            <button id="comparebutton" @click="compareCard()">Compare Cards</button>
        </div>
    </div>
    
</template>

<script>
import BackButton from "@/components/BackButton.vue"
import HomeButton from "@/components/HomeButton.vue"
import IndvCard from  "@/components/IndvCard.vue"
export default {
    name: "ProfilePage",
    components: {
        BackButton,
        HomeButton, 
        IndvCard
    },

    methods: {
        compareCard() {
            this.$router.push("/compare")
        },
    }
}
</script>

<style scoped>
#comparebutton {
    background-color: #7F56D9;
    color: white;
    border: transparent;
    padding: 5px;
    text-align: center;
    font-size: 16px;
    font-family: pjs;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border-radius: 5px
}

.main-container {
    align-items: center;
    align-content: center;
    justify-content: center;
    display: flex;
    flex-direction: column;
    margin: auto;
    margin-left: auto;
    margin-right: auto;
}
.container {
    margin-left: auto;
    margin-right: auto;
}
</style>