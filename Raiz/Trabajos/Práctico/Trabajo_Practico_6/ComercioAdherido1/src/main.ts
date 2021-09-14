import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app"

// // TODO: Add SDKs for Firebase products that you want to use

// // https://firebase.google.com/docs/web/setup#available-libraries


// // Your web app's Firebase configuration

// const firebaseConfig = {

//   apiKey: "AIzaSyDCl36lSd20t9Y7LR5PZlrCkZeuWiWtjHU",

//   authDomain: "k3-isw-tp6.firebaseapp.com",

//   databaseURL: "https://k3-isw-tp6-default-rtdb.firebaseio.com",

//   projectId: "k3-isw-tp6",

//   storageBucket: "k3-isw-tp6.appspot.com",

//   messagingSenderId: "841036005280",

//   appId: "1:841036005280:web:237ef9ab1de43d3801aec5"

// };

// // Initialize Firebase

// const app = initializeApp(firebaseConfig);

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
