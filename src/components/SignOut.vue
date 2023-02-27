<script setup>
import { useUserStore } from '../stores/user';

const userStore = useUserStore()
const { singOutUser } = userStore
</script>

<template>
    <i class="fa-solid fa-xmark fa-xl mt-3" @click="singOutUser"></i>
</template>

<style scoped>
i.fa-solid{
    color:#B4B4B4;
}

</style>