<template>
      <div class="container my-5">
        <div class="row justify-content-center">
            <div class="col-8">
                <router-link 
                :to="{name: 'transaction.index'}"
                class="btn btn-primary btn-sm rounded shadow mb-3"
                >Back</router-link>

                <div class="card rounded shadow">
                    <div class="card-header">
                        Create Transaction
                    </div>
                    <div class="card-body">
                        <form @submit.prevent="update()">
                            <div class="mb-3">
                                <label for="" class="form-label">Title</label>
                                <input type="text" class="form-control" v-model="transaction.title">
                                <div v-if="validation.title" class="text-danger">
                                    {{validation.title}}
                                </div>
                            </div>
                               <div class="mb-3">
                                <label for="" class="form-label">Amount</label>
                                <input type="number" class="form-control" v-model="transaction.amount">
                                <div v-if="validation.amount" class="text-danger">
                                    {{validation.amount}}
                                </div>
                            </div>
                               <div class="mb-3">
                                <label for="" class="form-label">Time</label>
                                <input type="text" class="form-control" placeholder="yyyy-mm-dd hh:mm:ss" v-model="transaction.time">
                                <div v-if="validation.time" class="text-danger">
                                    {{validation.time}}
                                </div>
                            </div>
                             <div class="mb-3">
                                <label for="" class="form-label">Type</label>
                                <select id="" class="form-select" v-model="transaction.type">
                                    <option value="expense" >Expense</option>
                                    <option value="revenue">Revenue</option>
                                </select>
                                <div v-if="validation.type" class="text-danger">
                                    {{validation.type}}
                                </div>
                            </div>
                            <button class="btn btn-outline-primary">Submit</button>
                        </form>
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {reactive, ref, onMounted} from 'vue'
import {useRouter, useRoute} from 'vue-router'
import axios from 'axios'

export default {
    setup(){
        //data binding
        let transaction = reactive({
            title: '',
            amount: '',
            time: '',
            type: '',
        });

        const validation = ref([]);

        const router = useRouter();

        const route = useRoute();

        onMounted(() => {
            axios.get(`https://crudcrud.com/api/4682bf7fdfa14d94a4eb20c7cdd18aef/transaction/${route.params.id}`)
            .then((result) => {
                console.log(result.data);
                transaction.title = result.data.title
                transaction.amount = result.data.amount
                transaction.time = result.data.time
                transaction.type = result.data.type
            }).catch((err) => {
                console.log(err.response.data)
            })
        });



        function update(){
            axios.put(`https://crudcrud.com/api/4682bf7fdfa14d94a4eb20c7cdd18aef/transaction/${route.params.id}`
            , transaction
            )
            .then((result) => {
                router.push({
                    name: 'transaction.index'
                });
            }).catch((err) => {
                validation.value = err.response.data
            });
        }

        return {
            transaction,
            validation,
            router,
            update
        }
    }    
} 
</script>
