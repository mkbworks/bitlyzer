import express from "express";
import validate from "../middleware/validate.js";
import AppError from "../models/error.js";

const userRouter = express.Router();

/**
 * Route to register a new user and return the API Key generated for the user.
 */
userRouter.post("/register", validate, (req, res) => {
    res.format({
        "application/json": async () => {
            let email = req.body.email;
            let name = req.body.name;
            if(!email) {
                let err = new AppError("ERR_NOEMAIL", "Email address of the user is required.");
                res.status(400);
                res.json(err.ToJson());
            } else if (!name) {
                let err = new AppError("ERR_NONAME", "Display name of the user is required.");
                res.status(400);
                res.json(err.ToJson());
            } else {
                let response = await req.app.locals.dal.NewUser(email, name);
                if(response.status === "success") {
                    res.status(200);
                    res.json(response.data);
                } else {
                    if(response.data.code === "ERR_EMAIL_EXISTS") {
                        res.status(400);
                        res.json(response.data.ToJson());
                    } else {
                        res.status(500);
                        res.json(response.data.ToJson());
                    }
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

export default userRouter;
