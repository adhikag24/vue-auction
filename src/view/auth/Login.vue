<template>
  <div class="login">
     <h1>Login</h1>
     <form @submit.prevent="Login">
        <input type="text" placeholder="Email" v-model="account.email"> 
        <input type="password" placeholder="Password" v-model="account.password">
        <input type="submit" value="Login">
        <p> Need an acccount? <router-link to="/register">Register here</router-link></p>
    </form> 
  </div>
</template>

<script>
import {reactive,onBeforeMount} from 'vue';
import * as auth from '../../utils/firebase-auth.js'

export default {   
    setup(){
        const account = reactive({
            email: '',
            password: '',
        });

      
        const Login = () => {
            console.log(account.email);
           auth.login(account.email, account.password)
        }

        return{
            Login,
            account
        }
    }
} 
</script>

<style>

</style>