import {web} from "./application/web.js";
import {logger} from "./application/logging.js";

web.listen(333, () => {
    logger.info('App start in http://localhost:333');
});