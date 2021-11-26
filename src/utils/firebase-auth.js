
import * as fb from './firebase.js'
import {useRouter, useRoute} from 'vue-router';



function checkAuth(){
    const router = useRouter();
    const route = useRoute();

    fb.getAuth().onAuthStateChanged((user) => {
      if(!user){
          // router.replace('/login');
      } else if (route.path == "/login" || route.path == "/register"){
          router.replace('/');
      }
  })
}
    
function getUserSession() {
  return new Promise((resolve) => {
    fb.auth.onAuthStateChanged((user) => {
      if (!user) {
        resolve(null);
      } else {
        resolve(user);
      }
    });
  });
}

function register(email,password){
    const auth = fb.getAuth()

    fb.createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        alert(userCredential);
      })
      .catch((error) => {
        alert(error)
      });
}

function signOut(){
    const auth = fb.getAuth()
    fb.signOut(auth)
    .then(() => console.log("Signed Out"))
    .catch(err => alert(err));
}

function login(email,password){
    const auth = fb.getAuth();
    fb.signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        console.log(userCredential)
    })
    .catch((error) => {
        console.log(error)
        alert(error)
    });
}

  export{
      checkAuth,
      register,
      signOut,
      login,
      getUserSession
  }