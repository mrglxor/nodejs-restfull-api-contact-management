import {web} from "./application/web.js";
import {logger} from "./application/logging.js";
import dotenv from "dotenv";
dotenv.config();

const { PORT } = process.env;

web.listen(PORT, () => {
    logger.info(`App start in http://localhost:${PORT}`);
});

web.get("/", (req, res) => res.send("Welcome to the Management Contact API!"));
web.all("*", (req, res) =>res.send("You've tried reaching a route that doesn't exist."));