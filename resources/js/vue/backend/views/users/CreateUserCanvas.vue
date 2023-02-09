<template>
    <div class="canvas_backdrop"
        :class="{active:get_show_create_canvas}"
        @click="$event.target.classList.contains('canvas_backdrop') && set_show_create_canvas(false)">
        <div class="content right" v-if="get_show_create_canvas">
            <div class="content_header">
                <h3 class="offcanvas-title">Create User</h3>
                <i @click="set_show_create_canvas(false)" class="fa fa-times"></i>
            </div>
            <div class="cotent_body user_canvas_create_form">
                <div class=" form-group d-grid align-content-start gap-1 mb-2 " >
                    <input-field
                        :label="`First Name`"
                        :data_attr="[{name: 'first_name'}]"
                    />
                </div>
                <div class=" form-group d-grid align-content-start gap-1 mb-2 " >
                    <input-field
                        :label="`Last Name`"
                        :data_attr="[{name: 'last_name'}]"
                    />
                </div>
                <div class=" form-group d-grid align-content-start gap-1 mb-2 " >
                    <input-field
                        :label="`Email`"
                        :data_attr="[{name: 'email'}]"
                        :type="`email`"
                    />
                </div>
                <div class=" form-group d-grid align-content-start gap-1 mb-2 " >
                    <input-field
                        :label="`Photo`"
                        :data_attr="[{name: 'photo'}]"
                        :type="`file`"
                    />
                    <!-- <input type="file" data-name="photo"> -->
                </div>
                <div class=" form-group d-grid align-content-start gap-1 mb-2 " >
                    <input-field
                        :label="`password`"
                        :type="`password`"
                        :data_attr="[{name: 'password'}]"
                    />
                </div>
                <div class=" form-group d-grid align-content-start gap-1 mb-2 " >
                    <input-field
                        :label="`confirm password`"
                        :type="`password`"
                        :data_attr="[{name: 'password_confirmation'}]"
                    />
                </div>
                <div class=" form-group text-center mb-2 " >
                    <button @click.prevent="upload_user_create_canvas_input" type="button" class="btn btn-outline-info">Submit</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import InputField from '../components/InputField.vue'
export default {
    components: { InputField },
    methods: {
        ...mapActions(['upload_user_create_canvas_input']),
        ...mapMutations([
            'set_show_create_canvas',
        ]),
    },
    computed: {
        ...mapGetters(['get_show_create_canvas'])
    }
}
</script>

<style>

</style>
