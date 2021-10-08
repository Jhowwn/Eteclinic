import  express from "express";
import router from "./routes.js";

const app = express();
app.use(express.json());

app.use('/', router);

const PORT = process.env.PORT || 3000;

app.listen(3333, () =>{
    console.log("Server Online");
});