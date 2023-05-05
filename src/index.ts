import express from "express";
import "express-async-errors";
import { router } from "./router";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();

app.use(express.json());
app.use("/api", router);
app.use(errorHandler);

const SERVER_PORT = process.env.SERVER_PORT || 4747;

app.listen(SERVER_PORT, () => console.log(`running at port:${SERVER_PORT}`));