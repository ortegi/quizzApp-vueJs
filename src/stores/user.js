import { defineStore} from 'pinia';
import { auth, db } from '../firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, GoogleAuthProvider,  signInWithPopup, onAuthStateChanged } from 'firebase/auth';
import { addDoc, collection, getDocs, doc, setDoc, updateDoc, getDoc } from "firebase/firestore/lite";
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { useToastify } from '../composables/Toastify'



export const useUserStore = defineStore("user", () =>{
    
    const { showMessage } = useToastify()
    //info about user
    const userData = ref('')
    //router
    const router = useRouter()
    //info about quizz
    const currentQuizData = ref({})
    //google
    const provider = new GoogleAuthProvider();
    //docs to be render
    const documents = ref([])
    //score
    const score = ref(0)
    const fails = ref(0)
    const isLostDaGame = ref('')
    const loader = ref('')


    const signInGoogle = async() =>{
        try{
            const credential = await signInWithPopup(auth, provider)
            userData.value = credential
            console.log(userData.value)
            router.push("/home")
        }catch(error){
            console.log(error)
        }
    }

    const registerUser = async (email, password) =>{
        try{
            const { user } = await createUserWithEmailAndPassword(auth, email, password)
            userData.value = {email: user.email, uid: user.uid}
            console.log(userData.value)
            router.push("/home")
        }catch(error){
            console.log(error.code)
            if(error.code === 'auth/email-already-in-use'){
                showMessage('Email already in use!', 'as')
            }else if(error.code == 'auth/weak-password'){
                showMessage('Password is too weak','ee')
            }
        }
    }

    const loginUser = async (email, password) =>{
        try{
            const { user }= await signInWithEmailAndPassword(auth, email, password)
            userData.value = { email: user.email, password: user.password}
            console.log(userData.value)
            router.push("/home")
        }catch(error){
            console.log(error.code)
            if(error.code === 'auth/user-not-found'){
                showMessage('Email is incorrect!', 'w')
            }else if(error.code === 'auth/wrong-password'){
                showMessage('Wrong Password!', 't')
            }
        }
    }

    const singOutUser = async () =>{
        try{
            await signOut(auth)
        }catch(error){
            console.log(error)
            userData.value = null
        }finally{
            router.push('/login')
        }
    }

    const currentUser = () =>{
        return new Promise((resolve, reject) => {
            const unsubscribe = onAuthStateChanged(auth, (user) =>{
                if(user){
                    userData.value = {
                        email: user.email,
                        uid: user.uid,
                        displayName: user.displayName
                    }
                    console.log(user, userData.value.uid)
                }
                
                resolve(user)
            },
            (e) => reject (e)
            );
            unsubscribe()
        })

    }

  
    //score 
   
    
    const setResult = (result) => {
        if(result == 'win'){
            isLostDaGame.value = false
        }else if(result == 'lost'){
            isLostDaGame.value = true
        }
    }


      //firestore
      const addNewDoc = async() => {
        console.log('okok')
        const userName = ref('')

        if(userData.value.displayName){
            userName.value = userData.value.displayName
            console.log('ok')
        }else{
            userName.value = userData.value.email
            console.log('elseok')
        }

        try{
            await setDoc(doc(db, "users", userData.value.uid), {
                uid: userData.value.uid,
                points: score.value,
                name: userName.value
            })
          
        }catch(error){
            console.log(error)
        }finally{

        }


    }


    const readDocs = async () => {
        loader.value = true
        console.log('readDOCS')
        documents.value = []
        try{
            const querySnapshot = await getDocs(collection(db, "users"));
            querySnapshot.forEach((doc) =>{
               documents.value.push({
                id: doc.id,
                ...doc.data(),
               })
            })
            documents.value = documents.value.sort((a, b) => b.points-a.points);
           
        }catch(error){
            console.log(error)
        }finally{
            loader.value = false
        }
    }

    const upDate = async () =>{
        console.log('update')
        try{
            const docRef= doc(db, "users", userData.value.uid)
            const docSnap = await getDoc(docRef)
            const oldScore = docSnap.data().points
            await updateDoc(docRef, {
                points: oldScore + score.value,
            })
          
        }catch(error){
            console.log(error)
        }
    }

    const existDoc = async () =>{
        console.log('existin')
        try{
            const docRef = doc(db, "users", userData.value.uid)
            const docSnap = await getDoc(docRef)
            if(docSnap.exists()){
                upDate()
                console.log('updating')
            }else{
                console.log('no such document')
                addNewDoc()
            }
        }catch(error){
            console.log(error)
        }
    }


    return{
        registerUser,
        userData, 
        loginUser, 
        singOutUser,
        currentQuizData,
        signInGoogle,
        currentUser,
        addNewDoc,
        score, 
        fails,
        isLostDaGame,
        setResult,
        readDocs,
        documents, 
        upDate,
        existDoc,
        loader
    }
})