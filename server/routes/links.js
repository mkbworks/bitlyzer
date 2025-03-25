import express from "express";
import authenticate from "../middleware/auth.js";
import validate from "../middleware/validate.js";
import AppError from "../models/error.js";

const linkRouter = express.Router();

/**
 * Route that handles the creation of a new short URL for the given long URL.
 */
linkRouter.post("/new", authenticate, validate, async (req, res) => {
    res.format({
        "application/json": async () => {
            let userId = req.validatedUser;
            let { target, action, shortUrl = undefined, expiry } = req.body;
            if(!target) {
                let err = new AppError("ERR_NOTARGET", "Target URL is required for creating a link record.");
                res.status(400).json(err.ToJson());
            } else if (!action) {
                let err = new AppError("ERR_NOACTION", "Action value is required for creating a link record.");
                res.status(400).json(err.ToJson());
            } else if(!expiry) {
                let err = new AppError("ERR_NOEXPIRY", "Link expiry is required for creating a link record.");
                res.status(400).json(err.ToJson());
            } else {
                const result = await req.app.locals.dal.NewLink(target, action, shortUrl, userId, expiry);
                if(result.status === "success") {
                    let data = {
                        "ShortUrl": `${req.app.locals.WebAddress}/${result.data["ShortUrl"]}`,
                        "Target": target,
                        "Action": action,
                        "Expiry": expiry
                    };
                    
                    res.status(200);
                    res.json(data);
                } else {
                    res.status(500);
                    res.json(result.data.ToJson());
                }
            }
        },
        default: () => {
            res.append("Accept-Post", "application/json");
            res.status(415);
            res.end();
        }
    });
});

export default linkRouter;