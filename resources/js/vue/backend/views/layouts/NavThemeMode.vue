<template>
    <li class="nav-item d-none d-lg-block" >
        <a @click="change_mode" v-if="dark==1" class="nav-link nav-link-style">
            <i  class="ficon" data-feather="sun"></i>
        </a>
        <a @click="change_mode" v-if="dark==0" class="nav-link nav-link-style">
            <i class="ficon" data-feather="moon"></i>
        </a>
    </li>
</template>

<script>
export default {
    data: function(){
        return {
            dark: 1,
        }
    },
    methods: {
        change_mode: function(){
            document.getElementsByTagName('html')[0].classList.toggle('dark-layout');
            this.dark = this.dark?0:1;
            console.log(this.dark);
        }
    }
}
</script>

<style>

</style>
