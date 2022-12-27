<template>
    <router-link v-if="can_have_permission" :to="{ name: to }" :class="classList">
        <slot/>
    </router-link>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    props: ["to","classList","permission"],
    computed: {
        ...mapGetters(['get_auth_permissions']),
        can_have_permission: function(){
            return this.get_auth_permissions.includes(this.permission)
        }
    }
};
</script>

<style>
</style>
