<template>
      <div class="container mt-5 mb-5">
    <div class="card">
        <div class="row g-0">
            <div class="col-md-6 border-end">
                <div class="d-flex flex-column justify-content-center">
                    <div class="main_image"> <img :src="product.product_images" id="main_product_image" width="350"> </div>
                    <div class="thumbnail_images">
                        <ul id="thumbnail">
                            <li v-for="image in product.product_images" :key="image.id">
                                <img v-on:click="changeImage(image)" :src="image" width="70">
                            </li>
                    
                        </ul>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="p-3 right-side">
                    <div class="d-flex justify-content-between align-items-center">
                        <h3>{{product.product_name}}</h3> <span class="heart"><i class='bx bx-heart'></i></span>
                    </div>
                    <div class="mt-2 pr-3 content">
                        <h5 >Starting Price: Rp.{{product.initial_price}}</h5>
                    </div>
                    <h4>Current Highest Bid: </h4>
                    <h3>Rp.{{product.highest_bid}}</h3>
                    <div class="ratings d-flex flex-row align-items-center">
                        <div class="d-flex flex-row"> <i class='bx bxs-star'></i> <i class='bx bxs-star'></i> <i class='bx bxs-star'></i> <i class='bx bxs-star'></i> <i class='bx bx-star'></i> </div> <span>{{product.total_bidder}} Bidders</span>
                    </div>
                    <div class="mt-3">
                   <vue-countdown :time="time" :interval="100" v-slot="{ days, hours, minutes, seconds }">
                        Time Left: {{ days }}d {{ hours }}h {{ minutes }}m {{ seconds }}s
                    </vue-countdown></div>
                    <div class="buttons d-flex flex-row mt-5 gap-3" >  <button class="btn btn-outline-dark" data-bs-toggle="modal" data-bs-target="#exampleModal">Bid Now</button></div>
                  
                </div>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Place a Bid</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <form ref="form">
      <div class="modal-body">
        <div class="mb-3 row">
            <label for="inputPassword" class="col-sm-2 col-form-label">Bid</label>
            <div class="col-sm-10">
            <input type="number" name="amount" v-model="bid.amount" class="form-control" id="totalbid">
            </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-dark" v-on:click="submitBid">Submit</button>
      </div>
      </form>
    </div>
  </div>
</div>
</template>



<script>
import {reactive, ref, onMounted} from 'vue'
import {useRouter, useRoute} from 'vue-router'
import axios from 'axios'
import * as fb from '../../utils/firebase.js'
import * as auth from '../../utils/firebase-auth.js'
import VueCountdown from '@chenfengyuan/vue-countdown';

export default {

    setup(){
        //data binding
        let product = ref([]);
        const router = useRouter();
        const route = useRoute();
        var bid = {amount:'', userId: "", productId: ""};
        const now = new Date();
        let time = ref();

        onMounted(() => {
            const productCountRef = fb.ref(fb.db, 'products/' + route.params.slug);
            fb.onValue(productCountRef, (snapshot) => {
                let data = snapshot.val();
                console.log('data:',data.product_images[0])
                product.value = data

                time.value = new Date(product.value.end_date);
                time.value = time.value - now;
            });
          
        });


        function changeImage(imagesrc) {
            var main_prodcut_image = document.getElementById('main_product_image');
            main_prodcut_image.src = imagesrc;
            console.log(imagesrc)
        }

       

        return {
            time,
            router,
            route,
            product,
            changeImage,
            bid
        }
    },
    components: {
      VueCountdown,
    },
    methods: {
        async submitBid(){
            if (this.bid.amount <= this.product.highest_bid || this.bid.amount <= this.product.initial_price){
                alert("Your bid cannot be less then the highest bid.")
            }else{
                let user = await auth.getUserSession();
                this.bid.userId = user.uid;
                this.bid.productId = this.product.product_id;
                axios.post('http://localhost/auction-backend/public/placebid', this.bid, {
                headers: {},
            }).then((res) => {
                if(res.data.status == 200){
                    console.log(res)
                    alert("Success to place your bid.")
                    // this.router.push('/')
                }
            })
            }
        }
    }    
} 
</script>

<style>
.card {
    border: none;
    overflow: hidden
}

.thumbnail_images ul {
    list-style: none;
    justify-content: center;
    display: flex;
    align-items: center;
    margin-top: 10px
}

.thumbnail_images ul li {
    margin: 5px;
    padding: 10px;
    border: 2px solid #eee;
    cursor: pointer;
    transition: all 0.5s
}

.thumbnail_images ul li:hover {
    border: 2px solid #000
}

.main_image {
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid #eee;
    height: 400px;
    width: 100%;
    overflow: hidden
}

.heart {
    height: 29px;
    width: 29px;
    background-color: #eaeaea;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center
}

.content p {
    font-size: 12px
}

.ratings span {
    font-size: 14px;
    margin-left: 12px
}

.colors {
    margin-top: 5px
}

.colors ul {
    list-style: none;
    display: flex;
    padding-left: 0px
}

.colors ul li {
    height: 20px;
    width: 20px;
    display: flex;
    border-radius: 50%;
    margin-right: 10px;
    cursor: pointer
}

.colors ul li:nth-child(1) {
    background-color: #6c704d
}

.colors ul li:nth-child(2) {
    background-color: #96918b
}

.colors ul li:nth-child(3) {
    background-color: #68778e
}

.colors ul li:nth-child(4) {
    background-color: #263f55
}

.colors ul li:nth-child(5) {
    background-color: black
}

.right-side {
    position: relative
}

.search-option {
    position: absolute;
    background-color: #000;
    overflow: hidden;
    align-items: center;
    color: #fff;
    width: 200px;
    height: 200px;
    border-radius: 49% 51% 50% 50% / 68% 69% 31% 32%;
    left: 30%;
    bottom: -250px;
    transition: all 0.5s;
    cursor: pointer
}

.search-option .first-search {
    position: absolute;
    top: 20px;
    left: 90px;
    font-size: 20px;
    opacity: 1000
}

.search-option .inputs {
    opacity: 0;
    transition: all 0.5s ease;
    transition-delay: 0.5s;
    position: relative
}

.search-option .inputs input {
    position: absolute;
    top: 200px;
    left: 30px;
    padding-left: 20px;
    background-color: transparent;
    width: 300px;
    border: none;
    color: #fff;
    border-bottom: 1px solid #eee;
    transition: all 0.5s;
    z-index: 10
}

.search-option .inputs input:focus {
    box-shadow: none;
    outline: none;
    z-index: 10
}

.search-option:hover {
    border-radius: 0px;
    width: 100%;
    left: 0px
}

.search-option:hover .inputs {
    opacity: 1
}

.search-option:hover .first-search {
    left: 27px;
    top: 25px;
    font-size: 15px
}

.search-option:hover .inputs input {
    top: 20px
}

.search-option .share {
    position: absolute;
    right: 20px;
    top: 22px
}

.buttons .btn {
    height: 50px;
    width: 150px;
    border-radius: 0px !important
}
</style>
