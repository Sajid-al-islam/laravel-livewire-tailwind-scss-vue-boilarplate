<template>
    <div class="field_wrapper">
        <label :for="uninque_id_for_label()" class="text-capitalize d-block">
            <span v-if="!input_not_text" class="mb-2 d-block">
                {{ label }}
            </span>
            <input
                :type="type"
                :accept="is_preview && accept"
                :id="uninque_id_for_label()"
                :name="name"
                :required="required"
                :class="`${extra_class} ${!input_not_text?'form-control':'form-check-input'}`"
                :multiple="multiple"
                :value="value"
                :checked="checked"
                @change="input_change_handler"
            />
            <span v-if="input_not_text" class="ps-1">
                {{ label }}
            </span>
        </label>
        <div class="file_preview" v-if="is_preview">
            <img
                v-for="(url, index) in image_urls"
                :key="index"
                :src="url"
                :alt="index"
            />
        </div>
    </div>
</template>

<script>
export default {
    props: {
        type: {
            type: String,
            default: "text",
        },
        label: {
            type: String,
            default: '',
        },
        name: {
            type: String,
            default: "",
            required: true,
        },
        mutator: {
            type: Function,
            default: () => "",
        },
        checked: {
            type: Boolean,
            default: false,
        },
        accept: {
            type: String,
            default: "image/*",
        },
        value: {
            type: String,
            default: null,
        },
        required: {
            type: Boolean,
            default: false,
        },
        preview: {
            type: Boolean,
            default: false,
        },
        multiple: {
            type: Boolean,
            default: false,
        },
        extra_class: {
            type: String,
            default: '',
        },
    },
    data: function () {
        return {
            image_urls: [],
        };
    },
    methods: {
        input_change_handler: function () {
            if (this.is_preview) {
                this.preview_image();
            }
            this.mutator({
                value: event.target.value,
                name: event.target.name,
                event,
            });
        },
        preview_image: function () {
            let files = [...event.target.files];
            this.image_urls = files.map((i) => URL.createObjectURL(i));
        },
        uninque_id_for_label: function(){
            return this.input_not_text?this.label.replaceAll(' ','_'):this.name
        }
    },
    computed: {
        is_preview: function () {
            return this.type === "file" && this.preview === true;
        },
        input_not_text: function(){
            return ['checkbox','radio'].includes(this.type);
        }
    },
};
</script>

<style>
</style>
