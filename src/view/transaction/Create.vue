<template>
      <div class="container my-5">
        <div class="row justify-content-center">
            <div class="col-8">

                <div class="card rounded shadow">
                    <div class="card-header">
                        Request Product
                    </div>
                    <div class="card-body">
                        <form @submit.prevent="onUpload()">
                            <div class="mb-3">
                                <label for="" class="form-label">Product Name</label>
                                <input type="text" class="form-control" v-model="transaction.product_name">
                                <div v-if="validation.product_name" class="text-danger">
                                    {{validation.product_name}}
                                </div>
                            </div>
                               <div class="mb-3">
                                <label for="" class="form-label">Starting Price</label>
                                <input type="number" class="form-control" v-model="transaction.starting_price">
                                <div v-if="validation.starting_price" class="text-danger">
                                    {{validation.starting_price}}
                                </div>
                            </div>
                               <div class="mb-3">
                                <label for="" class="form-label">End Date</label>
                                
                                <input type="date" class="form-control" placeholder="yyyy-mm-dd hh:mm:ss" v-model="transaction.end_date">
                                <div v-if="validation.end_date" class="text-danger">
                                    {{validation.end_date}}
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
                                <input type="file" name="imagesArray[]" class="form-control" multiple @change="onChange"  >
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
import * as auth from '../../utils/firebase-auth.js'

export default {
    setup(){
        //data binding
        const transaction = reactive({
            product_name: '',
            starting_price: '',
            end_date: '',
            type: ''
        });

        const validation = ref([]);

        const router = useRouter();

        function store(){
          
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
        },
        async onUpload() {
           let user = await auth.getUserSession();
        console.log(user.uid)

          const formData = new FormData();

          if (user != null){
            for (const i of Object.keys(this.imagesArray)) {
                formData.append('imagesArray[]', this.imagesArray[i])
            }

            formData.append('user_id',user.uid)
            formData.append('is_active',0)
            formData.append('name',this.transaction.product_name)
            formData.append('starting_price',this.transaction.starting_price)
            formData.append('end_date',this.transaction.end_date)
            formData.append('type',this.transaction.type)

        
            axios.post('http://localhost/auction-backend/public/request-product', formData, {
                headers: {
                'Content-Type': 'multipart/form-data',
            },
            }).then((res) => {
                if(res.data.status == 200){
                    console.log(res)
                    this.router.push('/')
                }
            })
          }

          
        }  
    }  
} 
</script>
