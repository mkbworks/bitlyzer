import express from "express";

const userRouter = express.Router();

userRouter.post("/register", (req, res) => {
    res.format({
        "application/json": async () => {
            let email = req.body.email;
            let name = req.body.name;
            await req.app.locals.bal.NewUser(email, name);
        },
        default: () => {
            let recvType = req.get("Content-Type");
            let errorMsg = `Expected a JSON as a request payload, but got ${recvType} instead.`;
            res.status(406).send(errorMsg);
        }
    });
});

export default userRouter;