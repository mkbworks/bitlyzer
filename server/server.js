import express from "express";
import figlet from "figlet";
import chalk from "chalk";

const app = express();
const ServerHost = process.env.HOST || "localhost";
const ServerPort = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const server = app.listen(ServerPort, ServerHost, () => {
    let bannerText = chalk.magenta(figlet.textSync("BITLYZER", {
        font: "Big",
        horizontalLayout: "default",
        verticalLayout: "default",
        width: 100,
    }));
    let WebAddress = chalk.green(`http://${ServerHost}:${ServerPort}`)
    console.log(bannerText);
    console.log(`Application is running and listening for incoming requests at ${WebAddress}`);
});

process.on('SIGINT', () => {
    console.log("Server Shutdown signal received.");
    console.log("Initiating shutdown now.");
    server.close(() => {
        console.log("Server has been closed.");
        process.exit(0);
    });
});