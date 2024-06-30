import { Router } from "express";
import { listarUsuarios, modificarPU, perfilUsuario, perfilVendedor } from "../controllers/controller.dash";


const rutaDash = Router();

rutaDash.get("/perfilu", perfilUsuario )
rutaDash.get("/perfilv", perfilVendedor )
rutaDash.get("/clientes", listarUsuarios )
rutaDash.get("/editarpu", modificarPU )


export default rutaDash;

