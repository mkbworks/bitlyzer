import express from "express";
import chalk from "chalk";
import authenticate from "../middleware/auth.js";

const linkRouter = express.Router();

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
            res.append("Location", result.data["link"]);
            res.end();
        }
    } else {
        console.log(chalk.red(result.data.toString()));
        res.status(500);
        res.end();
    }
});

linkRouter.post("/create", authenticate, async (req, res) => {
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
                res.append("Content-Type", "application/json");
                res.append("Content-Length", Buffer.byteLength(stringifiedData));
                res.send(stringifiedData);
            } else {
                console.log(chalk.red(result.data.toString()));
                res.status(500);
                res.end();
            }
        },
        default: () => {
            res.append("Accept-Post", "application/json");
            res.status(415);
            res.end();
        }
    });
});

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