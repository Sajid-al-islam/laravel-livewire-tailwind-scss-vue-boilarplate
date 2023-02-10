import axios from "axios";
import { debounce } from "debounce";

// module perfixes
const module_prefix = `user_role`;
const api_prefix = `user-role`;

// state list
const state = {
    /* data store */
    [`${module_prefix}s`]: {}, // all data
    [`${module_prefix}`]: null, // selected data

    /* data filters */
    [`${module_prefix}_page`]: 1,
    [`${module_prefix}_paginate`]: 10,
    [`${module_prefix}_search_key`]: ``,
    [`orderByCol`]: "id",
    [`orderByAsc`]: true,

    /* selected data */
    [`${module_prefix}_selected`]: [], // selected data using checkbox
    [`${module_prefix}_show_selected`]: false, // will show selected data into offcanvas

    /* trigger showing data modal */
    [`${module_prefix}_show_management_modal`]: false,

    /* trigger showing data create canvas */
    [`${module_prefix}_show_create_canvas`]: false,
};

// get state
const getters = {
    [`get_${module_prefix}s`]: (state) => state[`${module_prefix}s`],
    [`get_${module_prefix}`]: (state) => state[`${module_prefix}`],
    [`get_${module_prefix}_selected`]: (state) => state[`${module_prefix}_selected`],
    [`get_${module_prefix}_show_selected`]: (state) => state[`${module_prefix}_show_selected`],
    [`get_${module_prefix}_show_create_canvas`]: (state) => state[`${module_prefix}_show_create_canvas`],
    [`get_${module_prefix}_show_management_modal`]: (state) => state[`${module_prefix}_show_management_modal`],
};

// actions
const actions = {
    /** fetch all data using data filters */
    [`fetch_${module_prefix}s`]: async function ({ state }) {
        let url = `/${api_prefix}/all?page=${state[`${module_prefix}_page`]}&paginate=${state[`${module_prefix}_paginate`]}`;
        url += `&orderBy=${state.orderByCol}`;
        if (state.orderByAsc) {
            url += `&orderByType=ASC`;
        } else {
            url += `&orderByType=DESC`;
        }
        if (state[`${module_prefix}_search_key`]) {
            url += `&search_key=${state[`${module_prefix}_search_key`]}`;
        }
        await axios.get(url).then((res) => {
            this.commit(`set_${module_prefix}s`, res.data);
        });
    },

    /** store data canvas form */
    [`upload_${module_prefix}_create_canvas_input`]: function({state}){
        const {form_values, form_inputs, form_data} = window.get_form_data(`.${module_prefix}_canvas_create_form`);
        axios.post(`/${api_prefix}/canvas-store`,form_data)
            .then(res=>{
                window.s_alert('new role been created');
                this.commit(`set_${module_prefix}_show_create_canvas`,false);
                this.dispatch(`fetch_${module_prefix}s`);
            })
            .catch(error=>{
                let object = error.response?.data?.errors;
                /**
                 * 1. object to render as error
                 * 2. selector key for error redering
                 *      . by default name will find by script
                 *      . else you have to pass selector name
                 *      . here we are using data-name as input fields selector
                 */
                window.render_form_errors(object,'data-name');
            })
    },

    /** export all data into csv */
    [`export_${module_prefix}_all`]: async function ({state}) {
        let col = Object.keys(state[`${module_prefix}`].data[0]);
        var export_csv = new window.CsvBuilder(`${module_prefix}_list.csv`).setColumns(col);
        window.start_loader();
        let last_page = state.users.last_page;
        for (let index = 1; index <= last_page; index++) {
            state.page = index;
            state.paginate = 10;
            await this.dispatch(`fetch_${module_prefix}s`);
            let values = state.users.data.map((i) => Object.values(i));
            export_csv.addRows(values);

            let progress = Math.round(100*index/last_page);
            window.update_loader(progress);
        }
        await export_csv.exportFile();
        window.remove_loader();
    },

    /** export selected data into csv */
    [`export_selected_${module_prefix}_csv`]: function ({state}) {
        let col = Object.keys(state.selected[0]);
        let values = state.selected.map((i) => Object.values(i));
        new window.CsvBuilder(`${module_prefix}_list.csv`)
            .setColumns(col)
            // .addRow(["Eve", "Holt"])
            .addRows(values)
            .exportFile();
    },
};

