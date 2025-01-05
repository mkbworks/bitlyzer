import chalk from "chalk";
import express from "express";

/**
 * Middleware to authenticate request from the user by verifying API Key provided in the request headers.
 * @param {express.Request} req - Incoming HTTP request
 * @param {express.Response} res - HTTP response for the request received.
 * @param {express.NextFunction} next - Function to pass the execution to the next handler for the given request-response cycle.
 */
const authenticate = async (req, res, next) => {
    const InApiKey = req.get("x-apikey");
    if(!InApiKey) {
        let result = await req.app.locals.dal.ValidateUser(InApiKey);
        if(result.status === "success") {
            let isValid = result.data;
            if(isValid) {
                next();
            } else {
                res.status(401);
                res.set("WWW-Authenticate", "x-apikey");
                res.end();
            }
        } else {
            console.log(chalk.red(result.data.toString()));
            res.status(500);
            res.end();
        }
    } else {
        res.status(400);
        res.end();
    }
};

export default authenticate;