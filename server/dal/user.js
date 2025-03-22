import crypto from "crypto";
import * as utils from "../utils/utilities.js";

class User {
    constructor(email, name) {
        this.Email = email;
        this.FullName = name;
        this.ApiKey = {
            "HashedValue": "",
            "RefreshedAt": ""
        };
    }

    RefreshApiKey() {
        let salt = utils.GenerateRandom(32);
        let apiKey = User.GenerateApiKey();
        let hashedApiKey = User.HashSecret(apiKey, salt);
        hashedApiKey = `${salt}_${hashedApiKey}`;
        this.ApiKey = {
            "HashedValue": hashedApiKey,
            "RefreshedAt": utils.Today()
        };
        return apiKey;
    }

    ToObject() {
        return {
            "Email": this.Email,
            "FullName": this.FullName,
            "ApiKey": {
                "HashedValue": this.ApiKey.HashedValue,
                "RefreshedAt": this.ApiKey.RefreshedAt
            }
        };
    }

    ValidateApiKey(userApiKey) {
        let [salt, hashedKeyValue] = this.ApiKey.HashedValue.split("_");
        let userHashedValue = User.HashSecret(userApiKey, salt);
        return userHashedValue === hashedKeyValue;
    }

    HasApiKeyExpired() {
        let lastRefreshDate = new Date(this.ApiKey.RefreshedAt);
        let thresholdDate = new Date();
        thresholdDate.setDate(thresholdDate.getDate() - 30);
        return lastRefreshDate < thresholdDate;
    }

    static Create(email, name) {
        email = email.trim();
        name = name.trim();
        let newUser = new User(email, name);
        let plainApiKey = newUser.RefreshApiKey();
        return { NewUser: newUser, PlainApiKey: plainApiKey }; 
    }

    static CreateFrom(userObj) {
        let email = userObj.Email.trim();
        let name = userObj.FullName.trim();
        let newUser = new User(email, name);
        newUser.ApiKey.HashedValue = userObj.ApiKey.HashedValue.trim();
        newUser.ApiKey.RefreshedAt = userObj.ApiKey.RefreshedAt.trim();
        return newUser;
    }

    static GenerateApiKey(length = 32) {
        const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+[]{}|;:,.<>?/`~";
        return Array.from(crypto.randomBytes(length)).map(byte => charset[byte % charset.length]).join('');
    }

    static HashSecret(secret, salt) {
        return crypto.pbkdf2Sync(secret, salt, 10000, 64, 'sha512').toString('hex');
    }
}

export default User;