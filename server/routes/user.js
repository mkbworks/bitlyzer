import express from "express";
import validate from "../middleware/validate.js";

const userRouter = express.Router();

/**
 * Route to register a new user and return the API Key generated for the user.
 */
userRouter.post("/register", validate, (req, res) => {
    res.format({
        "application/json": async () => {
            let email = req.body.email;
            let name = req.body.name;
            let response = await req.app.locals.dal.NewUser(email, name);
            if(response.status === "success") {
                let content = JSON.stringify(response.data);
                res.set("Content-Type", "application/json");
                res.set("Content-Length", Buffer.byteLength(content).toString())
                res.status(200);
                res.send(content);
            } else {
                if(response.data.code === "ERR_EMAIL_EXISTS") {
                    let errRes = {
                        code: response.data.code,
                        message: "The given email address is already registered to an existing user"
                    };
                    let content = JSON.stringify(errRes);
                    res.status(400);
                    res.set("Content-Type", "application/json");
                    res.set("Content-Length", Buffer.byteLength(content).toString());
                    res.send(content);
                } else {
                    res.status(500);
                    let content = JSON.stringify(response.data.toJson());
                    res.set("Content-Type", "application/json");
                    res.set("Content-Length", Buffer.byteLength(content).toString());
                    res.send(content);
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