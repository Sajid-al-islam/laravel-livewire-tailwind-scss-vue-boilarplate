<template>
    <div>
        <ul class="navigation navigation-main" id="main-menu-navigation" data-menu="menu-navigation">
            <li class="nav-item has-sub">
                <a @click.prevent="toggleLi($event)" class="d-flex align-items-center" href="#">
                    <i class="fa fa-home"></i>
                    <span class="menu-title text-truncate" data-i18n="Dashboards">Dashboards</span>
                    <span class="badge badge-light-warning rounded-pill ms-auto me-1">2</span>
                </a>
                <ul class="menu-content">
                    <li>
                        <router-link :to="{name:'Dashboard'}" class="d-flex align-items-center" href="#">
                            <i class="far fa-circle"></i>
                            <span class="menu-item text-truncate" data-i18n="Analytics">Analytics</span>
                        </router-link>
                    </li>
                    <li>
                        <a class="d-flex align-items-center" href="#">
                            <i class="far fa-circle"></i>
                            <span class="menu-item text-truncate" data-i18n="eCommerce">eCommerce</span>
                        </a>
                    </li>
                </ul>
            </li>
            <li class="navigation-header">
                <span data-i18n="Apps &amp; Pages">Apps &amp; Pages</span>
                <i data-feather="more-horizontal"></i>
            </li>
            <li class="nav-item">
                <a class="d-flex align-items-center" href="#">
                    <i class="fa fa-envelope"></i>
                    <span class="menu-title text-truncate" data-i18n="Email">Email</span>
                </a>
            </li>
            <li class="nav-item has-sub" >
                <a @click.prevent="toggleLi($event)" class="d-flex align-items-center" href="#">
                    <i class="fa fa-users"></i>
                    <span class="menu-title text-truncate" data-i18n="User">User</span>
                </a>
                <ul class="menu-content">
                    <li>
                        <router-link :to="{name:'settingProfile'}" class="d-flex align-items-center" href="#">
                            <i class="far fa-circle"></i>
                            <span class="menu-item text-truncate" data-i18n="Profile">Profile</span>
                        </router-link>
                    </li>
                    <li>
                        <router-link :to="{name:'settingPassword'}" class="d-flex align-items-center" href="#">
                            <i class="far fa-circle"></i>
                            <span class="menu-item text-truncate" data-i18n="Password">Password</span>
                        </router-link>
                    </li>
                </ul>
            </li>
            <li class="nav-item">
                <a @click.prevent="fetch_logout()" class="d-flex align-items-center" href="#">
                    <i class="fa-solid fa-power-off"></i>
                    <span class="menu-title text-truncate" >Logout</span>
                </a>
            </li>
        </ul>

        <nav-time-left-watch></nav-time-left-watch>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
import NavTimeLeftWatch from "./NavTimeLeftWatch.vue";

export default{
    components: { NavTimeLeftWatch },
    methods: {
        ...mapActions(['fetch_logout']),
        toggleLi: function(e){
            e.currentTarget.parentNode.classList.toggle('open');
        },
    }
}
</script>

<style>

</style>
