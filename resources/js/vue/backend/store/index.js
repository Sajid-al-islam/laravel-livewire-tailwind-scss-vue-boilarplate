import Vue from 'vue';
import Vuex from 'vuex';
// import createPersistedState from "vuex-persistedstate";
Vue.use(Vuex);

import auth_modules from './modules/auth_modules';

const store = new Vuex.Store({
    modules: {
        auth_modules,
    },
    state: {},
    getters: {},
    mutations: {},
    actions: {},
    // plugins: [createPersistedState()],
});

export default store;
