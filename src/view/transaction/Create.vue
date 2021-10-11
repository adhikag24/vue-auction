<template>
      <div class="container my-5">
        <div class="row justify-content-center">
            <div class="col-8">

                <div class="card rounded shadow">
                    <div class="card-header">
                        Request Product
                    </div>
                    <div class="card-body">
                        <form @submit.prevent="store()">
                            <div class="mb-3">
                                <label for="" class="form-label">Product Name</label>
                                <input type="text" class="form-control" v-model="transaction.title">
                                <div v-if="validation.title" class="text-danger">
                                    {{validation.title}}
                                </div>
                            </div>
                               <div class="mb-3">
                                <label for="" class="form-label">Starting Price</label>
                                <input type="number" class="form-control" v-model="transaction.amount">
                                <div v-if="validation.amount" class="text-danger">
                                    {{validation.amount}}
                                </div>
                            </div>
                               <div class="mb-3">
                                <label for="" class="form-label">End Date</label>
                                
                                <input type="date" class="form-control" placeholder="yyyy-mm-dd hh:mm:ss" v-model="transaction.time">
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
                              <div class="mb-3">
                                <label for="" class="form-label">Product Images</label>
                                <input type="file" name="imagesArray" class="form-control" multiple @change="onChange" >
                                <div v-if="validation.time" class="text-danger">
                                    {{validation.time}}
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
import {reactive, ref} from 'vue'
import {useRouter} from 'vue-router'
import axios from 'axios'
import * as fb from '../../utils/firebase.js'

export default {
    setup(){
        //data binding
        const transaction = reactive({
            title: '',
            amount: '',
            time: '',
            type: '',
        });

        const validation = ref([]);

        const router = useRouter();

        function store(){
            // axios.post('https://crudcrud.com/api/4682bf7fdfa14d94a4eb20c7cdd18aef/transaction'
            // , transaction
            // )
            // .then((result) => {
            //     router.push({
            //         name: 'transaction.index'
            //     });
            // }).catch((err) => {
            //     validation.value = err.response.data
            // });


            fb.set(fb.ref(fb.db, 'transactions/0'), transaction)
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
            store
        }
    },  
      data() {
      return {
         imagesArray: null
      };
    },
     methods: {
        onChange (event) {
          this.imagesArray = event.target.files

            let baseImageArr = [];

            
            for (const i of Object.keys(this.imagesArray)) {
                  var reader = new FileReader();
                reader.onloadend = function() {
                    console.log('RESULT', reader.result)
                }
                reader.readAsDataURL(this.imagesArray[i]);
                baseImageArr.push(this.imagesArray[i])
            }
          console.log(baseImageArr[0]);
        },
        onUpload() {
          const formData = new FormData();
          for (const i of Object.keys(this.imagesArray)) {
            formData.append('imagesArray', this.imagesArray[i])
          }
          console.log(formData);
        //   axios.post('http://localhost:8888/api/multi-images-upload', formData, {
        //   }).then((res) => {
        //     console.log(res)
        //   })
        }  
    }  
} 
</script>
