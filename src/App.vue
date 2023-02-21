<script setup>
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';


const router = useRouter()

onMounted( () =>{
    router.push('/')
})

</script>


<template>  
  <div class="container">
    <router-view> </router-view>
  </div>

</template>