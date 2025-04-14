import axios from "axios";

const Request = async (url, method, data, params, headers) => {
    let config = Object.create(null);
    config["baseURL"] = import.meta.env.VITE_BASE_URL;
    config["method"] = method.trim();
    config["url"] = url.trim();
    if(params) {
        config["params"] = params;
    }
    if(headers) {
        config["headers"] = headers;
    }
    if(data) {
        config["data"] = data;
    }
    return axios(config);
};

export { Request };
