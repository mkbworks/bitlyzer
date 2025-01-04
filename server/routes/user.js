import express from "express";

const userRouter = express.Router();

userRouter.post("/register", (req, res) => {
    res.format({
        "application/json": async () => {
            let email = req.body.email;
            let name = req.body.name;
            let user = await req.app.locals.dal.NewUser(email, name);
            res.set("Content-Type", "application/json");
            res.status(200);
            res.send(JSON.stringify(user));
        },
        default: () => {
            const reqType = req.get("Content-Type");
            let err = {
                "Code": "ERR_INVALID_TYPE",
                "Message": `Expected request payload to be of type - 'application/json', but got a payload of type '${reqType}'`
            }

            res.status(406).send(JSON.stringify(err));
        }
    });
});

export default userRouter;