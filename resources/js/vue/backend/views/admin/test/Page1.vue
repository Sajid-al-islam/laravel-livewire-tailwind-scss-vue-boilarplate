<template>
    <div>
        page one <br>
        <button @click="increment">inc</button> <br>
        {{ count }} <br>
        {{ double }}

        <hr>
        {{ helper_count }} <br>
        {{ cart }}
    </div>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import {counter_store} from '../../../pinia_store/counter_store'
import { helper_store } from '../../../pinia_store/helper_store'
export default {
    created: function(){
        console.log(this.$pinia.state.value);
    },
    methods:{
        ...mapActions(counter_store,['increment'])
    },
    computed: {
        ...mapState(counter_store, ['count']),
        ...mapState(counter_store, {
            double: (store) => store.doubleCount,
        }),
        ...mapState(helper_store, {
            helper_count: 'count',
            cart: 'cart',
        }),
    }
}
</script>

<style>

</style>
