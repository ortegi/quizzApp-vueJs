<script setup>
import { ref } from 'vue';
import { useUserStore } from "../stores/user";
import { useRouter} from 'vue-router'
import signInGoogle from '../components/signInGoogle.vue';
const router = useRouter()

const userStore = useUserStore()
const { registerUser, currentUser } = userStore

const email = ref('')
const password = ref('')


const handleSubmit = () =>{
    registerUser(email.value, password.value)
    currentUser()
}

const goToLogin = () =>{
    router.push('/login')
}


</script>


<template>

    <form @submit.prevent="handleSubmit">
        <input type="email" placeholder="email" class="mt-2" v-model.trim="email"> <br>
        <input type="password" placeholder="password"  class="mt-2" v-model.trim="password"> <br>
        <button class="btn btn-primary btn-block mt-3">Register </button>
    </form>
    <signInGoogle class="mt-3"/>
    <p class="mt-3 text-center">Already have an account? <a @click="goToLogin" class="text-decoration-underline">Sign In</a></p>
    
</template>

<style scoped>


</style>