import express from "express";
import cors from "cors"
import "./config/connect.js"
import authroute from "./routes/authroute.js"
import mainroute from "./routes/mainroute.js"
const app = express()

app.use(cors())

app.use(express.json());
app.use(
    express.urlencoded({
      extended: false,
    })
    );
app.use(authroute)
app.use(mainroute)
  
export default app