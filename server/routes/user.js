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
                res.status(200);
                res.json(response.data);
            } else {
                if(response.data.code === "ERR_EMAIL_EXISTS") {
                    let errRes = {
                        code: response.data.code,
                        message: "The given email address is already registered to an existing user"
                    };
                    res.status(400);
                    res.json(errRes);
                } else {
                    res.status(500);
                    res.json(response.data.ToJson());
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