import { Router } from "express";


const rutaDash = Router();

rutaDash.get("/principal", (req, res)=>{ 
    res.send("<h1 > Usuarios </h1>");
    })

export default rutaDash;

