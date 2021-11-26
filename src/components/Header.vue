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
            <!-- <router-link to="/" class="nav-item nav-link">Home</router-link> -->
            <!-- <router-link to="my-bid" class="nav-item nav-link">My Bid</router-link> -->
        </div>
        
        <SearchBar ></SearchBar> 
       
       <div class="d-flex flex-row bd-highlight mb-3">
         <div v-if="user != null">
            <div class="p-2 bd-highlight"><UserIconDropDown></UserIconDropDown></div>
          </div>
        
        <div class="p-2 bd-highlight"><form class="d-flex">
          <div v-if="user != null">
            <button class="btn btn-warning shadow" @click="Logout">Logout</button>
          </div>
          <div v-else>
             <router-link :to="{name: 'Login'}" tag="button" class="btn btn-success shadow">Login</router-link>
          </div>
        </form></div>
       
      </div>
    
        
    </div>
</nav>
 </div>
</template>

<script>
import SearchBar from './SearchBar.vue'
import UserIconDropDown from './UserIconDropDown.vue'
import * as auth from '../utils/firebase-auth'

export default {
    name: 'Header',
     components: {
      SearchBar,
      UserIconDropDown
    },
    props: {
        user: {},
    },
    methods: {
      Logout: function(){
        auth.signOut();   
      }
    }

    
}
</script>
