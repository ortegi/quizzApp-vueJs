<template>
    <form @submit.prevent="handleSubmit">
        <input type="email" placeholder="email" class="mt-2" v-model.trim="email"> <br>
        <input type="password" placeholder="password"  class="mt-2" v-model.trim="password"> <br>
        <button type="submit" class="btn btn-primary mt-3">Login </button>
    </form>
    <signInGoogle class="mt-3"/>
    <p class="mt-3 p-text">Still don't have an account? <a @click="goToLogin" class="text-decoration-underline">Register</a></p>
</template>

<script setup>
import { ref } from 'vue'
import { useUserStore } from "../stores/user";
import { useRouter} from 'vue-router'
import signInGoogle from '../components/signInGoogle.vue';
const router = useRouter()

const userStore = useUserStore()
const { loginUser, currentUser } = userStore;

const email = ref('')
const password = ref('')


const goToLogin = () =>{
    router.push('/')
}

const handleSubmit = () =>{
    loginUser(email.value, password.value)
    currentUser()
}

</script>