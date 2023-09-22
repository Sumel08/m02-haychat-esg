
import {notificationHandler} from "./routes";

const api = require('lambda-api')();

api.use((req, res, next) => {
    res.cors();
    next();
})

api.post('/esg/haychat/webhook', notificationHandler)

export const handle = async (event, context) => {
    api.app({});
    return api.run(event, context);
}
