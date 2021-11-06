<template>
<div class="dropdown">
  <button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
    <i class="fas fa-user"></i>  {{name}}
  </button>
  <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
    <li><router-link 
                :to="{name: 'transaction.create'}"
                class="dropdown-item"
                >Request Product</router-link></li>
    <li><a class="dropdown-item" href="#">My Bids</a></li>
    <li><router-link 
                :to="{name: 'myproduct'}"
                class="dropdown-item"
                >My Products</router-link></li>
  </ul>
</div>
</template>

<script>

import {onBeforeMount,ref} from 'vue'
import * as auth from  '../utils/firebase-auth.js'

export default {
    name: 'UserIconDropDown',

   
    setup(){
      const userData = ref("");
      const name = ref("");

       onBeforeMount(async () => {
            userData.value = await auth.getUserSession();
                if(userData.value){
                        name.value = userData.value.email.split('@')[0];
                    } 
        });
     
        return{
          userData,
          name
        }

    }
}
</script>