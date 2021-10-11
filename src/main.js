import { createApp } from 'vue'
import router from './router'
import App from './App.vue'
import store from './utils/store.js'
import  * as fb from './utils/firebase.js'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min'

const app = createApp(App)


// app.use(router,store)
app.use(router)
app.mount('#app')
