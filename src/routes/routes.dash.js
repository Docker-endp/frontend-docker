import { Router } from "express";
import { 
    agotados, ldeseos, listarP, listarUsuarios, modificarPU, 
    perfilUsuario, perfilVendedor, productUser, 
    regProduct, regproveedores 
} from "../controllers/controller.dash.js";


const rutaDash = Router();

// USUARIO
rutaDash.get("/perfilu", perfilUsuario )
rutaDash.get("/editarpu", modificarPU )
rutaDash.get("/productu", productUser )
rutaDash.get("/ldesos", ldeseos )


// VENDEDOR
rutaDash.get("/perfilv", perfilVendedor )
rutaDash.get("/clientes", listarUsuarios )
rutaDash.get("/regp", regProduct)
rutaDash.get("/lproductos", listarP)
rutaDash.get("/agotados", agotados)
rutaDash.get("/regprov", regproveedores)


export default rutaDash;

