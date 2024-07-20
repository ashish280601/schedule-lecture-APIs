import "./env.js";
import express from "express";
import router from "./routes.js";
import db from "./src/config/db.js";
import cors from "cors";

const server = express();

const port = process.env.PORT || 9000;

server.use(cors())
server.use(express.urlencoded({ extended: true }))
server.use(express.json());
server.use('/api', router)


server.listen(port, () => {
    try {
        console.log(`Server is listening on port ${port}`);
        db();
    } catch (error) {
        console.error("Error while connecting to server", error);
    }
})