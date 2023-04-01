<template>
    <!-- BEGIN: Main Menu-->
    <div  class="main-menu menu-fixed menu-dark menu-accordion menu-shadow" data-scroll-to-active="true">
        <main-menu-navbar-top></main-menu-navbar-top>
        <div class="shadow-bottom"></div>
        <div class="main-menu-content custom_scroll">
            <super-admin-nav-list v-if="role_names.includes('super_admin')"></super-admin-nav-list>
            <admin-nav-list v-if="role_names.includes('admin')"></admin-nav-list>
        </div>
    </div>

    <!-- END: Main Menu-->
</template>

<script>
import SuperAdminNavList from './nav_lists/SuperAdminNavList.vue'
import AdminNavList from './nav_lists/AdminNavList.vue'
import MainMenuNavbarTop from './MainMenuNavbarTop.vue'
import { mapGetters } from 'vuex'
export default {
    components: { MainMenuNavbarTop, SuperAdminNavList, AdminNavList },
    computed: {
        ...mapGetters({
            get_check_auth : "get_check_auth",
            auth_info: "get_auth_information",
        }),
        role_names: function(){
            return this.auth_info.roles.map((i)=>i.name);
        },
        role_serials: function(){
            return this.auth_info.roles.map((i)=>i.role_serial);
        },
    },

}
</script>

<style>

</style>
