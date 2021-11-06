<template>
    <div class="container">
        <h3 class="p-3">My Products</h3>
        <table class="table table-striped table-bordered">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Starting Price</th>
                    <th>End Date</th>
                    <th>Total Bidder</th>
                    <th>Current Bid Price</th>
                    <th>Is Approved</th>
                    <th>Images</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(product) in productsData" :key="product.id">
                    <td>{{product.name}}</td>
                    <td>{{product.starting_price}}</td>
                    <td>{{product.end_date}}</td>
                    <td>{{product.total_bidder}}</td>
                    <td>{{product.highest_bid}}</td>
                    <td>{{product.is_active}}</td>
                    <td><ImagesCarousel v-bind:images="product.images"></ImagesCarousel></td>
                </tr>
            </tbody>
        </table>
    </div>    


</template>


<script>
import * as auth from '../../utils/firebase-auth.js'
import {reactive, ref, onMounted} from 'vue'
import {useRouter, useRoute} from 'vue-router'
import axios from 'axios'
import ImagesCarousel from '../../components/ImagesCarousel.vue'

export default {
    components: {
      ImagesCarousel,
    },
    setup(){
        //data binding
        var productsData = ref([])

        // const route = useRouter();

          onMounted(async () => {
            let user = await auth.getUserSession();

            axios.get(`http://localhost/auction-backend/public/my-product/${user.uid}`)
            .then((result) => {
                console.log(result.data.data);
                productsData.value = result.data.data
            }).catch((err) => {
                console.log(err.response)
            })
        });


        return {
            productsData
        }
    }    
    // data() {
    //     return {
    //         users: [
    //             { firstName: 'Frank', lastName: 'Murphy', email: 'frank.murphy@test.com', role: 'User' },
    //             { firstName: 'Vic', lastName: 'Reynolds', email: 'vic.reynolds@test.com', role: 'Admin' },
    //             { firstName: 'Gina', lastName: 'Jabowski', email: 'gina.jabowski@test.com', role: 'Admin' },
    //             { firstName: 'Jessi', lastName: 'Glaser', email: 'jessi.glaser@test.com', role: 'User' },
    //             { firstName: 'Jay', lastName: 'Bilzerian', email: 'jay.bilzerian@test.com', role: 'User' }
    //         ]
    //     };
    // }
};
</script>