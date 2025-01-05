import express from "express";
import chalk from "chalk";
import authenticate from "./../middleware/auth.js";

const linksRouter = express.Router();

linksRouter.get("/:hash", authenticate, async (req, res) => {
    let linkHash = req.params.hash;
    let apiKey = req.get("x-apikey");
    let result = await req.app.locals.dal.FindLink(linkHash, apiKey);
    if(result.status === "success") {
        res.status(302);
        res.append("Location", result.data["link"]);
        res.end();
    } else {
        console.log(chalk.red(result.data.toString()));
        res.status(500);
        res.end();
    }
});

export default linksRouter;