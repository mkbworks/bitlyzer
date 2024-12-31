import express from "express";

const server = express();
const ServerHost = process.env.HOST || "localhost";
const ServerPort = process.env.PORT || 8080;

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.listen(ServerPort, ServerHost, () => {
    console.log(`Web server is running and listening at http://${ServerHost}:${ServerPort}`);
});