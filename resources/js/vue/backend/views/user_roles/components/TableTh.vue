<template>
    <th
        @click="sort && set_user_role_orderByCol(tkey)"
        :class="{ cursor_n_resize: sort }"
        :aria-label="ariaLable"
    >
        {{ title }}
        <table-heading-asc-caret :tkey="tkey" module="user_role_modules" />
    </th>
</template>

<script>
import { mapMutations } from "vuex";
import TableHeadingAscCaret from "../../components/TableHeadingAscCaret.vue";
export default {
    components: { TableHeadingAscCaret },
    props: ["title", "tkey", "sort", "ariaLable"],
    methods: {
        ...mapMutations(["set_user_role_orderByCol"]),
    },
};
</script>

<style>
</style>
