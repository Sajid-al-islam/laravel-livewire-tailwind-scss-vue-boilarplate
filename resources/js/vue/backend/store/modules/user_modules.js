import axios from 'axios';

// state list
const state = {
    users: {},
    user: {},
    page: 1,
    paginate: 10,
}

// get state
const getters = {
    get_users: state => state.users,
    get_user: state => state.user,
}

// actions
const actions = {
    fetch_users: function ({state}) {
        console.log(state);
        axios.get(`/user/all?page=${state.page}&paginate=${state.paginate}`)
            .then((res) => {
                this.commit('set_users', res.data);
            })
    },
}

// mutators
const mutations = {
    set_users: function (state, users) {
        state.users = users;
    },

}

export default {
    state,
    getters,
    actions,
    mutations
}
