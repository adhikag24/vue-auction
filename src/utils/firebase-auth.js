
import * as fb from './firebase.js'
import {useRouter, useRoute} from 'vue-router';



function checkAuth(){
    const router = useRouter();
    const route = useRoute();

    fb.getAuth().onAuthStateChanged((user) => {
      if(!user){
          router.replace('/login');
      } else if (route.path == "/login" || route.path == "/register"){
          router.replace('/');
      }
  })
}
    
 function getUserSession (){
    const auth = fb.getAuth();
    const user = auth.currentUser;
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        // ...
        console.log("test3",user);
        return user;
      } else {
        // No user is signed in.
        console.log("test4",user)
      }
 
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