<template>
    <div>
        <ul class="navigation navigation-main" id="main-menu-navigation" data-menu="menu-navigation">

            <left-nav-list-group :icon="`fa fa-home`" :text="`Dashboard`" :alert_count="2">
                <left-nav-list-item :to="'Dashboard'" :text="'Analytics'" />
            </left-nav-list-group>

            <left-nav-list-group :icon="`fa fa-users`" :text="`Users`" :alert_count="0">
                <left-nav-list-item :to="'AllUser'" :text="'All user'" />
                <left-nav-list-item :to="'CreateUser'" :text="'Create user'" />
            </left-nav-list-group>

            <li class="navigation-header">
                <span data-i18n="Apps &amp; Pages">managements</span>
            </li>

            <left-nav-list-single :icon="'fa fa-envelope'" :text="'Email'" :alert_count="15" />

            <li class="nav-item has-sub" >
                <a @click.prevent="toggleLi($event)" class="d-flex align-items-center" href="#">
                    <i class="fa fa-gears"></i>
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
import LeftNavListGroup from './LeftNavListGroup.vue';
import LeftNavListItem from './LeftNavListItem.vue';
import LeftNavListSingle from './LeftNavListSingle.vue';
import NavTimeLeftWatch from "./NavTimeLeftWatch.vue";

export default{
    components: { NavTimeLeftWatch, LeftNavListItem, LeftNavListGroup, LeftNavListSingle },
    methods: {
        ...mapActions(['fetch_logout']),

    }
}
</script>

<style>

</style>
