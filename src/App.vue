
<template>
  <div id="nav">
  <nav class="container navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="#">Logo Here</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <div class="navbar-nav me-auto">
            <router-link to="/" class="nav-item nav-link">Home</router-link>
            <router-link to="/About" class="nav-item nav-link">About</router-link>
            <router-link to="/Careers" class="nav-link">Careers</router-link>
            <router-link to="/Contact" class="nav-link">Contact</router-link>
        </div>
        <form class="d-flex">
            <button class="btn btn-warning shadow" @click="Logout" >Logout</button>
        </form>
    </div>
</nav>
 </div>
  <router-view></router-view>
</template>

<script>

import {onBeforeMount} from 'vue';
import * as auth from './utils/firebase-auth.js'

export default {
    name: 'App',

    setup(){
     onBeforeMount(() => {
            auth.checkAuth();
        });

        const Logout = () => {
            auth.signOut();
        }
        return{
          Logout
        }

    }

}
</script>

<style >

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

 #nav{
background: whitesmoke;
}
#nav {
  padding: 30px;
  text-align: center;
}
#nav a {
  font-weight: bold;
  color: #2c3e50;
}
#nav a.router-link-exact-active {
  color: whitesmoke;
  background: crimson;
  border-radius: .5rem;
}

</style>

