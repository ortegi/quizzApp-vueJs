<template>
    <TheResults :result="isLostDaGame" :scorex="score" :failsx="fails"/>

   <table class="table mt-4" v-if="documents" >
    <thead>
        <tr>
        <th scope="col">#</th>
        <th scope="col">User</th>
        <th scope="col">Score</th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="(doc, index) in documents">
        <th scope="row">{{ index }}</th>
        <td>{{ doc.name }}</td>
        <td>{{ doc.points }}</td>
        </tr>
        
    </tbody>
</table>
    <div v-if="loader">
        <loader/>
    </div>
<PlayAgain class="mt-4"/>

</template>

<script setup>
import PlayAgain from '../components/PlayAgain.vue';
import TheResults from '../components/TheResults.vue'
import Loader from '../components/Loader.vue';
import { useUserStore  } from '../stores/user';
import { storeToRefs } from 'pinia';


const useScore = useUserStore()
const { readDocs } = useScore
const { score, fails,  isLostDaGame, documents, loader } = storeToRefs(useScore)


    setTimeout(readDocs, 3000)



</script>

