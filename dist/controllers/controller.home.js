import { config } from "dotenv";
config();

// Pagina Principal
export const home = (req, res) =>{
    res.render("views.home.ejs")
};

// Register
export const register = (req, res) =>{
    const url = process.env.BACKEND_URL;
    const options = {
        url : url
    }
    res.render("views.register.ejs", options);
};

// login
export const login = (req, res) =>{
    const url = process.env.BACKEND_URL;
    const options = {
        url : url
    }
    res.render("views.login.ejs", options);
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