<template>
    <div class="canvas_backdrop" :class="{active:get_show_create_canvas}" @click="$event.target.classList.contains('canvas_backdrop') && set_show_create_canvas(false)">
        <div class="content right" v-if="get_show_create_canvas">
            <div class="content_header">
                <h3 class="offcanvas-title">Create User</h3>
                <i @click="set_show_create_canvas(false)" class="fa fa-times"></i>
            </div>
            <div class="cotent_body">
                form
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
    methods: {
        ...mapMutations(['set_show_create_canvas']),
    },
    computed: {
        ...mapGetters(['get_show_create_canvas'])
    }
}
</script>

<style>

</style>
