<template>
    <div class="container my-5">
        <div class="container-fluid d-flex justify-content-center">
            <div class="row mt-5" v-for="(transaction, index) in transactions" :key="index"> 
                <!-- <router-link 
                :to="{name: 'transaction.create'}"
                class="btn btn-primary btn-sm rounded shadow mb-3"
                >Add</router-link>

                <div class="card rounded shadow">
                    <div class="card-header">
                        Transaction List
                    </div>
                    <div class="card-body">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Amount</th>
                                    <th>Type</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(transaction, index) in transactions" :key="index">
                                    
                                    <td>{{transaction.title}}</td>
                                    <td>{{transaction.amount}}</td>
                                    <td>{{transaction.type}}</td>
                                    <td>
                                        <div class="btn-group">
                                            <router-link
                                            :to="{name: 'transaction.edit',params:{id: transaction.id}}"
                                            class="btn btn-sm btn-outline-info"
                                            >Edit
                                            </router-link>
                                            <button class="btn btn-sm btn-outline-danger"
                                            @click.prevent="destroy(transaction.id, index)"
                                            >
                                            Delete</button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div> -->

                <ProductCard v-bind:product="transaction"/>
                
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
            const transactionsCountRef = fb.ref(fb.db, 'transactions/');
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
