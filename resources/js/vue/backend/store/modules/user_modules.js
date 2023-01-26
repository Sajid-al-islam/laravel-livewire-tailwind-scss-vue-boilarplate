import axios from "axios";
import { debounce } from "debounce";

// state list
const state = {
    users: {},
    user: null,
    page: 1,
    paginate: 10,
    search_key: "",
    orderByCol: "id",
    orderByAsc: true,
};

// get state
const getters = {
    get_users: (state) => state.users,
    get_user: (state) => state.user,
};

// actions
const actions = {
    fetch_users: function ({ state }) {
        let url = `/user/all?page=${state.page}&paginate=${state.paginate}`;
        url += `&orderBy=${state.orderByCol}`;
        if (state.orderByAsc) {
            url += `&orderByType=ASC`;
        } else {
            url += `&orderByType=DESC`;
        }
        if (state.search_key) {
            url += `&search_key=${state.search_key}`;
        }
        axios.get(url).then((res) => {
            this.commit("set_users", res.data);
        });
    },
};

// mutators
const mutations = {
    set_users: function (state, users) {
        state.users = users;
    },
    set_user: function (state, user) {
        state.user = user;
    },
    set_users_paginate: function (state, paginate) {
        state.paginate = paginate;
        this.dispatch("fetch_users");
    },
    set_users_page: function (state, page) {
        state.page = page;
        this.dispatch("fetch_users");
    },
    set_users_orderByCol: function (state, orderByCol) {
        if (state.orderByCol != orderByCol) {
            state.orderByAsc = true;
        } else {
            state.orderByAsc = !state.orderByAsc;
        }
        state.orderByCol = orderByCol;
        this.dispatch("fetch_users");
    },
    set_users_search_key: debounce(function (state, search_key) {
        state.search_key = search_key;
        this.dispatch("fetch_users");
    }, 500),
};

export default {
    state,
    getters,
    actions,
    mutations,
};
