<template>  
<div class="row">
    <div class="col-2">
        <SignOut/>
    </div>
</div>
<div class="row mt-3">
    <div class="col-12">
        <form @submit.prevent="handleSubmit">
            <TheImage/>
            <p class="mt-3">Select a category!</p>
            <div class="theSelectDiv">
                <select id="categories" class="mt-2" v-model="category" >
                    <option v-for="cat in listOfCategories" >{{ cat }}</option>
                </select>
            </div>
            <p class="mt-3">Easy or Hard??</p>
           <div class="theSelectDiv"> 
                <select id="dificulty" class="mt-2" v-model="levelOfDificulty">
                    <option v-for="item in dificulty" >{{ item }}</option>
                </select>
           </div> 
            <p class="mt-3">How many questions?</p>
            <input type="range" min="10" max="20" step="1" v-model="NofQ" class="mt-2"/>
            <p> {{ NofQ }}</p>
            <button class="btn btn-primary btn-lg mt-3" type="submit"> Start!</button>
        </form>
    </div>
</div>
   

</template>

<script setup>
import { useUserStore} from '../stores/user';
import { storeToRefs } from 'pinia';
import { ref } from 'vue'
import { useRouter } from 'vue-router';
import SignOut from '../components/SignOut.vue';
import TheImage from '../components/TheImage.vue';

const router = useRouter();
const userStore = useUserStore()
const { userData, currentQuizData } = storeToRefs(userStore)

const listOfCategories = ['Arts & Literature', 'Film & Tv', 'Food & Drink', 'General knowledge', 'Geography', 'History', 'Music', 
'Science', 'Society & Culture', 'Sport & Leisure']

const dificulty = ['easy', 'medium', 'hard']

const NofQ = ref(10)
const category = ref('')
const levelOfDificulty = ref('')

const handleSubmit = () =>{
    currentQuizData.value = {numberOfQuestions: NofQ.value, cat: category.value, level: levelOfDificulty.value, showCategory: category.value }
    router.push('/quizz')
}

</script>

<style scoped>

    

    
.theSelectDiv select {
  background-color: #0D6efd;
  color: white;
  padding: 8px;
  width: 250px;
  border: none;
  font-size: 18px;
  box-shadow: 0 5px 25px rgba(0, 0, 0, 0.2);
  -webkit-appearance: button;
  appearance: button;
  outline: none;
  border-radius: 10px;
}

.theSelectDiv::before {
  content: "\f13a";
  position: absolute;
  top: 0;
  right: 0;
  width: 20%;
  height: 100%;
  text-align: center;
  font-size: 28px;
  line-height: 45px;
  color: rgba(255, 255, 255, 0.5);
  background-color: rgba(255, 255, 255, 0.1);
  pointer-events: none;
}

.theSelectDiv:hover::before {
  color: rgba(255, 255, 255, 0.6);
  background-color: rgba(255, 255, 255, 0.2);
}

.theSelectDiv select option {
  padding: 30px;
}

form{
    font-size: 18px;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}
</style>