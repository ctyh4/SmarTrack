<template v-if="user">
    <Sidebar/>
    <HomeButton/>
    <div class="container"> 
        <div class ="nav">
            <router-link to = "/transactions"> Transactions </router-link> |
            <router-link to = "/budgeting"> Budgeting </router-link> |
            <router-link to = "/analysis"> Analysis </router-link>
        </div>
        <router-view/>
        <div class="page-title">
            <h1> Transaction History </h1>
        </div>
    </div>
    
</template>

<script>
import HomeButton from '@/components/HomeButton.vue';
import Sidebar from '@/components/Sidebar.vue';

export default {
    components: {
        HomeButton,
        Sidebar
    },
}
</script>

<style scoped>
.container {
    margin-left: auto;
    margin-right: auto;
    padding: 30px;
}

.page-title{
    text-align: center;
}

.nav{
    margin-left: auto;
    margin-right: auto;
    padding : 30px
}

.nav a {
  font-weight : bold;
  color: #7F56D9;
}

</style>