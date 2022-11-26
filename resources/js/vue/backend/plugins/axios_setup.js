import moment from "moment";
import axios from "axios";
window.axios = axios;
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

window.axios.defaults.headers.common["Authorization"] = `Bearer ${window.localStorage?.token}`;
axios.defaults.baseURL = location.origin + '/api/v1';

axios.interceptors.request.use(function (config) {
    $('.loader_body').addClass('active');
    $('.loader_body').css({'top': $('.main_content').scrollTop()});
    $('#backend_body .main_content').css({overflowY:'hidden !mportant'});
    $('form button').prop('disabled',true);
    Pace.restart();

    window.count_left_time_sec = 1;

    sessionStorage.setItem('last_time',moment().format("DD/MM/YYYY HH:mm:ss"));
    localStorage.setItem('last_time',new moment());

    return {
        ...config,
        // onUploadProgress,
        // onDownloadProgress,
    };
}, function (error) {
    // Do something with request error
    console.log('request error');
    return Promise.reject(error);
});

window.axios.interceptors.response.use(
    (response) => {
        $('.loader_body').removeClass('active');
        $('#backend_body .main_content').css({overflowY:'scroll'});
        $('form button').prop('disabled',false);
        $(`label`).siblings(".text-danger").remove();
        $(`select`).siblings(".text-danger").remove();
        $(`input`).siblings(".text-danger").remove();
        $(`textarea`).siblings(".text-danger").remove();
        $('.form_errors').html('');
        return response;
    },
    (error) => {
        $('.loader_body').removeClass('active');
        $('form button').prop('disabled',false);
        $('#backend_body .main_content').css({overflowY:'scroll'});
        // whatever you want to do with the error
        // console.log(error.response.data.errors);
        let object = error.response?.data?.errors;
        $(`label`).siblings(".text-danger").remove();
        $(`select`).siblings(".text-danger").remove();
        $(`input`).siblings(".text-danger").remove();
        $(`textarea`).siblings(".text-danger").remove();
        $('.form_errors').html('');

        let error_html = ``;

        for (const key in object) {
            if (Object.hasOwnProperty.call(object, key)) {
                const element = object[key];
                if (document.getElementById(`${key}`)) {
                    $(`#${key}`)
                        .parent("div")
                        .append(`<div class="text-danger">${element[0]}</div>`);
                } else {
                    $(`input[name="${key}"]`)
                        .parent("div")
                        .append(`<div class="text-danger">${element[0]}</div>`);

                    $(`select[name="${key}"]`)
                        .parent("div")
                        .append(`<div class="text-danger">${element[0]}</div>`);

                    $(`input[name="${key}"]`).trigger("focus");

                    $(`textarea[name="${key}"]`)
                        .parent("div")
                        .append(`<div class="text-danger">${element[0]}</div>`);

                    $(`textarea[name="${key}"]`).trigger("focus");
                }
                // console.log({
                //     [key]: element,
                // });

                error_html += `
                    <div class="alert alert_${key} my-1 mx-2 alert-danger pe-5 inverse alert-dismissible fade show" role="alert">
                        <i class="icon-alert txt-dark rounded-0"></i>
                        <div>${element}</div>
                        <button type="button" class="btn-close txt-light" data-bs-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true"></span>
                        </button>
                    </div>
                `;
            }
        }

        $('.form_errors').html(error_html);

        if (typeof error ?.response ?.data === "string") {
            console.log("error", error ?.response ?.data ?error ?.response ?.data : error.response);
        } else {
            console.log(error.response);
        }

        if(error.response.status == 401){
            window.clear_session();
            window.location = "/";
        }

        window.s_alert('error',error.response?.statusText)
        throw error;
    }
);
