<script setup>
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';
import { useUserStore} from './stores/user'
import SignOut from './components/SignOut.vue'

const userStore = useUserStore()
const { currentUser} = userStore
const router = useRouter()

onMounted( () =>{
  isLogedIn()
})

const isLogedIn = async() =>{
  const user = await currentUser()
  if(user){
    router.push('/home')
  }else{
    router.push('/')
  }
}
</script>


<template>  
  <div class="container" style="width: 100%;">
    <div class="row">
      <div class="col-2">
        <SignOut/>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <img src="/descarga.jpeg" width="200" class="mb-4">
      </div>
    </div>
    
    <div class="row">
      <div class="col-12 p-text">
        <router-view> </router-view>
      </div>
    </div>
   
     
    
  </div>

</template>

<style scoped>
  
img{
    border-radius: 50%;
}

@media only screen and (min-width: 800px) {
  .container{
    margin-top: 8vh;
  }
}
</style>