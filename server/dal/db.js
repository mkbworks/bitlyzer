import { MongoClient } from "mongodb";
import chalk from "chalk";
import Response from "../models/response.js";
import AppError from "../models/error.js";
import User from "./user.js";

/**
 * Class to manage all operations and tasks to be carried out on the SQL database.
 */
class DataAccessLayer {
    constructor(client, db) {
        this.MongoClient = client;
        this.DbInstance = db;
    }

    /**
     * A static asynchronous function that establishes connection between the web server and database by creating a connection pool instance.
     * @returns {DataAccessLayer} an instance of DataAccessLayer with a connection pool to connect to the database.
     */
    static async ConnectToDb() {
        const CREDENTIALS = process.env.MONGO_USER + ":" + encodeURIComponent(process.env.MONGO_PWD);
        const MONGO_URI = `${process.env.MONGO_PROTO}://${CREDENTIALS}@${process.env.MONGO_HOST}/${process.env.MONGO_DB}`;
        const client = new MongoClient(MONGO_URI, {
            appName: process.env.MONGO_CLUSTER,
            w: "majority",
            retryWrites: true,
            minPoolSize: 3,
            maxPoolSize: 20
        });

        await client.connect();
        const database = client.db(process.env.MONGO_DB);
        return new DataAccessLayer(client, database);
    }

    /**
     * Asynchronous function that validates the API Key given by the user.
     * @param {string} email Email address provided by the user.
     * @param {string} apiKey API Key provided by the user.
     * @returns {Response} an object with the response status and associated data.
     */
    async ValidateUser(email, apiKey) {
        try {
            email = email.trim();
            apiKey = apiKey.trim();
            let usersCollection = this.DbInstance.collection("users");
            let matchingUsers = await usersCollection.find({ "Email": email}).toArray();
            if(matchingUsers.length == 0) {
                return new Response("error", new AppError("ERR_INVALID_EMAIL", "User email address was not found in the system"));
            }

            let [userRecord] = matchingUsers;
            let user = User.CreateFrom(userRecord);
            if(!user.ValidateApiKey(apiKey)) {
                return new Response("error", new AppError("ERR_KEY_NOMATCH", "API Key does not match the one available in the system"));
            }

            if(user.HasApiKeyExpired()) {
                return new Response("error", new AppError("ERR_KEY_EXPIRED", "API Key for the user has expired. Please regenerate a new API Key and try again"));
            } else {
                return new Response("success", { "ValidatedUser": userRecord["_id"] });
            }
        } catch(err) {
            return new Response("error", new AppError("ERR_CUSTOM", err.message));
        }
    }

    /**
     * Asynchronous function to create a new user with the given user details.
     * @param {string} email Email address provided by the user.
     * @param {string} name Display name provided by the user.
     * @returns {Response} an object with the response status and associated data.
     */
    async NewUser(email, name) {
        try {
            let { NewUser, PlainApiKey } = User.Create(email, name);
            let usersCollection = this.DbInstance.collection("users");
            let matchingEmailCount = await usersCollection.countDocuments({ Email: NewUser.Email });
            if(matchingEmailCount > 0) {
                throw new Response("error", new AppError("ERR_EMAIL_EXISTS", "User email address already exists in the system"));
            }
            
            let matchingKeyCount = await usersCollection.countDocuments({ "ApiKey.HashedValue": NewUser.ApiKey.HashedValue });
            while(matchingKeyCount > 0) {
                PlainApiKey = NewUser.RefreshApiKey();
                matchingKeyCount = await usersCollection.countDocuments({ "ApiKey.HashedValue": NewUser.ApiKey.HashedValue });
            }
            
            const result = await usersCollection.insertOne(NewUser.ToObject());
            console.log(`A new user with ID = ${result.insertedId} has been added to the "users" collection.`);
            let ApiKeyExpiry = new Date(NewUser.ApiKey.RefreshedAt);
            ApiKeyExpiry.setDate(ApiKeyExpiry.getDate() + 30);
            let responseData = {
                "ApiKey": {
                    "Value": PlainApiKey,
                    "Expiry": ApiKeyExpiry.toISOString()
                }
            };
            
            return new Response("success", responseData);
        } catch(err) {
            return new Response("error", new AppError("ERR_CUSTOM", err.message));
        }
    }

    /**
     * Asynchronous function to get the link mapped to the hash value.
     * @param {string} hashValue hash value provided 
     * @param {string} apiKey user's API Key. 
     * @returns {Response} an object with the response status and associated data.
     */
    async FindLink(hashValue, apiKey) {
        try {
            
        } catch(err) {
            return new Response("error", new AppError("ERR_CUSTOM", err.message));
        }
    }

    /**
     * Asychronous function to create a new hash for the given link.
     * @param {string} apiKey user's API Key.
     * @param {string} link link given by the user for which hash is to be computed.
     * @returns {Response} an object with the response status and associated data.
     */
    async NewLink(apiKey, link) {
        try {
            
        } catch(err) {
            return new Response("error", new AppError("ERR_CUSTOM", err.message));
        }
    }

    /**
     * Asynchronous function to delete the link mapped to the given hash value.
     * @param {string} apiKey user's API Key.
     * @param {string} hashValue hash value of the link to be deleted.
     * @returns {Response} an object with the response status and associated data.
     */
    async DeleteLink(apiKey, hashValue) {
        try {
            
        } catch(err) {
            return new Response("error", new AppError("ERR_CUSTOM", err.message));
        }
    }

    /**
     * Asynchronous function to close the underlying database connection.
     */
    async Close() {
        await this.MongoClient.close();
        console.log(chalk.green("Database connection pool has been closed."));
    }
}

export default DataAccessLayer;