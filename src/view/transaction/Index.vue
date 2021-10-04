<template>
<div class="container">
        <div class="container-fluid justify-content-center">
            <div class="row mt-5" > 
                <div class="col-sm-3" v-for="(transaction, index) in transactions" :key="index">
                    <ProductCard v-bind:product="transaction"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import {onBeforeMount, onMounted, ref} from 'vue'
import * as fb from '../../utils/firebase.js'
import ProductCard from '../../components/ProductCard.vue'

export default {
     components: {
      ProductCard,
    },

    setup() {
        //reactive state
        const name = ref("");
        let transactions = ref([]);
        const dbRef = fb.ref(fb.db);
        

       onBeforeMount(() => {
                fb.getAuth().onAuthStateChanged((user) => {
                    if(user){
                         console.log(user);
                        name.value = user.email.split('@')[0];
                    } 
                })
        });

        

        onMounted(() => {
            const transactionsCountRef = fb.ref(fb.db, 'products/');
            fb.onValue(transactionsCountRef, (snapshot) => {
                let data = snapshot.val();
                console.log('data:',data)
                transactions.value = data
            });

        
        });
    

        function destroy(id, index) {
            console.log(id);
             axios.delete(`https://crudcrud.com/api/4682bf7fdfa14d94a4eb20c7cdd18aef/transaction/${id}`
            )
            .then((result) => {
                transactions.value.splice(index, 1)
            }).catch((err) => {
                console.log(err.response.data)
            });
        }

        return {
            transactions,
            name    
            // destroy
        }
    }   
}

</script>
