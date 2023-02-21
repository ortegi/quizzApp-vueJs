<template>
    <button class="btn btn-primary" @click="signInGoogle"><i class="fa-brands fa-google"></i> Login with Google</button>
</template>


<script setup>
import { useUserStore } from '../stores/user';

const userStore = useUserStore()
const { signInGoogle } = userStore
</script>