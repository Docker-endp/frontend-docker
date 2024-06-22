import { Router } from "express";
import { home } from "../controllers/controller.home.js";


const rutaHome = Router();

rutaHome.get("/", home )

export default rutaHome;