<template>
    <th
        @click="sort && call_store(`set_${store_prefix}_orderByCol`,tkey)"
        :class="{ cursor_n_resize: sort }"
        :aria-label="ariaLable"
    >
        {{ title }}
        <table-heading-asc-caret :tkey="tkey" :module="`user_${store_prefix}_modules`" />
    </th>
</template>

<script>
import { mapMutations } from "vuex";
import TableHeadingAscCaret from "../../components/TableHeadingAscCaret.vue";
/** store prefix for export object use */
const store_prefix = 'contact_message'
export default {
    components: { TableHeadingAscCaret },
    props: ["title", "tkey", "sort", "ariaLable"],
    data: function(){
        return {
            /** store prefix for JSX */
            store_prefix: "contact_message"
        }
    },
    methods: {
        ...mapMutations([`set_${store_prefix}_orderByCol`]),
        call_store: function(name, params=null){
            this[name](params)
        },
    },
};
</script>

<style>
</style>
