import express from "express"
import { publicRouter } from "../route/public-api.js";
import { errorMiddleware } from "../middleware/error-middleware.js";
import { userRouter } from "../route/api.js";
import cors from "cors";

export const web = express();
web.use(express.json());
web.use(publicRouter);
web.use(userRouter);
web.use(errorMiddleware);
web.use(cors());