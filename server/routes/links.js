import express from "express";
import authenticate from "./../middleware/auth.js";

const linksRouter = express.Router();

linksRouter.get("/:hash", authenticate, async (req, res) => {
    let linkHash = req.params.hash;
    let apiKey = req.get("x-apikey");
    let linkRecord = await req.app.locals.dal.FindLink(linkHash, apiKey);
    res.status(302);
    res.append("Location", linkRecord["link"]);
    res.end();
});

export default linksRouter;