import express from "express";
import figlet from "figlet";
import chalk from "chalk";
import morgan from "morgan";
import linksRouter from "./routes/links.js";
import userRouter from "./routes/user.js";
import BusinessAccessLayer from "./bal/bal.js";

const app = express();
const ServerHost = process.env.HOST || "localhost";
const ServerPort = process.env.PORT || 8080;

BusinessAccessLayer.GetBal().then((bal) => {
    app.locals.bal = bal;
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(morgan("combined"));
    app.use("/links", linksRouter);
    app.use("/user", userRouter);

    const server = app.listen(ServerPort, ServerHost, () => {
        let bannerText = chalk.magenta(figlet.textSync("BITLYZER", {
            font: "Big",
            horizontalLayout: "default",
            verticalLayout: "default",
            width: 100,
        }));
        let WebAddress = chalk.green(`http://${server.address().address}:${server.address().port}`);
        console.log(bannerText);
        console.log(`Application is running and listening for incoming requests at ${WebAddress}`);
    });
    
    process.on('SIGINT', async () => {
        console.log("Server Shutdown signal received.");
        console.log("Initiating shutdown now.");
        await bal.Close();
        server.close(() => {
            console.log("Server has been closed.");
            process.exit(0);
        });
    });
}).catch(err => {
    console.error(`Error occurred while setting up the application: ${err}`);
    process.exit(1);
});
