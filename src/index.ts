import express from "express";
import "express-async-errors";
import { router } from "./router";
import cors from "cors";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();

app.use((req, res, next) => {
    const origin = req.headers.origin;
    if(origin === process.env.FRONT_END_URL) {
        res.setHeader("Access-Control-Allow-Credentials", "true");
    }
    next();
});
app.use(cors({
    origin: process.env.FRONT_END_URL,
    credentials: true
}));
app.use(express.json());
app.use("/api", router);
app.use(errorHandler);

const SERVER_PORT = process.env.SERVER_PORT || 4747;

app.listen(SERVER_PORT, () => console.log(`running at port:${SERVER_PORT}`));