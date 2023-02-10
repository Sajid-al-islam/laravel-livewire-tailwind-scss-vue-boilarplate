<template>
    <div class="canvas_backdrop" :class="{active:get_user_role}" @click="$event.target.classList.contains('canvas_backdrop') && set_user_role(null)">
        <div class="content right" v-if="get_user_role">
            <div class="content_header">
                <h3 class="offcanvas-title">User Details</h3>
                <i @click="set_user_role(null)" class="fa fa-times"></i>
            </div>
            <div class="cotent_body">
                <table class="table">
                    <tbody>
                        <tr>
                            <td>Id</td>
                            <td>:</td>
                            <td>{{ get_user_role.id }}</td>
                        </tr>
                        <tr>
                            <td>Role Name</td>
                            <td>:</td>
                            <td>{{ get_user_role.name }}</td>
                        </tr>
                        <tr>
                            <td>Serial</td>
                            <td>:</td>
                            <td>{{ get_user_role.role_serial }}</td>
                        </tr>
                        <tr>
                            <td>Status</td>
                            <td>:</td>
                            <td>
                                <span v-if="get_user_role.status == 1" class="badge bg-label-success me-1">active</span>
                                <span v-if="get_user_role.status == 0" class="badge bg-label-success me-1">deactive</span>
                            </td>
                        </tr>
                        <tr>
                            <td>created at</td>
                            <td>:</td>
                            <td>{{ new Date(get_user_role.created_at).toLocaleString() }}</td>
                        </tr>
                        <tr>
                            <td>udpated at</td>
                            <td>:</td>
                            <td>{{ new Date(get_user_role.updated_at).toLocaleString() }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
    methods: {
        ...mapMutations(['set_user_role']),
    },
    computed: {
        ...mapGetters(['get_user_role'])
    }
}
</script>

<style>

</style>
