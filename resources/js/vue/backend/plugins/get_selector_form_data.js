window.get_form_data = function (selector) {
    let inputs = [...document.querySelectorAll(selector + " input")];
    let selects = [...document.querySelectorAll(selector + " select")];
    let textareas = [...document.querySelectorAll(selector + " textarea")];

    let form_values = [
        ...inputs?.map((i) => get_el_value(i)),
        ...selects?.map((i) => get_el_value(i)),
        ...textareas?.map((i) => get_el_value(i)),
    ];

    let form_data = new FormData();
    let form_inputs = {};
    form_values.forEach((i) => {
        form_data.append(i.name, i.value);
        form_inputs[i.name] = i.value;
    });

    return { form_values, form_inputs, form_data };
};

function get_el_value(el) {
    let data = {
        name: el.name || el.dataset.name,
        value: "",
    };
    switch (el.nodeName) {
        case "INPUT":
            switch (el.type) {
                case "text":
                case "email":
                case "number":
                case "date":
                case "time":
                case "hidden":
                case "password":
                case "button":
                case "reset":
                case "submit":
                    data.value = el.value;
                    break;
                case "checkbox":
                case "radio":
                    if (el.checked) {
                        data.value = el.value;
                    }
                    break;
                case "file":
                    data.value = el.multiple ? el.files : el.files[0];
                    break;
            }
            break;
        case "TEXTAREA":
            data.value = el.value;
            break;
        case "SELECT":
            switch (el.type) {
                case "select-one":
                    data.value = el.value;
                    break;
                case "select-multiple":
                    let selected = [];
                    for (j = el.options.length - 1; j >= 0; j = j - 1) {
                        if (el.options[j].selected) {
                            q.push(
                                el.name +
                                    "=" +
                                    encodeURIComponent(el.options[j].value)
                            );
                            selected.push(el.value);
                        }
                    }
                    data.value = selected;
                    break;
            }
            break;
        case "BUTTON":
            switch (el.type) {
                case "reset":
                case "submit":
                case "button":
                    break;
            }
            break;
    }

    return data;
}
