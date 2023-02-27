<script setup>
const props = defineProps(['result', 'scorex', 'failsx'])

console.log(props.result)
</script>

<template>
     <div class="row"> 
        <div class="col-12">
            <div v-if="!result">
                <h2 class="won fw-bold"> Game Won!</h2>
                <i class="fa-solid fa-trophy fa-2xl p-2"></i><br>
            </div>
            <div v-if="result">
                <h2 class="lost fw-bold"> Game Lost</h2>
            </div>
            
        </div>
    </div>

    <div class="row">
        <div class="score mt-3 col-12 d-flex">
            <div class="scoreSmall d-flex me-2 justify-content-center align-items-center">
                <i class="fa-solid fa-check me-2"></i>
                <p class="me-1">{{ scorex }}</p>
                <p class="me-2"> Correct </p>
            </div>
            <div class="scoreSmall d-flex justify-content-center align-items-center ">
                <i class="fa-solid fa-xmark me-2"></i>
                <p class="me-1">{{ failsx }}</p>
                <p>Incorrect </p>
            </div>
        </div>
    </div>
</template>

<style scoped>

.fa-trophy{
    color: #ffc300;
}

</style>