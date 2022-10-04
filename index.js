import "dotenv/config"
import app from "./app.js";
const port = process.env.PORT


app.get("/", (req, res) =>{
    res.send("Welcome to Pent")
})

app.listen(port, () =>{
    console.log(`app is running at ${port}`)
})