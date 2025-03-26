import express from "express";
import figlet from "figlet";
import chalk from "chalk";
import morgan from "morgan";

import linksRouter from "./routes/links.js";
import usersRouter from "./routes/users.js";
import DataAccessLayer from "./dal/db.js";
import authenticate from "./middleware/auth.js";

const app = express();
const ServerHost = process.env.HOST || "localhost";
const ServerPort = process.env.PORT || 8080;
let server = null;
let dal_instance = null;

DataAccessLayer.ConnectToDb().then((dal) => {
    dal_instance = dal;
    app.locals.dal = dal;
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(morgan("combined"));
    app.use("/links", linksRouter);
    app.use("/users", usersRouter);

    /**
     * Route that re-routes the given short URL to its mapped long URL.
     */
    app.get("/:hash", async(req, res) => {
        let shortUrl = req.params.hash;
        let result = await dal.FindLink(shortUrl);
        if(result.status === "success") {
            let { Target, Action } = result.data;
            if(Action === "redirect") {
                res.redirect(Target.trim());
            }
        } else {
            if(result.data.code === "ERR_EXPIRED" || result.data.code === "ERR_NOEXISTS") {
                res.status(404);
                res.json(result.data.ToJson());
            } else {
                res.status(500);
                res.json(result.data.ToJson());
            }
        }
    });

    /**
     * Route to delete the long URL mapped to the given short URL.
     */
    app.delete("/:hash", authenticate, async (req, res) => {
        let linkHash = req.params.hash;
        let userId = req.validatedUser;
        const result = await dal.DeleteLink(linkHash, userId);
        if(result.status === "success") {
            res.status(200).json(result.data);
        } else {
            if(result.data.code === "ERR_NOEXISTS") {
                res.status(404).json(result.data.ToJson());
            } else {
                res.status(500).json(result.data.ToJson());
            }
        }
    });

    server = app.listen(ServerPort, ServerHost, () => {
        let bannerText = chalk.magenta(figlet.textSync("bitlyzer", {
            font: "Big",
            horizontalLayout: "default",
            verticalLayout: "default",
            width: 100,
        }));
        let WebAddress = new URL(`http://${ServerHost}:${ServerPort}`);
        console.log(bannerText);
        console.log(`Application is running and listening for incoming requests at ${chalk.green(WebAddress.href)}`);
        app.locals.WebAddress = WebAddress.href;
    });
}).catch(err => {
    console.error(`Error occurred while connecting to database: ${err}`);
    process.exit(1);
});

process.on('SIGINT', async () => {
    console.log("Server Shutdown signal received.");
    console.log("Initiating shutdown now.");
    await dal_instance.Close();
    server.close(() => {
        console.log("Server has been shutdown.");
        process.exit(0);
    });
});