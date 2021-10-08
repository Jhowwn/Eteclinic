import {smtp} from "./sendEmailConfig.js";

const config={
    host: smtp.host,
    port: smtp.port,
    auth:{
        user: smtp.user,
        pass: smtp.pass,
    },
    secure: false,
    tls:{
        rejectUnauthorized: false,
    }
};

export {config};