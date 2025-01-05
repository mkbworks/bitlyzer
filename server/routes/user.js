import express from "express";
import chalk from "chalk";

const userRouter = express.Router();

userRouter.post("/register", (req, res) => {
    res.format({
        "application/json": async () => {
            let email = req.body.email;
            let name = req.body.name;
            let response = await req.app.locals.dal.NewUser(email, name);
            if(response.status === "success") {
                res.set("Content-Type", "application/json");
                res.status(200);
                res.send(JSON.stringify(response.data));
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

export default userRouter;