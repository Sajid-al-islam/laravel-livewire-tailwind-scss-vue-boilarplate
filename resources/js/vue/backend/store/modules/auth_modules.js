import axios from 'axios';

// state list
const state = {
    auth_information: {},
    auth_tokens: null,
    check_auth: false,
}

// get state
const getters = {
    get_auth_information: state => state.auth_information,
    get_auth_tokens: state => state.auth_tokens,
    get_check_auth: state => state.check_auth,
}

// actions
const actions = {
    fetch_check_auth: function (state) {
        axios.post('/user/check-auth')
            .then((res) => {
                // console.log(res.data);
                $('#app_pre_loader').toggleClass('d-none');
                this.commit('set_check_auth', true);
            })
            .catch((err)=>{
                // this.commit('set_check_auth', false);
                // window.localStorage.removeItem('token');
                console.log('user not authenticated');
                window.location.href = '/login';
            })
    },
    fetch_auth_information: function (state) {
        axios.post('/user/user_info')
            .then((res) => {
                // console.log(res.data);
                this.commit('set_auth_information', res.data);
            })
            .catch((err)=>{
                window.s_alert('error','something went wrong, reload window to fix it. '+(err.response?.data?.err_message || err.response?.data?.message));
            })
    },
    fetch_logout: function (state) {
        window.s_confirm('Logout')
            .then(res=>{
                res &&
                    axios.post('/user/api-logout')
                        .then((res) => {
                            window.localStorage.removeItem('token');
                            this.commit('set_auth_information', null);
                            this.commit('set_check_auth', false);
                            window.location.href = '/login'
                        })
                        .catch((err)=>{
                            window.s_alert('error','something went wrong, reload window to fix it. '+(err.response?.data?.err_message || err.response?.data?.message));
                        })
            })
    },
}

// mutators
const mutations = {
    set_auth_information: function (state, auth_information) {
        state.auth_information = auth_information;
    },
    set_auth_tokens: function (state, auth_tokens) {
        state.auth_tokens = auth_tokens;
    },
    set_check_auth: function (state, check_auth) {
        state.check_auth = check_auth;
    },
}

export default {
    state,
    getters,
    actions,
    mutations
}
