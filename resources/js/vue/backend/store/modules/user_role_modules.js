import axios from "axios";
import { debounce } from "debounce";

// state list
const state = {
    user_roles: {}, // all data
    user_role: null, // selected data
    user_role_page: 1,
    user_role_paginate: 10,
    user_role_search_key: "",
    user_role_orderByCol: "id",
    user_role_orderByAsc: true,

    user_role_selected: [], // selected data using checkbox
    user_role_show_selected: false, // will show selected data into offcanvas

    user_role_show_management_modal: false, // will show create data offcanvas

    user_role_show_create_canvas: false, // will show create data offcanvas
    user_role_create_canvas_input_data: {}, // create canvas data input array
};

// get state
const getters = {
    get_user_roles: (state) => state.users,
    get_user_role: (state) => state.user,
    get_user_role_selected: (state) => state.selected,
    get_user_role_show_selected: (state) => state.show_selected,
    get_user_role_show_create_canvas: (state) => state.show_create_canvas,
    get_user_role_show_management_modal: (state) => state.show_user_management_modal,
};

// actions
const actions = {
    fetch_user_roles: async function ({ state }) {
        let url = `/user-roll/all?page=${state.page}&paginate=${state.paginate}`;
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
            this.commit("set_user_roles", res.data);
        });
    },
    upload_user_role_create_canvas_input: function({state}){
        const {form_values, form_inputs, form_data} = window.get_form_data('.user_canvas_create_form');
        axios.post('/user/canvas-store',form_data)
            .then(res=>{
                // window.s_alert('new user been created');
                // this.commit('set_show_create_canvas',false);
                // this.dispatch('fetch_users');
            })
            .catch(error=>{
                let object = error.response?.data?.errors;
                window.render_form_errors(object,'data-name');
            })
    },
    export_selected_user_role_csv: function ({state}) {
        let col = Object.keys(state.selected[0]);
        let values = state.selected.map((i) => Object.values(i));
        new window.CsvBuilder("user_role_list.csv")
            .setColumns(col)
            // .addRow(["Eve", "Holt"])
            .addRows(values)
            .exportFile();
    },
    export_user_role_all: async function ({state}) {
        let col = Object.keys(state.users.data[0]);
        var export_csv = new window.CsvBuilder("user_role_list.csv").setColumns(col);
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

// mutators
const mutations = {
    set_user_roles: function (state, users) {
        state.users = users;
    },
    set_user_role: function (state, user) {
        state.user = user;
    },
    set_clear_selected_single_user_role: async function (state, index) {
        // let cconfirm = await window.s_confirm();
        // if (cconfirm) {
        // }
        let temp_selected = state.user_role_selected;
        $(`table td input[data-id="${temp_selected[index].id}"]`).prop(
            "checked",
            false
        );
        temp_selected.splice(index, 1);
        state.user_role_selected = temp_selected;
    },
    set_clear_selected_user_roles: async function (state) {
        let cconfirm = await window.s_confirm("Remove all");
        if (cconfirm) {
            state.user_role_selected = [];
            $('table input[type="checkbox"]').prop("checked", false);
        }
    },
    set_selected_user_roles: function (state, user) {
        let temp_selected = state.user_role_selected;
        let check_index = temp_selected.findIndex((i) => i.id == user.id);
        if (check_index >= 0) {
            let el = document.querySelector(`input[data-id="${user.id}"]`)
            if(el)el.checked = false;
            el = document.querySelector(`input.check_all`)
            if(el)el.checked = false;
            temp_selected.splice(check_index, 1);
        } else {
            temp_selected.push(user);
        }
        state.user_role_selected = temp_selected;
    },
    set_select_all_user_roles: function (state) {
        if (!event.target.checked) {
            return this.commit("set_clear_selected_user_roles");
        }

        let temp_selected = state.user_role_selected;
        let temp_data = state.user_roles;
        temp_data.data.forEach((user) => {
            let check_index = temp_selected.findIndex((i) => i.id == user.id);
            if (check_index >= 0) {
                temp_selected.splice(check_index, 1);
            }
            temp_selected.push(user);
        });
        state.user_role_selected = temp_selected;
        $('table td input[type="checkbox"]').prop("checked", true);
    },
    set_user_role_paginate: function (state, paginate) {
        state.user_role_paginate = paginate;
        this.dispatch("fetch_user_roles");
    },
    set_user_role_page: function (state, page) {
        state.page = page;
        this.dispatch("fetch_user_roles");
        $('table th input[type="checkbox"]').prop("checked", false);
    },
    set_user_role_orderByCol: function (state, orderByCol) {
        if (state.user_role_orderByCol != orderByCol) {
            state.user_role_orderByAsc = true;
        } else {
            state.user_role_orderByAsc = !state.user_role_orderByAsc;
        }
        state.user_role_orderByCol = orderByCol;
        this.dispatch("fetch_user_roles");
    },
    set_user_role_search_key: debounce(function (state, search_key) {
        state.user_role_search_key = search_key;
        this.dispatch("fetch_user_roles");
    }, 500),
    set_user_role_show_selected: function (state, trigger) {
        state.user_role_show_selected = trigger; // true or false
    },
    set_user_role_show_management_modal: function (state, trigger = true) {
        state.user_role_show_management_modal = trigger; // true or false
    },
    set_user_role_show_create_canvas: function (state, trigger = true) {
        state.user_role_show_create_canvas = trigger; // true or false
    },
    set_user_role_create_canvas_input: function(state, payload){
        console.log(payload);
        let {event, name, value} = payload;
        name = event.target.dataset.name;
        state.user_role_create_canvas_input_data[name] = value;
    },

};

export default {
    state,
    getters,
    actions,
    mutations,
};
