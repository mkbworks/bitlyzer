import express from "express";

/**
 * Middleware to validate user data sent as part of the request like email, name etc.
 * @param {express.Request} req Incoming HTTP request
 * @param {express.Response} res HTTP response for the incoming request.
 * @param {express.NextFunction} next Function to pass the execution to the next handler for the given request-response cycle.
 */
const validate = async (req, res, next) => {
    let isValid = true;
    let errorMsgs = [];
    if(req.body.email) {
        const emailPattern = /^[a-z][a-z0-9\-\._]+[a-z0-9]@[a-z][a-z0-9\.\-]+[a-z0-9]$/ig;
        let emailValue = req.body.email.trim();
        if(!emailPattern.test(emailValue)) {
            isValid = false;
            errorMsgs.push("email has an invalid value");
        }
    }

    if(req.body.name) {
        const namePattern = /^[a-zA-Z][a-zA-Z\s]+$/g;
        let nameValue = req.body.name.trim();
        if(!namePattern.test(nameValue)) {
            isValid = false;
            errorMsgs.push("name has an invalid value");
        }
    }

    if(req.body.link) {
        const linkPattern = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$/ig;
        const linkValue = req.body.link.trim();
        if(!linkPattern.test(linkValue)) {
            isValid = false;
            errorMsgs.push("link has an invalid value");
        }
    }

    if(isValid) {
        next();
    } else {
        let errVal = {
            code: "ERR_INVALID_VALUE",
            message: errorMsgs.join(", ")
        };
        let content = JSON.stringify(errVal);
        res.status(400);
        res.set("Content-Type", "application/json");
        res.set("Content-Length", Buffer.byteLength(content).toString());
        res.send(content);
    }
};

export default validate;