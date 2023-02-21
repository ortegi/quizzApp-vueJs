import { defineStore} from 'pinia';
import { auth } from '../firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, GoogleAuthProvider,  signInWithPopup } from 'firebase/auth';
import { useRouter } from 'vue-router';
import { ref } from 'vue';


export const useUserStore = defineStore("user", () =>{
    
    const userData = ref('')
    
    const router = useRouter()
    const currentQuizData = ref({})
    const provider = new GoogleAuthProvider();

    const signInGoogle = async() =>{
        try{
            const credential = await signInWithPopup(auth, provider)
            userData.value = credential.user
            router.push("/game")
        }catch(error){
            console.log(error)
        }
    }

    const registerUser = async (email, password) =>{
        try{
            const { user } = await createUserWithEmailAndPassword(auth, email, password)
            userData.value = {email: user.email, uid: user.uid}
            console.log(userData.value)
            router.push("/game")
        }catch(error){
            console.log(error)
        }
    }

    const loginUser = async (email, password) =>{
        try{
            const { user }= await signInWithEmailAndPassword(auth, email, password)
            userData.value = { email: user.email, password: user.password}
            console.log(userData.value)
            router.push('/game')
        }catch(error){
            console.log(error)
        }
    }

    const singOutUser = async () =>{
        try{
            await signOut(auth)
        }catch(error){
            console.log(error)
            userData.value = {}
        }finally{
            router.push('/login')
        }
    }

    return{
        registerUser,
        userData, 
        loginUser, 
        singOutUser,
        currentQuizData,
        signInGoogle
    }
})