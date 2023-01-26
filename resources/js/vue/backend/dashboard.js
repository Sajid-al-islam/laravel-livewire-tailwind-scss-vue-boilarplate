require('./plugins/axios_setup');
require('./plugins/moment_setup');
require('./plugins/preview_image');
require('./plugins/auto_logout');

window.debounce = require('debounce');
window.CsvBuilder = require('filefy').CsvBuilder;

window.start_loader = function(){
    $('.loader').addClass('active');
    $('.load_amount h4').html(5);
    $('.progress').width(5+"%");
}

window.update_loader = function(progress){
    $('.loader').addClass('active');
    $('.load_amount h4').html(progress);
    $('.progress').width(progress+"%");
}

window.remove_loader = function(){
    $('.loader').removeClass('active');
    $('.load_amount h4').html(5);
    $('.progress').width(5+"%");
}

/*********************
   dashboard vue setup
**********************/

import Vue from 'vue'
import router from './router/router';
import store from './store/index';

Vue.component('pagination', require('laravel-vue-pagination'));
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
