//To see how the final website should work, run "node solution.js".
//Make sure you have installed all the dependencies with "npm i".
//The password is ILoveProgramming
import express from "express";
import bodyParser from "body-parser";
import {dirname} from "path";
import { url } from "inspector";
import { fileURLToPath } from "url";
const _dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

let authorise = false;

function authorisepassword(req, res, next) {
    const password = req.body["password"]
    if (password === "iloveprogram") {
        authorise = true;
    }
    next();
}


app.get("/", (req, res) => {
    res.sendFile(_dirname + "/public/index.html");
})


app.use(authorisepassword);


app.post("/check", (req, res) => {
    if (authorise) {
        res.sendFile(_dirname + "/public/secret.html");
    } else {
        res.redirect("/")
    }
})



app.listen(port, () => {
    console.log(`Server is running on ${port}`)
})