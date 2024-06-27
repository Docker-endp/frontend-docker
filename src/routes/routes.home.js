import { Router } from "express";
import { home, login, register } from "../controllers/controller.home.js";


const rutaHome = Router();

rutaHome.get("/",home )
rutaHome.get("/register", register)
rutaHome.get("/login", login)

export default rutaHome;