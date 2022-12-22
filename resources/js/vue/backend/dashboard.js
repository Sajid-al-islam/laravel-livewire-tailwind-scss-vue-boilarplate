require('./plugins/axios_setup');
require('./plugins/moment_setup');
require('./plugins/preview_image');
require('./plugins/auto_logout')


/*********************
   dashboard vue setup
**********************/

import Vue from 'vue'
import router from './router/router';
import store from './store/index';

Vue.component('ex-app', require('./App.vue').default);
if (document.getElementById('app')) {
    new Vue({
        store,
        router,
        el: '#app',
        created: function () {
            console.log('dashboard started');
        },
    })
}
