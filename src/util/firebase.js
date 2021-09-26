import { initializeApp } from 'firebase/app';
import { database } from 'firebase/database';


// firebase init - add your own config here
const firebaseConfig = {
    apiKey: "AIzaSyBaa2UTw3pZJqGf2XLolPinZZ-SeL7fctA",
    authDomain: "auction-website-1cc67.firebaseapp.com",
    databaseURL: "https://auction-website-1cc67-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "auction-website-1cc67",
    storageBucket: "auction-website-1cc67.appspot.com",
    messagingSenderId: "915777520945",
    appId: "1:915777520945:web:0fdd3a7b50a5e0c72adc10",
    measurementId: "G-E0QFPX769C"
}
let app = initializeApp(firebaseConfig)
// utils
let db = app.database();

console.log(db);
// collection references
const transactionCollection = db.collection('likes')

// export utils/refs
export {
  db,
  transactionCollection
}