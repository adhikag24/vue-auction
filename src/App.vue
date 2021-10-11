
<template>
  <Header v-bind:user="userData"></Header>
  <router-view></router-view>

</template>

<script>

import {onBeforeMount,ref} from 'vue';
import * as auth from './utils/firebase-auth.js'
import Header from './components/Header.vue'


export default {
    name: 'App',
    components: {
      Header,
    },

    

    setup(){
      const userData = ref("");
     onBeforeMount(async () => {
            auth.checkAuth();
            userData.value = await auth.getUserSession();

        });

        const Logout = () => {
            auth.signOut();
        }

        return{
          Logout,
          userData
        }

    }

}
</script>

<style >

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
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

