import express from "express";
import chalk from "chalk";
import authenticate from "../middleware/auth.js";
import validate from "../middleware/validate.js";

const linkRouter = express.Router();

/**
 * Route that re-routes the given short URL to its mapped long URL.
 */
linkRouter.get("/:hash", authenticate, async (req, res) => {
    let linkHash = req.params.hash;
    let apiKey = req.get("x-apikey");
    let result = await req.app.locals.dal.FindLink(linkHash, apiKey);
    if(result.status === "success") {
        if(result.data["link"] === "") {
            res.status(404);
            res.end();
        } else {
            res.status(302);
            res.set("Location", result.data["link"]);
            res.end();
        }
    } else {
        console.log(chalk.red(result.data.toString()));
        res.status(500);
        res.end();
    }
});

/**
 * Route that handles the creation of a new short URL for the given long URL.
 */
linkRouter.post("/create", authenticate, validate, async (req, res) => {
    res.format({
        "application/json": async () => {
            let apiKey = req.get("x-apikey");
            let link = req.body.link;
            const result = await req.app.locals.dal.NewLink(apiKey, link);
            if(result.status === "success") {
                let data = {
                    "key": result.data["Hash"],
                    "short_url": `${req.app.locals.WebAddress}/${result.data["Hash"]}`,
                    "long_url": link.trim()
                };
                let stringifiedData = JSON.stringify(data);
                res.status(200);
                res.set("Content-Type", "application/json");
                res.set("Content-Length", Buffer.byteLength(stringifiedData).toString());
                res.send(stringifiedData);
            } else {
                if(result.data.code === "ERR_LINK_EXISTS") {
                    let errRes = {
                        code: result.data.code,
                        message: "Short Url for the given link is already available"
                    };
                    let content = JSON.stringify(errRes);
                    res.status(400);
                    res.set("Content-Type", "application/json");
                    res.set("Content-Length", Buffer.byteLength(content).toString());
                    res.send(content);
                } else {
                    console.log(chalk.red(result.data.toString()));
                    res.status(500);
                    res.end();
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
 * Route to delete the long URL mapped to the short URL given.
 */
linkRouter.delete("/:hash", authenticate, async (req, res) => {
    let linkHash = req.params.hash;
    let apiKey = req.get("x-apikey");
    const result = await req.app.locals.dal.DeleteLink(apiKey, linkHash);
    if(result.status === "success") {
        let RowsAffected = result.data;
        if(RowsAffected > 0) {
            res.status(200);
            res.end();
        } else {
            res.status(404);
            res.end();
        }
    } else {
        console.log(chalk.red(result.data.toString()));
        res.status(500);
        res.end();
    }
});

export default linkRouter;