<template>  
<div class="row">
    <div class="col-12">
        <form @submit.prevent="handleSubmit">
            <p class="mt-1">Select a category!</p>
            <div class="theSelectDiv">
                <select id="categories" name="categories"  class="mt-2" v-model="category">
                    <option v-for="cat in listOfCategories" :value="cat">{{ cat }}</option>
                </select>
            </div>
            <p class="mt-3">Easy or Hard??</p>
           <div class="theSelectDiv"> 
                <select id="dificulty" class="mt-2" v-model="levelOfDificulty">
                    <option v-for="item in dificulty"  :value="item">{{ item }}</option>
                </select>
           </div> 
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

const router = useRouter();
const userStore = useUserStore()
const { userData, currentQuizData } = storeToRefs(userStore)

const listOfCategories = ['Arts & Literature', 'Film & Tv', 'Food & Drink', 'General knowledge', 'Geography', 'History', 'Music', 
'Science', 'Society & Culture', 'Sport & Leisure']

const dificulty = ['easy', 'medium', 'hard']
const category = ref('Food & Drink')
const levelOfDificulty = ref('easy')

const emojis = {
  'Arts & Literature': "fa-solid fa-palette",
  'Film & Tv': "fa-solid fa-video",
  'Food & Drink': "fa-solid fa-utensils",
  'General knowledge': "fa-solid fa-graduation-cap",
  'Geography': "fa-solid fa-earth-asia",
  'History': "fa-solid fa-landmark",
  'Music': "fa-solid fa-music",
  'Science': "fa-solid fa-flask",
  'Society & Culture': "fa-solid fa-people-group",
  'Sport & Leisure': "fa-solid fa-person-snowboarding"
}


const handleSubmit = () =>{

    currentQuizData.value = {cat: category.value, level: levelOfDificulty.value, showCategory: emojis[category.value] }
    router.push('/quizz')
    console.log(currentQuizData.value)
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