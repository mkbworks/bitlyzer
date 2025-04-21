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

    try {
        let response = await axios(config);
        let retValue = {
            status: "success",
            data: response.data
        };
        return retValue;
    } catch (err) {
        if(err.response) {
            let retValue = {
                status: "error",
                data: err.response.data
            };
            return retValue;
        }
        throw err;
    }
};

export default Request;
