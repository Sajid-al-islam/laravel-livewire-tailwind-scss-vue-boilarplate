import { defineStore } from 'pinia'
import { helper_store } from './helper_store';

export const counter_store = defineStore('counter_store', {
    state: () => ({ count: 0, name: 'Eduardo' }),
    getters: {
        doubleCount: (state) => state.count * 2,
    },
    actions: {
        increment() {
            this.count++;

            let helper = helper_store();
            helper.add();
        },
    },
})
