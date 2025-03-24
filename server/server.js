import express from "express";
import figlet from "figlet";
import chalk from "chalk";
import morgan from "morgan";
import linkRouter from "./routes/links.js";
import userRouter from "./routes/users.js";
import DataAccessLayer from "./dal/db.js";

const app = express();
const ServerHost = process.env.HOST || "localhost";
const ServerPort = process.env.PORT || 8080;

DataAccessLayer.ConnectToDb().then((dal) => {
    app.locals.dal = dal;
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(morgan("combined"));
    app.use("/links", linkRouter);
    app.use("/users", userRouter);

    const server = app.listen(ServerPort, ServerHost, () => {
        let bannerText = chalk.magenta(figlet.textSync("go.coc", {
            font: "Big",
            horizontalLayout: "default",
            verticalLayout: "default",
            width: 100,
        }));
        let WebAddress = `http://${server.address().address}:${server.address().port}`;
        console.log(bannerText);
        console.log(`Application is running and listening for incoming requests at ${chalk.green(WebAddress)}`);
        app.locals.WebAddress = WebAddress;
    });
    
    process.on('SIGINT', async () => {
        console.log("Server Shutdown signal received.");
        console.log("Initiating shutdown now.");
        await dal.Close();
        server.close(() => {
            console.log("Server has been shutdown.");
            process.exit(0);
        });
    });
}).catch(err => {
    console.error(`Error occurred while connecting to database: ${err}`);
    process.exit(1);
});
