import { defineStore } from 'pinia'

export const helper_store = defineStore('helper_store', {
    state: () => ({ cart: [], }),
    getters: {
        count: (state) => state.cart.length,
    },
    actions: {
        add: function() {
            this.cart.push(Math.random());
        },
    },
})
