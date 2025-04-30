import { MongoClient } from "mongodb";
import chalk from "chalk";
import Response from "../models/response.js";
import AppError from "../models/error.js";
import User from "./user.js";
import Link from "./link.js";
import { Today } from "../utils/utilities.js";

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
                throw new Response("error", new AppError("ERR_EMAIL_EXISTS", "The given email address is already registered to an existing user"));
            }

            let matchingKeyCount = await usersCollection.countDocuments({ "ApiKey.HashedValue": NewUser.ApiKey.HashedValue });
            while(matchingKeyCount > 0) {
                PlainApiKey = NewUser.RefreshApiKey();
                matchingKeyCount = await usersCollection.countDocuments({ "ApiKey.HashedValue": NewUser.ApiKey.HashedValue });
            }

            const result = await usersCollection.insertOne(NewUser.ToJson());
            console.log(`A new user with ID = ${result.insertedId} has been added to the "users" collection.`);
            let ApiKeyExpiry = NewUser.CalculateApiKeyExpiry();
            let responseData = {
                "ApiKey": {
                    "Value": PlainApiKey,
                    "Expiry": ApiKeyExpiry
                }
            };

            return new Response("success", responseData);
        } catch(err) {
            return new Response("error", new AppError("ERR_CUSTOM", err.message));
        }
    }

    /**
     * Asynchronous function to get the link mapped to the hash value.
     * @param {string} shortUrl short url requested.
     * @returns {Response} an object with the response status and associated data.
     */
    async FindLink(shortUrl) {
        try {
            let linksCollection = this.DbInstance.collection("links");
            let linkRecords = await linksCollection.find({ ShortUrl: shortUrl.trim(), State: "active" }).toArray();
            if(linkRecords.length == 0) {
                return new Response("error", new AppError("ERR_NOEXISTS", "The given Short URL either does not exist in system or has expired."))
            }

            let [linkRecord] = linkRecords;
            let link = Link.CreateFrom(linkRecord);
            let resObj = {
                "ShortUrl": link.ShortUrl,
                "Target": link.Target,
                "Action": link.Action
            };
            return new Response("success", resObj);
        } catch(err) {
            return new Response("error", new AppError("ERR_CUSTOM", err.message));
        }
    }

    /**
     * Asychronous function to create a new hash for the given link.
     * @param {string} target target url to be mapped.
     * @param {string} action nature of action to be performed when the short url is requested.
     * @param {string} shortUrl short url to be mapped to the target. If no value is provided, then a new one is created by the system.
     * @param {string} userId unique ID assigned to the user in the database.
     * @param {number} expiry expiry number of days from created date, for which the link is valid
     * @returns {Response} an object with the response status and associated data.
     */
    async NewLink(target, action, shortUrl, userId, expiry) {
        try {
            let linksCollection = this.DbInstance.collection("links");
            if(expiry === 0) {
                let existingExpirycount = await linksCollection.countDocuments({ UserId: userId, Expiry: 0 });
                if(existingExpirycount > 10) {
                    return new Response("error", new AppError("ERR_RATE_EXCEEDED", "Users are not allowed to create more than 10 no-expiration links."));
                }
            }

            let newLink = Link.Create(target, action, shortUrl, userId, expiry);
            let matchingHashCount = await linksCollection.countDocuments({ ShortUrl: shortUrl });
            while(matchingHashCount > 0) {
                newLink.RefreshShortUrl();
                matchingHashCount = await linksCollection.countDocuments({ ShortUrl: shortUrl });
            }

            let linkObj = newLink.ToJson();
            const result = await linksCollection.insertOne(linkObj);
            console.log(`A new link with ID = ${result.insertedId} has been added to the "links" collection.`);
            let retValue = {
                "ShortUrl": linkObj.ShortUrl
            };
            return new Response("success", retValue);
        } catch(err) {
            return new Response("error", new AppError("ERR_CUSTOM", err.message));
        }
    }

    /**
     * Asynchronous function to delete the link mapped to the given hash value.
     * @param {string} shortUrl Short URL link to be deleted from the system.
     * @param {string} userId unique ID assigned to the user in the database.
     * @returns {Response} an object with the response status and associated data.
     */
    async DeleteLink(shortUrl, userId) {
        try {
            let linksCollection = this.DbInstance.collection("links");
            let linkRecordsCount = await linksCollection.countDocuments({ UserId: userId, ShortUrl: shortUrl });
            if(linkRecordsCount === 0) {
                return new Response("error", new AppError("ERR_NOEXISTS", "The given Short URL does not exist in system."));
            }

            let result = await linksCollection.deleteOne({ UserId: userId, ShortUrl: shortUrl });
            console.log(`${result.deletedCount} record(s) have been deleted from the "links" collection.`);
            return new Response("success", { message: "Link was deleted successfully" });
        } catch(err) {
            return new Response("error", new AppError("ERR_CUSTOM", err.message));
        }
    }

    /**
     * Function that fetches all active links from the database and updates the State for expired links.
     * @returns {Response} an object with the response status and associated data.
     */
    async MarkLinksAsExpired() {
        try {
            let linksCollection = this.DbInstance.collection("links");
            let activeLinks = await linksCollection.find({ State: "active" }).toArray();
            let CurrentDate = new Date(Today());
            if(activeLinks.length !== 0) {
                let expiredIds = [];
                activeLinks.forEach(activeLink => {
                    if(activeLink.Expiry > 0) {
                        let newLink = Link.CreateFrom(activeLink);
                        let linkExpiry =newLink.GetExpiryDate();
                        if(CurrentDate > linkExpiry) {
                            expiredIds.push(activeLink["_id"]);
                        }
                    }
                });

                let updatedRecordCount = 0;
                if(expiredIds.length > 0) {
                    let result = await linksCollection.updateMany(
                        { _id: { $in: expiredIds }},
                        { $set: { State: "expired" }}
                    );
                    updatedRecordCount = result.modifiedCount;
                }

                return new Response("success", { "ExpiredCount": updatedRecordCount });
            }
        } catch (err) {
            return new Response("error", new AppError("ERR_CUSTOM", err.message));
        }
    }

    /**
     * Gets all the active links and associated details for the given user.
     * @param {string} userId unique identitifer for the user.
     * @returns {Response} an object with the response status and associated data.
     */
    async GetActiveLinks(userId) {
        try {
            let linksCollection = this.DbInstance.collection("links");
            let activeLinks = await linksCollection.find({ UserId: userId, State: "active" }).toArray();
            let activeLinksData = activeLinks.map(activeLink => {
                let newLink = Link.CreateFrom(activeLink);
                let retLink = {
                    Alias: newLink.ShortUrl,
                    Target: newLink.Target,
                    DaysToExpiry: newLink.GetDaysToExpiry(),
                    Action: newLink.Action
                };
                return retLink;
            });
            return new Response("success", activeLinksData);
        } catch (err) {
            return new Response("error", new AppError("ERR_CUSTOM", err.message));
        }
    }

    /**
     * Updates the expiration count for the given link.
     * @param {string} userId unique identitifer for the user.
     * @param {string} alias Short URL used to represent the link object.
     * @param {number} expiry Expiration count for the link.
     * @returns {Response} an object with the response status and associated data.
     */
    async UpdateLink(userId, alias, expiry) {
        let linksCollection = this.DbInstance.collection("links");
        try {
            if(expiry === 0) {
                let existingExpirycount = await linksCollection.countDocuments({ UserId: userId, Expiry: 0 });
                if(existingExpirycount > 10) {
                    return new Response("error", new AppError("ERR_RATE_EXCEEDED", "Users are not allowed to create more than 10 no-expiration links."));
                }
            }

            let isActiveCount = await linksCollection.countDocuments({ UserId: userId, State: "active", ShortUrl: alias });
            if(!isActiveCount) {
                return new Response("error", new AppError("ERR_EXPIRED", "The given link has already expired and so cannot have its expiration extended."));
            }

            let result = await linksCollection.updateOne({ UserId: userId, ShortUrl: alias }, { $set: { Expiry: expiry }});
            return new Response("success", { UpdatedCount: result.modifiedCount });
        } catch (err) {
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
