import express from "express";
import AppError from "../models/error.js";
import { ValidateEmail } from "../utils/utilities.js";

/**
 * Middleware to validate user data sent as part of the request payload like email, name etc.
 * @param {express.Request} req Incoming HTTP request
 * @param {express.Response} res HTTP response for the incoming request.
 * @param {express.NextFunction} next Function to pass the execution to the next handler for the given request-response cycle.
 */
const validate = async (req, res, next) => {
    let isValid = true;
    let errorMsgs = [];
    if(req.body.email) {
        let emailValue = req.body.email.trim();
        if(!ValidateEmail(emailValue)) {
            isValid = false;
            errorMsgs.push("User email address does not conform to the standard email address format");
        }
    }

    if(req.body.name) {
        const namePattern = /^[a-zA-Z][a-zA-Z\s]+$/g;
        let nameValue = req.body.name.trim();
        if(!namePattern.test(nameValue)) {
            isValid = false;
            errorMsgs.push("User display name can contain only alphabets (lowercase, uppercase) and whitespaces");
        }
    }

    if(req.body.link) {
        const linkPattern = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$/ig;
        const linkValue = req.body.link.trim();
        if(!linkPattern.test(linkValue)) {
            isValid = false;
            errorMsgs.push("Target URL does not conform to the standard URL format");
        }
    }

    if(isValid) {
        next();
    } else {
        let errVal = new AppError("ERR_NOCONFORM", errorMsgs.join(", "));
        res.status(400);
        res.json(errVal.ToJson());
    }
};

export default validate;