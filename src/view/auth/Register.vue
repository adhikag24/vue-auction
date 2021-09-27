<template>
  <div class="register">
    <h1>Register</h1>  
     <form @submit.prevent="Register">
        <input type="text" placeholder="Email" v-model="email"> 
        <input type="password" placeholder="Password" v-model="password">
        <input type="submit" value="Register">
        <p>Have an account? <router-link to="/login">Login here</router-link></p>
    </form> 
  </div>
</template>

<script>
import {onBeforeMount,ref} from 'vue';
import * as auth from '../../utils/firebase-auth.js'


export default {

    setup(){
        const email = ref("");
        const password = ref("");

    
        const Register = () => {
            auth.register(email.value, password.value)
        }
        return {
            Register,
            email,
            password
        }
    }

}
</script>

<style>

</style>