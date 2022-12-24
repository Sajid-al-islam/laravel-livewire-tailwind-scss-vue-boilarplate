<template>
    <div v-if="get_check_auth">
        <top-nav></top-nav>
        <main-menu></main-menu>
        <!-- BEGIN: Content-->
        <div class="app-content content ">
            <div class="content-wrapper container-xxl p-0">
                <!-- <bread-cumb></bread-cumb> -->
                <div class="content-body">
                    <router-view></router-view>
                </div>
            </div>
        </div>
        <!-- END: Content-->
    </div>
</template>

<script>
import BreadCumb from './layouts/main_body/BreadCumb.vue';
import MainMenu from './layouts/main_menu/MainMenu.vue';
import TopNav from './layouts/TopNav.vue';
import {mapActions, mapGetters} from 'vuex';
export default {
    components: { TopNav, MainMenu, BreadCumb },
    created: function(){
        this.fetch_check_auth();
    },
    watch: {
        get_check_auth: function(newv){
            setTimeout(() => {
                // $('.navigation li a.active').parents('li.has-sub').addClass('open');
            }, 500);

            if(!newv){
                localStorage.removeItem('token');
                location.href = '/login';
            }
        }
    },
    methods: {
        ...mapActions(['fetch_check_auth']),
    },
    computed: {
        ...mapGetters(['get_check_auth'])
    }
}
</script>

<style>
</style>
