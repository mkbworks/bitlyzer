import express from "express";
import chalk from "chalk";

const userRouter = express.Router();

/**
 * Route to register a new user and return the API Key generated for the user.
 */
userRouter.post("/register", (req, res) => {
    res.format({
        "application/json": async () => {
            let email = req.body.email;
            let name = req.body.name;
            let response = await req.app.locals.dal.NewUser(email, name);
            if(response.status === "success") {
                let content = JSON.stringify(response.data);
                res.append("Content-Type", "application/json");
                res.append("Content-Length", Buffer.byteLength(content).toString())
                res.status(200);
                res.send(content);
            } else {
                if(response.data.code === "ERR_USR_EXISTS") {
                    let errRes = {
                        code: response.data.code,
                        message: "The given email address is already registered"
                    };
                    let content = JSON.stringify(errRes);
                    res.status(400);
                    res.append("Content-Type", "application/json");
                    res.append("Content-Length", Buffer.byteLength(content).toString());
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

export default userRouter;