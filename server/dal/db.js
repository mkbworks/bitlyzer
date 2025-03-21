import { MongoClient } from "mongodb";
import chalk from "chalk";
import { Response, AppError } from "../models/response.js";
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
     * @param {string} apiKey 
     * @returns {boolean} value indicating if the API Key is valid or invalid.
     */
    async ValidateUser(apiKey) {
        try {
            apiKey = apiKey.trim();
            let usersCollection = this.DbInstance.collection("users");
            let matchingUsers = await usersCollection.find({ "ApiKey.Value": apiKey}).toArray();
            if(matchingUsers.length == 0) {
                return new Response("success", false);
            }
            let userRecord = matchingUsers[0];
            let apiKeyDate = new Date(userRecord.ApiKey.LastModified);
            let refDate = new Date();
            refDate.setDate(refDate.getDate() - 30);
            if(apiKeyDate < refDate) {
                return new Response("success", false);
            } else {
                return new Response("success", true);
            }
        } catch(err) {
            return new Response("error", new AppError("ERR_CUSTOM", err.message));
        }
    }

    /**
     * Asynchronous function to create a new user with the given user details.
     * @param {string} email user's email address 
     * @param {string} name user's display name
     * @returns {Response} an object with the response status and associated data.
     */
    async NewUser(email, name) {
        try {
            let NewUser = new User(email, name);
            let usersCollection = this.DbInstance.collection("users");
            let matchingEmailCount = await usersCollection.countDocuments({ Email: NewUser.Email });
            if(matchingEmailCount > 0) {
                throw new Response("error", new AppError("ERR_EMAIL_EXISTS", "User email address already exists in the system"));
            }
            let matchingKeyCount = await usersCollection.countDocuments({ "ApiKey.Value": NewUser.ApiKey.Value });
            while(matchingKeyCount > 0) {
                NewUser.RefreshApiKey();
                matchingKeyCount = await usersCollection.countDocuments({ "ApiKey.Value": NewUser.ApiKey.Value });
            }
            const result = await usersCollection.insertOne(NewUser.toObject());
            console.log(`A new user with ID = ${result.insertedId} has been added to the "users" collection.`);
            let ApiKeyExpiry = new Date(NewUser.ApiKey.LastModified);
            ApiKeyExpiry.setDate(ApiKeyExpiry.getDate() + 30);
            let responseData = {
                "ApiKey": {
                    "Value": NewUser.ApiKey.Value,
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