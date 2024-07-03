import { Router } from "express";
import { forgotone, forgotthree, forgottwo, home, login, register } from "../controllers/controller.home.js";


const rutaHome = Router();

rutaHome.get("/",home)
rutaHome.get("/register", register)
rutaHome.get("/login", login)
rutaHome.get("/fone", forgotone)
rutaHome.get("/ftwo", forgottwo)
rutaHome.get("/fthree", forgotthree)


export default rutaHome;