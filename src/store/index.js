import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import info from './info'

const myPlugin = store => {
  // вызывается после инициализации хранилища
  store.subscribe((mutation, state) => {
    // вызывается после каждой мутации
    // мутация передаётся в формате `{ type, payload }`.
    console.log('[LOGGER] ' , mutation, state);
  });
};

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    error: null
  },
  plugins: [myPlugin],
  mutations: {
    setError(state, error) { 
      state.error = error
    },
    clearError(state) {
      state.error = null
    }
  },
  getters: {
    error: s => s.error
  },
  modules: {
    auth,
    info
  }
})
