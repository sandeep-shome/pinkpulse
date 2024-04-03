import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import { dbCon } from "./helpers/dbcon.js";
import userRouter from "./routes/userRoute.js";
import periodRouter from "./routes/period.js";
import { errorHandler } from "./helpers/errorHandler.js";

//CONFIG
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(
  cors({
    credentials: true,
    origin: process.env.ORIGIN,
  })
);

//ROUTER CONFIGURATIONS
app.use("/api/v0/user", userRouter);
app.use("/api/v0/periods", periodRouter);
app.use(errorHandler);

//SERVER CONFIG
dbCon()
  .then(() => {
    app.listen(process.env.PORT, () => {});
  })
  .catch((err) => {});
