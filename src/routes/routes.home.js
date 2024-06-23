import { Router } from "express";
import { home, register } from "../controllers/controller.home.js";


const rutaHome = Router();

rutaHome.get("/", home )
rutaHome.get("/register", register)

export default rutaHome;