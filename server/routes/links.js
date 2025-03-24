import express from "express";
import authenticate from "../middleware/auth.js";
import validate from "../middleware/validate.js";

const linkRouter = express.Router();

/**
 * Route that re-routes the given short URL to its mapped long URL.
 */
linkRouter.get("/:hash", async (req, res) => {
    let shortUrl = req.params.hash;
    let result = await req.app.locals.dal.FindLink(shortUrl);
    if(result.status === "success") {
        let { Target, Action } = result.data;
        if(Action === "redirect") {
            res.append("Location", Target.trim());
            res.end();
        }
    } else {
        if(result.data.code === "ERR_EXPIRED" || result.data.code === "ERR_NOEXISTS") {
            res.status(404);
            res.json(result.data.ToJson());
        } else {
            res.status(500);
            res.json(result.data.ToJson());
        }
    }
});

/**
 * Route that handles the creation of a new short URL for the given long URL.
 */
linkRouter.post("/create", authenticate, validate, async (req, res) => {
    res.format({
        "application/json": async () => {
            let userId = req.validatedUser;
            let { target, action, shortUrl = undefined, expiry } = req.body;
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
    let apiKey = req.get("x-apikey");
    const result = await req.app.locals.dal.DeleteLink(apiKey, linkHash);
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