import { config } from "dotenv";
config();

// Pagina Principal
export const home = (req, res) =>{
    res.render("views.home.ejs")
};

// Register
export const register = (req, res) =>{
    res.render("views.register.ejs");
};

// login
export const login = (req, res) =>{
    res.render("views.login.ejs");
};