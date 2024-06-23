import { config } from "dotenv";
config();

export const home = (req, res) =>{
    res.render("views.home.ejs")
};

// Register
export const register = (req, res) =>{
    const url = process.env.BACKEND_URL;
    const options = {
        url : url
    };
    res.render("views.register.ejs", options);
};