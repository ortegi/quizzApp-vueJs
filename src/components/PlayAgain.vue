<script setup>
import { useRouter } from 'vue-router';


const router = useRouter()

const playAgain = () =>{
    router.push('/game')
}


</script>

<template>
  <button @click="playAgain" class="btn btn-primary btn-lg btn-block">Play Again</button>

</template>