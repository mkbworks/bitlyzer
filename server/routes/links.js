import express from "express";
import authenticate from "./../middleware/auth.js";

const linksRouter = express.Router();

linksRouter.get("/:hash", authenticate, (req, res) => {
    let linkHash = req.params.hash;
    
});

export default linksRouter;