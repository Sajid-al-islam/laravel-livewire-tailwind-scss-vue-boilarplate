<template>
    <div>
        <top-nav></top-nav>
        <main-menu></main-menu>
        <!-- BEGIN: Content-->
        <div class="app-content content ">
            <div class="content-overlay"></div>
            <div class="header-navbar-shadow"></div>
            <div class="content-wrapper container-xxl p-0">
                <bread-cumb></bread-cumb>
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
export default {
    components: { TopNav, MainMenu, BreadCumb },
}
</script>

<style>
</style>