// mutators
const mutations = {
    /**
    * set data array state
    * set single data
    * */
    [`set_${module_prefix}s`]: function (state, data) {
        state[`${module_prefix}s`] = data;
    },
    [`set_${module_prefix}`]: function (state, data) {
        state[`${module_prefix}`] = data;
    },

    /**
    * filter data object
    * 1. set per page paginate amount
    * 2. switch to targeted page
    * 3. set order by collumn name
    * 4. set searh key for data set
    * */
    [`set_${module_prefix}_paginate`]: function (state, paginate) {
        state[`${module_prefix}_paginate`] = paginate;
        this.dispatch(`fetch_${module_prefix}s`);
    },
    [`set_${module_prefix}_page`]: function (state, page) {
        state[`${module_prefix}_page`] = page;
        this.dispatch(`fetch_${module_prefix}s`);
        $('table th input[type="checkbox"]').prop("checked", false);
    },
    [`set_${module_prefix}_orderByCol`]: function (state, orderByCol) {
        if (state.orderByCol != orderByCol) {
            state.orderByAsc = true;
        } else {
            state.orderByAsc = !state.orderByAsc;
        }
        state.orderByCol = orderByCol;
        this.dispatch(`fetch_${module_prefix}s`);
    },
    [`set_${module_prefix}_search_key`]: debounce(function (state, search_key) {
        state[`${module_prefix}_search_key`] = search_key;
        this.dispatch(`fetch_${module_prefix}s`);
    }, 500),

    /** set selected data array */
    [`set_selected_${module_prefix}s`]: function (state, data) {
        let temp_selected = state[`${module_prefix}_selected`];
        let check_index = temp_selected.findIndex((i) => i.id == data.id);
        if (check_index >= 0) {
            let el = document.querySelector(`input[data-id="${data.id}"]`)
            if(el)el.checked = false;
            el = document.querySelector(`input.check_all`)
            if(el)el.checked = false;
            temp_selected.splice(check_index, 1);
        } else {
            temp_selected.push(data);
        }
        state[`${module_prefix}_selected`] = temp_selected;
    },

    /** select all data */
    [`set_select_all_${module_prefix}s`]: function (state) {
        if (!event.target.checked) {
            return this.commit(`set_clear_selected_${module_prefix}s`);
        }

        let temp_selected = state[`${module_prefix}_selected`];
        let temp_data = state[`${module_prefix}s`];
        temp_data.data.forEach((user) => {
            let check_index = temp_selected.findIndex((i) => i.id == user.id);
            if (check_index >= 0) {
                temp_selected.splice(check_index, 1);
            }
            temp_selected.push(user);
        });
        state[`${module_prefix}_selected`] = temp_selected;
        $('table td input[type="checkbox"]').prop("checked", true);
    },

    /** clear all selected data */
    [`set_clear_selected_${module_prefix}s`]: async function (state, is_should_confirm = true) {
        console.log('ok');
        let cconfirm = is_should_confirm ? await window.s_confirm("Remove all") : true;

        if (cconfirm) {
            state[`${module_prefix}_selected`] = [];
            $('table input[type="checkbox"]').prop("checked", false);
        }
    },

    /** remove single from selected data */
    [`set_clear_selected_single_${module_prefix}`]: async function (state, index) {
        // let cconfirm = await window.s_confirm();
        // if (cconfirm) {
        // }
        let temp_selected = state[`${module_prefix}_selected`];
        $(`table td input[data-id="${temp_selected[index].id}"]`).prop(
            "checked",
            false
        );
        temp_selected.splice(index, 1);
        state[`${module_prefix}_selected`] = temp_selected;
    },

    /** watch selected data into side canvas */
    [`set_${module_prefix}_show_selected`]: function (state, trigger) {
        state[`${module_prefix}_show_selected`] = trigger; // true or false
    },

    /** trigger data management modal */
    [`set_${module_prefix}_show_management_modal`]: function (state, trigger = true) {
        state[`${module_prefix}_show_management_modal`] = trigger; // true or false
    },

    /** trigger data create canvas ( sidebar) */
    [`set_${module_prefix}_show_create_canvas`]: function (state, trigger = true) {
        state[`${module_prefix}_show_create_canvas`] = trigger; // true or false
    },

};

export default {
    state,
    getters,
    actions,
    mutations,
};
