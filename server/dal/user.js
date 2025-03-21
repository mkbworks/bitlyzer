import { GenerateApiKey, Today } from "../utils/utilities.js";

class User {
    constructor(email, name) {
        email = email.trim();
        name = name.trim();
        this.Email = email;
        this.FullName = name;
        this.ApiKey = {
            "Value": GenerateApiKey(),
            "LastModified": Today()
        };
    }

    RefreshApiKey() {
        this.ApiKey = {
            "Value": GenerateApiKey(),
            "LastModified": Today()
        };
    }

    toObject() {
        return {
            "Email": this.Email,
            "FullName": this.FullName,
            "ApiKey": this.ApiKey
        };
    }
}

export default User;