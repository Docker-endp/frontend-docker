import { Router } from "express";
import { perfilUsuario, perfilVendedor } from "../controllers/controller.dash";


const rutaDash = Router();

rutaDash.get("/perfilu", perfilUsuario )
rutaDash.get("/perfilv", perfilVendedor )

export default rutaDash;

