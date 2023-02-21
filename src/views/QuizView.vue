<template>
    <div class="row">
        <div class="col-2">
            <SignOut/>
        </div>
        <div class="col-9 d-flex align-items-center justify-content-end flex-row">
            <i class="fa-regular fa-star fa-lg me-1"></i>
            <span class="me-2">{{ score }}</span>
            <i class="fa-regular fa-heart fa-lg me-1"></i>
            <span>{{ lives }}</span>
        </div>
     
        
    </div>
    <div class="row mt-3">
        <div class="col-12">
            <TheImage/>
        </div>
    </div>
    <div class="row">
        <div class="col-12">
            <h4> {{ currentQuizData.showCategory }}</h4>
            <h4 class="mt-3 text-justify fw-bold category"> {{  currentQuestion.question }}</h4>
            <div class="d-flex flex-column px-4">
                <button v-for="option in currentOptions" class="btn btn-primary btn-lg btn-block mt-2 " @click="checkAnswer(option)"> {{ option }} </button> 
            </div>
            
        </div>
    </div>
</template>

<script setup>
import { useUserStore } from '../stores/user'
import { useScoreStore } from '../stores/score';
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue';
import { useRouter  } from 'vue-router';
import TheImage from '../components/TheImage.vue';
import SignOut from '../components/SignOut.vue';
import { useToastify } from '../composables/Toastify'
const { showMessage } = useToastify()

//router
const router = useRouter()
//pinia Stores
const userStore = useUserStore()
const {  currentQuizData } = storeToRefs(userStore)

const useScore = useScoreStore()
const { score, fails } = storeToRefs(useScore)

onMounted( ()=> {
    getQuestions()
    score.value = 0;
    fails.value = 0
})

const ListOfQuestions = ref([])
const currentQuestion = ref('')
const currentOptions = ref([])
const lives = ref(3)


const checkInfo = () =>{
    if(currentQuizData.value.cat == 'Film & Tv'){
        currentQuizData.value.cat = 'film_and_tv'
    }else if(currentQuizData.value.cat == 'Arts & Literature'){
        currentQuizData.value.cat = 'arts_and_literature'
    }else if(currentQuizData.value.cat == 'Food & Drink'){
        currentQuizData.value.cat = 'food_and_drink'
    }else if(currentQuizData.value.cat == 'Society & Culture'){
        currentQuizData.value.cat = 'society_and_culture'
    }else if(currentQuizData.value.cat == 'sport & leisure'){
        currentQuizData.value.cat = 'sport_and_leisure'
    }
}

const getQuestions = async () =>{
    checkInfo()
    try{
        const res = await 
        fetch(`https://the-trivia-api.com/api/questions?categories=${currentQuizData.value.cat}&limit=${currentQuizData.value.numberOfQuestions}&difficulty=${currentQuizData.value.level}`)
        const jsonResponse = await res.json()
        console.log(jsonResponse)
        ListOfQuestions.value = jsonResponse
        manageQuestions()
    }catch(error){
        console.log(error)
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
    if(lives.value < 0 ){
        showMessage('You lost!','lost')
        gameLost()
       
    }else if(ListOfQuestions.value.length <= 0){
        gameWin()
        
    }else{
        manageQuestions()
    }
}

const gameLost = () =>{
    router.push('/gamelost')
}

const gameWin = () =>{
    router.push('/gamewon')
}
</script>

<style scoped>



.fa-star{
    color: #ffc300;
}

.category{
    height: 100px;
}
</style>
