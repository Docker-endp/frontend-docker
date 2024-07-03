import express from "express"
import ruta from "./routes/index.js";
import path from "path"
import ejs from "ejs"
import { config } from "dotenv";
config();
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = express();

server.use("/", ruta)

// midlleware
server.set("port", process.env.PORT);

server.set('view engine', 'ejs');

server.set("views", path.join (__dirname,"views"))

server.use(express.static(path.join(__dirname,"public")));

// Error 404
server.use("/",(req,res) =>{
    res.render("views.error404.ejs");
})



export default server;