<template>
    <div class="row">
        <div class="col-2">
            <SignOut/>
        </div>
    </div>
    <div class="row mt-3">
        <div class="col-12">
            <TheImage/>
        </div>
    </div>
    <div class="row"> 
        <div class="col-12">
            <h2 class="lost fw-bold"> Game Lost! </h2>
    
        </div>
    </div>
    
    <div class="row">
        <div class="score mt-3 col-12 d-flex">
            <div class="scoreSmall d-flex me-2 justify-content-center align-items-center">
                <i class="fa-solid fa-check me-2"></i>
                <p class="me-1">{{ score }}</p>
                <p class="me-2"> Correct </p>
            </div>
            <div class="scoreSmall d-flex justify-content-center align-items-center ">
                <i class="fa-solid fa-xmark me-2"></i>
                <p class="me-1">{{ fails }}</p>
                <p>Incorrect </p>
            </div>
        </div>
    </div>
  
   
    <PlayAgain class="mt-4"/>
   
</template>

<script setup>
import PlayAgain from '../components/PlayAgain.vue';
import SignOut from '../components/SignOut.vue'; 
import TheImage from '../components/TheImage.vue';
import { useScoreStore } from '../stores/score';
import { storeToRefs } from 'pinia';

const useScore = useScoreStore()
const { score, fails } = storeToRefs(useScore)
</script>

<style>



</style>