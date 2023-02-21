import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useScoreStore = defineStore('score', ()=>{

    const score = ref(0)
    const fails = ref(0)
    return {
        score, 
        fails
    }



})