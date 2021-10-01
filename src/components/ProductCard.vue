<template>
   
        
            <div class="card"> <img src="https://i.imgur.com/z55ax9e.jpeg"  class="card-img-top img-fluid img-thumbnail" width="100%">
                <div class="card-body pt-0 px-0">
                   <div class="mt-3">{{product.product_name}}</div>

                    <div class="d-flex flex-row justify-content-between mb-0 mt-3 px-3"> <span class="text-muted mt-1">Starting At:</span>
                        <h6>Rp.{{product.initial_price}}</h6>
                    </div>
                    <hr class="mt-2 mx-3">
                    <div class="d-flex flex-row justify-content-between px-3 pb-2">
                         <div class="d-flex flex-column"><span class="text-muted">Highest Bid:</span></div>
                        <div class="d-flex flex-column">
                            <h6>Rp.{{product.highest_bid}}</h6>
                        </div>
                    </div>
                   <div class="d-flex flex-row justify-content-between px-3 pb-2">
                         <div class="d-flex flex-column"><span class="text-muted">Total Bidder:</span></div>
                        <div class="d-flex flex-column">
                            <h6><strong>{{product.total_bidder}}</strong></h6>
                        </div>
                    </div>
                    <div class="mx-3 mt-3 mb-2"><button type="button" class="btn btn-danger btn-block"><small>Place Bid</small></button></div> 
                  <div class="mt-3">
                   <vue-countdown :time="time" :interval="100" v-slot="{ days, hours, minutes, seconds }">
    Time Left: {{ days }}d {{ hours }}h {{ minutes }}m {{ seconds }}s
  </vue-countdown></div>

                </div>
            </div>
       
    
 
</template>

<script>
import VueCountdown from '@chenfengyuan/vue-countdown';

export default {
    name: 'ProductCard',
    props: {
        product :{
        product_name : String,
        highest_bid: String,
        total_bidder: Number,
        initial_price: String,
        product_display_image: String,
        end_date: String
        }
    
    },
     components: {
      VueCountdown,
    },
     data() {
        const now = new Date();
        const newYear = new Date(this.product.end_date);


    return {
      time: newYear - now,
    };
  },


  
    
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@500&display=swap');



.card {
    width: 250px;
    border-radius: 5px
}

.card-img-top {
    border-top-right-radius: 5px;
    border-top-left-radius: 5px
}

span.text-muted {
    font-size: 12px
}

small.text-muted {
    font-size: 8px
}

h5.mb-0 {
    font-size: 1rem
}

small.ghj {
    font-size: 9px
}

.mid {
    background: #ECEDF1
}

h6.ml-1 {
    font-size: 13px
}

small.key {
    text-decoration: underline;
    font-size: 9px;
    cursor: pointer
}

.btn-danger {
    color: #FFCBD2
}

.btn-danger:focus {
    box-shadow: none
}

small.justify-content-center {
    font-size: 9px;
    cursor: pointer;
    text-decoration: underline
}

</style>