<template>
    <li class="nav-item has-sub">
        <a @click.prevent="toggleLi($event)" class="d-flex align-items-center" href="#">
            <i :class="icon"></i>
            <span class="menu-title text-truncate">{{ text }}</span>
            <span v-if="alert_count" class="badge badge-light-warning rounded-pill ms-auto me-1">
                {{ alert_count }}
            </span>
        </a>
        <ul class="menu-content">
            <slot />
        </ul>
    </li>
</template>

<script>
export default{
    props: ['icon','text','alert_count'],
    methods: {
        toggleLi: function(e){
            e.currentTarget.parentNode.classList.toggle('open');
        },
    }
}
</script>

<style>

</style>
