<template>
    <div class="container">
        <h3 class="p-3">My Bids</h3>
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
                <tr v-for="(bid) in bidsData" :key="bid.id">
                    <td>{{bid.name}}</td>
                    <td>{{bid.starting_price}}</td>
                    <td>{{bid.end_date}}</td>
                    <td>{{bid.total_bidder}}</td>
                    <td>{{bid.highest_bid}}</td>
                    <td>{{bid.is_active}}</td>
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

export default {
    setup(){
        //data binding
        var bidsData = ref([])

        // const route = useRouter();

          onMounted(async () => {
            let user = await auth.getUserSession();

            axios.get(`http://localhost/auction-backend/public/mybid/${user.uid}`)
            .then((result) => {
                console.log(result.data.data);
                bidsData.value = result.data.data
            }).catch((err) => {
                console.log(err.response)
            })
        });


        return {
            bidsData
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