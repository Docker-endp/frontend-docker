import { Router } from "express";
import { listarUsuarios, perfilUsuario, perfilVendedor } from "../controllers/controller.dash";


const rutaDash = Router();

rutaDash.get("/perfilu", perfilUsuario )
rutaDash.get("/perfilv", perfilVendedor )
rutaDash.get("/clientes", listarUsuarios )

export default rutaDash;

