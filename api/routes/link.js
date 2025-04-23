import express from "express";
import authenticate from "../middleware/auth.js";
import validate from "../middleware/validate.js";
import AppError from "../models/error.js";

const linkRouter = express.Router();

/**
 * Route that handles the creation of a new short URL for the given long URL.
 */
linkRouter.post("/generate", authenticate, validate, async (req, res) => {
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
                    let completeShortUrl = new URL(result.data["ShortUrl"], req.app.locals.WebAddress);
                    let data = {
                        "ShortUrl": completeShortUrl.href,
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

/**
 * Route to delete the long URL mapped to the given short URL.
 */
linkRouter.delete("/:hash", authenticate, async (req, res) => {
    let linkHash = req.params.hash;
    let userId = req.validatedUser;
    const result = await req.app.locals.dal.DeleteLink(linkHash, userId);
    if(result.status === "success") {
        res.status(200).json(result.data);
    } else {
        if(result.data.code === "ERR_NOEXISTS") {
            res.status(404).json(result.data.ToJson());
        } else {
            res.status(500).json(result.data.ToJson());
        }
    }
});

export default linkRouter;
