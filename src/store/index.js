import Vue from 'vue';
import Vuex from 'vuex';
import movies from './modules/movies';
import loader from './modules/loader';
import notification from './modules/notifications';


Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    movies,
    loader,
    notification
  }
});

store.dispatch('initMoviesStore');

export default store;
