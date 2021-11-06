<template>
     <div :id="'carousel' + images[0].product_id" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-inner">
            <div class="carousel-item" v-for="(image, index) in images" :key="image.id" :class="{ 'active': index === 0 }">
                <img style="height: 100px" :src="'http://localhost/auction-backend/public/assets/product_image/' + image.name" class="img-fluid" alt="...">
            </div>
         

        </div>
        <button class="carousel-control-prev" type="button" :data-bs-target="'#carousel' + images[0].product_id" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" :data-bs-target="'#carousel' + images[0].product_id" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
        </button>
    </div>
</template>

<script>

export default {
    name: 'ImagesCarousel',
    props: {
        images: {},
    },

    
}
</script>
