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

// Olvide contraseña PASO 1
export const forgotone = (req, res) =>{
    res.render("views.forgot.password.one.ejs");
};

// Olvide contraseña PASO 2
export const forgottwo = (req, res) =>{
    res.render("views.forgot.password.two.ejs");
};

// Olvide contraseña PASO 3
export const forgotthree = (req, res) =>{
    res.render("views.forgot.password.three.ejs");
};