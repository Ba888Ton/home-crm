import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuelidate from 'vuelidate'
import dateFilter from '@/filters/date.filter'
import messagePlugin from './utils/message.plugin'
import tooltipDirective from './diectives/tooltip.directive'

import Loader from '@/components/app/Loader'
import './registerServiceWorker'
import 'materialize-css/dist/js/materialize.min'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

Vue.config.productionTip = false;

Vue.use(Vuelidate)
Vue.use(messagePlugin)
Vue.directive('tooltip', tooltipDirective)
Vue.filter('date', dateFilter);
Vue.component('Loader', Loader)

firebase.initializeApp({
  apiKey: "AIzaSyD7gSAKUAHKw3tqNk2e1Vd8Tkyg57SNjC8",
  authDomain: "minin-crm-summer.firebaseapp.com",
  projectId: "minin-crm-summer",
  databaseURL: "https://minin-crm-summer-default-rtdb.europe-west1.firebasedatabase.app",
  storageBucket: "minin-crm-summer.appspot.com",
  messagingSenderId: "63887981480",
  appId: "1:63887981480:web:374688bb09ef73547b3b9d",
  measurementId: "G-DL5N8W3PJN"
});

let app

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})


