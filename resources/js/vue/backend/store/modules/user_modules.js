import axios from "axios";
import { debounce } from "debounce";

// state list
const state = {
    users: {}, // all data
    user: null, // selected data
    page: 1,
    paginate: 10,
    search_key: "",
    orderByCol: "id",
    orderByAsc: true,
    selected: [], // selected data using checkbox
    show_selected: false, // will show selected data into offcanvas
};

// get state
const getters = {
    get_users: (state) => state.users,
    get_user: (state) => state.user,
    get_selected_users: (state) => state.selected,
    get_show_selected: (state) => state.show_selected,
};

// actions
const actions = {
    fetch_users: async function ({ state }) {
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
        await axios.get(url).then((res) => {
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
    set_clear_selected_single_user: async function (state, index) {
        // let cconfirm = await window.s_confirm();
        // if (cconfirm) {
        // }
        let temp_selected = state.selected;
        $(`table td input[data-id="${temp_selected[index].id}"]`).prop(
            "checked",
            false
        );
        temp_selected.splice(index, 1);
        state.get_selected_users = temp_selected;
    },
    set_clear_selected_users: async function (state) {
        let cconfirm = await window.s_confirm("Remove all");
        if (cconfirm) {
            state.selected = [];
            $('table input[type="checkbox"]').prop("checked", false);
        }
    },
    set_selected_users: function (state, user) {
        let temp_selected = state.selected;
        let check_index = temp_selected.findIndex((i) => i.id == user.id);
        if (check_index >= 0) {
            temp_selected.splice(check_index, 1);
        } else {
            temp_selected.push(user);
        }
        state.selected = temp_selected;
    },
    set_select_all_users: function (state) {
        if (!event.target.checked) {
            return this.commit("set_clear_selected_users");
        }

        let temp_selected = state.selected;
        let temp_users = state.users;
        temp_users.data.forEach((user) => {
            let check_index = temp_selected.findIndex((i) => i.id == user.id);
            if (check_index >= 0) {
                temp_selected.splice(check_index, 1);
            }
            temp_selected.push(user);
        });
        state.selected = temp_selected;
        $('table td input[type="checkbox"]').prop("checked", true);
    },
    set_users_paginate: function (state, paginate) {
        state.paginate = paginate;
        this.dispatch("fetch_users");
    },
    set_users_page: function (state, page) {
        state.page = page;
        this.dispatch("fetch_users");
        $('table th input[type="checkbox"]').prop("checked", false);
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
    set_show_selected: function (state, trigger) {
        state.show_selected = trigger; // true or false
    },
    export_selected_csv: function (state) {
        let col = Object.keys(state.selected[0]);
        let values = state.selected.map((i) => Object.values(i));
        new window.CsvBuilder("user_list.csv")
            .setColumns(col)
            // .addRow(["Eve", "Holt"])
            .addRows(values)
            .exportFile();
    },
    export_all: async function (state) {
        let col = Object.keys(state.users.data[0]);
        var export_csv = new window.CsvBuilder("user_list.csv").setColumns(col);
        window.start_loader();
        let last_page = state.users.last_page;
        for (let index = 1; index <= last_page; index++) {
            state.page = index;
            state.paginate = 10;
            await this.dispatch("fetch_users");
            let values = state.users.data.map((i) => Object.values(i));
            export_csv.addRows(values);

            let progress = Math.round(100*index/last_page);
            window.update_loader(progress);
        }
        await export_csv.exportFile();
        window.remove_loader();
    },
};

export default {
    state,
    getters,
    actions,
    mutations,
};
