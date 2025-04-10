import express from "express";
import AppError from "../models/error.js";
import { ValidateEmail } from "../utils/utilities.js";

/**
 * Middleware to authenticate request from the user by verifying API Key provided in the request headers.
 * @param {express.Request} req Incoming HTTP request
 * @param {express.Response} res HTTP response for the request received.
 * @param {express.NextFunction} next Function to pass the execution to the next handler for the given request-response cycle.
 */
const authenticate = async (req, res, next) => {
    let InApiKey = req.get("x-apikey");
    let InEmail = req.get("x-email");
    if(!ValidateEmail(InEmail)) {
        let errVal = new AppError("ERR_INVALID_EMAIL", "User email address does not conform to the standard email address format");
        res.status(400);
        res.json(errVal.ToJson());
    } else if(InApiKey && InEmail) {
        let result = await req.app.locals.dal.ValidateUser(InEmail, InApiKey);
        if(result.status === "success") {
            req.validatedUser = result.data.ValidatedUser;
            next();
        } else {
            if(result.data.code === "ERR_CUSTOM") {
                res.status(500);
                res.json(result.data.ToJson());
            } else {
                res.status(401);
                res.json(result.data.ToJson());
            }
        }
    } else {
        res.status(401);
        res.set("WWW-Authenticate", "x-apikey");
        let err = new AppError("ERR_NOAUTH", "API Key and user email values are missing in the request header");
        res.json(err.ToJson());
    }
};

export default authenticate;