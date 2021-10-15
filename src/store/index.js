import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import info from './info'
import category from './category'
import record from './record'
import firebase from 'firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    error: null
  },
  mutations: {
    setError(state, error) { 
      state.error = error
    },
    clearError(state) {
      state.error = null
    }
  },
  actions: {
    async getCurrency() {
      const currency = (await firebase.database().ref(`/currency/`).once('value')).val()
      return currency
    },
    async setCurrencyValue(_, value) {
      return firebase.database().ref(`/currency/`).update(value);
    }
  },
  getters: {
    error: s => s.error
  },
  modules: {
    auth,
    info,
    category,
    record
  }
})
