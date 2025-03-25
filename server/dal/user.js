import crypto from "crypto";
import * as utils from "../utils/utilities.js";

/**
 * A class to represent the "users" collection in the database.
 */
class User {
    /**
     * Number of days for which an API Key is valid from the day it was generated, before it is deemed expired.
     */
    static ApiKeyExpiry = 30;

    /**
     * Constructor to create a new instance of "User".
     * @param {string} email Email address provided by the user.
     * @param {string} name Display name provided by the user. 
     */
    constructor(email, name) {
        this.Email = email;
        this.FullName = name;
        this.ApiKey = {
            "HashedValue": "",
            "RefreshedAt": ""
        };
    }

    /**
     * Generates a new API Key for the user and hashes it using SHA-512 hashing algorithm.
     * @returns {string} Plain text API Key generated for the user.
     */
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

    /**
     * Returns an object representation of the user instance containing only its attributes.
     * @returns {object} Object representation of the instance.
     */
    ToJson() {
        return {
            "Email": this.Email,
            "FullName": this.FullName,
            "ApiKey": {
                "HashedValue": this.ApiKey.HashedValue,
                "RefreshedAt": this.ApiKey.RefreshedAt
            }
        };
    }

    /**
     * Validates the API key provided by the user with the one generated for the user.
     * @param {string} userApiKey API Key provided by the user.
     * @returns {boolean} indicating if the provided API key matches the one available in the system.
     */
    ValidateApiKey(userApiKey) {
        let [salt, hashedKeyValue] = this.ApiKey.HashedValue.split("_");
        let userHashedValue = User.HashSecret(userApiKey, salt);
        return userHashedValue === hashedKeyValue;
    }

    /**
     * Checks if the API Key generated for the user has expired. Typically, an API Key is valid for 30 days from the last refresh date.
     * @returns {boolean} indicating whether the API key has expired or not.
     */
    HasApiKeyExpired() {
        let lastRefreshDate = new Date(this.ApiKey.RefreshedAt);
        let thresholdDate = new Date();
        thresholdDate.setDate(thresholdDate.getDate() - User.ApiKeyExpiry);
        return lastRefreshDate < thresholdDate;
    }

    /**
     * Calculates the expiration date of the API Key generated for the user.
     * @returns {string} the day by which the API Key expires.
     */
    CalculateApiKeyExpiry() {
        let ApiKeyExpiry = new Date(this.ApiKey.RefreshedAt);
        ApiKeyExpiry.setDate(ApiKeyExpiry.getDate() + User.ApiKeyExpiry);
        return ApiKeyExpiry.toISOString();
    }

    /**
     * Creates a new instance of User with the given email and display name.
     * @param {string} email Email address provided by the user.
     * @param {string} name Display name provided by the user. 
     * @returns {object} containing a new instance of User and the API Key generated as plaintext.
     */
    static Create(email, name) {
        email = email.trim();
        name = name.trim();
        let newUser = new User(email, name);
        let plainApiKey = newUser.RefreshApiKey();
        return { NewUser: newUser, PlainApiKey: plainApiKey }; 
    }

    /**
     * Creates a new instance of User from the provided object. 
     * This function is typically used to create User objects from records returned by the database collection.
     * @param {object} userObj object containing the user details.
     * @returns {User} a new instance of User.
     */
    static CreateFrom(userObj) {
        let email = userObj.Email.trim();
        let name = userObj.FullName.trim();
        let newUser = new User(email, name);
        newUser.ApiKey.HashedValue = userObj.ApiKey.HashedValue.trim();
        newUser.ApiKey.RefreshedAt = userObj.ApiKey.RefreshedAt.trim();
        return newUser;
    }

    /**
     * Generates a new API Key which is of the given length. If length is not provided, it will generate an API Key which is 32 bytes.
     * @param {number} [length=32] length of the API Key being generated.
     * @returns {string} Generated API Key. 
     */
    static GenerateApiKey(length = 32) {
        const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+[]{}|;:,.<>?/`~";
        return Array.from(crypto.randomBytes(length)).map(byte => charset[byte % charset.length]).join('');
    }

    /**
     * Hashes the given secret using the salt value and returns the hashed string.
     * @param {string} secret value to be hashed.
     * @param {string} salt random salt string to be used in hashing.
     * @returns {string} hashed string value.
     */
    static HashSecret(secret, salt) {
        return crypto.pbkdf2Sync(secret, salt, 10000, 64, 'sha512').toString('hex');
    }
}

export default User;