import express from "express";
import path from "path";
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';
import { RegisterRoutes } from "./routes/routes";
import { initMongo } from "./models/models";
import { errorHandler } from "./middlewares/responseHandler";
import { tokenService } from "./services/tokenService";
import { socketAuthentication } from "./middlewares/authHandler";
import { RegisterSocketRoutes } from "./routes/socket";

const port = process.env.PORT || 8123;
const app = express();

app.use(express.static(path.resolve("public")));
app.use(express.json());

// app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.options("*", cors());

RegisterRoutes(app);

// app.use((req, res, next) => {
//     console.log("ssss");
//     next();
// });

app.use(errorHandler);

initMongo().then(() => {
    console.log("connected to database");

    const server = http.createServer(app);
    const io = new Server(server, {
        cors: {
            origin: "*"
        }
    });

    io.use((...args) => socketAuthentication(...args).catch(console.log));

    RegisterSocketRoutes(io);

    server.listen(port, () => {
        console.log(`listening on ${port}...`);
    });
});
