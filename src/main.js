import {web} from "./application/web.js";
import {logger} from "./application/logging.js";
import dotenv from "dotenv";
dotenv.config();

const { PORT } = process.env;

web.listen(PORT, () => {
    logger.info(`App start in http://localhost:${PORT}`);
});