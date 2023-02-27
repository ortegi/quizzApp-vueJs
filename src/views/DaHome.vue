<script setup>
import { useUserStore} from '../stores/user'
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import Loader from '../components/Loader.vue';
const userStore = useUserStore()
const { userData } = storeToRefs(userStore)
const router = useRouter()

const play = () =>{
    router.push('/game')
}



</script>

<template>

    <div v-if="userData">
        <h5 v-if="userData.displayName">Hi, {{ userData.displayName }}</h5>
        <h5 v-else> Hi, {{  userData.email }}</h5>
        <button class="btn btn-primary" @click="play"> Play!</button>
    </div>
   <div v-if="!userData">
        <loader/>
   </div>
    
     
</template>