import { Router } from "express";
import { 
    agotados, listarP, listarUsuarios, modificarPU, 
    perfilUsuario, perfilVendedor, productUser, 
    regProduct, regproveedores 
} from "../controllers/controller.dash.js";


const rutaDash = Router();

// USUARIO
rutaDash.get("/perfilu", perfilUsuario )
rutaDash.get("/editarpu", modificarPU )
rutaDash.get("/productu", productUser )
// VENDEDOR
rutaDash.get("/perfilv", perfilVendedor )
rutaDash.get("/clientes", listarUsuarios )
rutaDash.get("/regp", regProduct)
rutaDash.get("/lproductos", listarP)
rutaDash.get("/agotados", agotados)
rutaDash.get("/regprov", regproveedores)


export default rutaDash;

