import express from "express";
import { router } from "./router";

const app = express();

app.use(express.json());
app.use("/api", router);

const SERVER_PORT = process.env.SERVER_PORT || 4747;

app.listen(SERVER_PORT, () => console.log(`running at port:${SERVER_PORT}`));