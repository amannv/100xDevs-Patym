import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors"
import { ConnectDB } from "./db/db.js";
import userRouter from "./routes/userRoutes.js";
import accountRouter from "./routes/accountRouter.js";

const app = express();
app.use(express.json());
app.use(cors());
ConnectDB();

app.use("/api/v1/user", userRouter);
app.use("/api/v1/account", accountRouter);

app.listen(3000, () => {
    console.log("server is running on port 3000");
});
