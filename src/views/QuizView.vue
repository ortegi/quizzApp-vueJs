<template>
    <div class="row mb-3">
        <div class="col-12 d-flex align-items-center justify-content-center flex-row">
            <i class="fa-regular fa-star fa-lg me-1"></i>
            <span class="me-2">{{ score }}</span>
            <i class="fa-regular fa-heart fa-lg me-1"></i>
            <span>{{ lives }}</span>
        </div>
    </div>
    <div class="row">
        <div class="col-12" v-if="!loader">
            <i :class="currentQuizData.showCategory"></i>
            <h4 class="mt-3 text-justify fw-bold category"> {{  currentQuestion.question }}</h4>
            <div class="d-flex flex-column">
                <button v-for="option in currentOptions" class="btn btn-primary btn-lg btn-block mt-2" @click="checkAnswer(option)"> {{ option }} </button> 
            </div>
        </div>
        <div class="col-12 mt-3" v-else>
            <Loader/>
        </div>
    </div>
</template>

<script setup>
import { useUserStore } from '../stores/user';
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue';
import { useRouter  } from 'vue-router';
import { useToastify } from '../composables/Toastify'
import Loader from '../components/Loader.vue';

const { showMessage } = useToastify()


//router
const router = useRouter()
//pinia Stores
const userStore = useUserStore()
const { existDoc, setResult } = userStore
const {  currentQuizData,  score, fails, isLostDaGame } = storeToRefs(userStore)

onMounted( ()=> {
    getQuestions()
    score.value = 0;
    fails.value = 0
})

const ListOfQuestions = ref([])
const currentQuestion = ref('')
const currentOptions = ref([])
const lives = ref(3)
const loader = ref('')


const getQuestions = async () =>{
    loader.value = true
    try{
        const res = await 
        fetch(`https://the-trivia-api.com/api/questions?categories=${currentQuizData.value.cat}&limit=10&difficulty=${currentQuizData.value.level}`)
        const jsonResponse = await res.json()
        console.log(jsonResponse)
        ListOfQuestions.value = jsonResponse
        manageQuestions()
    }catch(error){
        console.log(error)
    }finally{
        loader.value = false
    }
}


const manageQuestions = () =>{
    const randomNumber = Math.floor(Math.random() * ListOfQuestions.value.length);
    console.log(randomNumber);
    currentQuestion.value = ListOfQuestions.value[randomNumber];
    console.log(currentQuestion.value)
    ListOfQuestions.value.splice(randomNumber, 1)
    randomizeQuestions()
}


const randomizeQuestions = () =>{
    if(ListOfQuestions.value){
        currentOptions.value.push(currentQuestion.value.correctAnswer)
        for (let i = 0; i < currentQuestion.value.incorrectAnswers.length; i++ ){
            currentOptions.value.push(currentQuestion.value.incorrectAnswers[i])
        }
        currentOptions.value.sort(() => Math.random() - 0.5)
        console.log(currentOptions.value)
    }
}


const checkAnswer = (answer) =>{
    if(answer ===currentQuestion.value.correctAnswer ){
        score.value = score.value + 1
        showMessage(`+1!`)
    }else{
        fails.value = fails.value + 1
        lives.value = lives.value - 1
        showMessage(`-1!`, 'oo')
    }
    currentQuestion.value = []
    currentOptions.value = []
    checkGameState()
}

const checkGameState = () =>{
    if(lives.value == 0 ){
        showMessage('You lost!','lost')
        gameLost()
       
    }else if(ListOfQuestions.value.length <= 0){
        gameWin()
    }else{
        manageQuestions()
    }
}


const gameLost = () =>{
    existDoc()
    setResult('lost')
    router.push('/gameFinish')
}


const gameWin = () =>{
    existDoc()
    setResult('win')
    router.push('/gameFinish')
}


</script>

<style scoped>


.btn-primary{
    font-size: 17px;
    height: 60px;
}
.fa-star{
    color: #ffc300;
}

.fa-solid{
    font-size: 25px;
    color: #0d6efd;
}

.category{
    height: 100px;
    font-size: 20px;
}

h4.mt-3.text-justify.fw-bold.category {
    width: 100%;
    font-size: 18px;
}

</style>
