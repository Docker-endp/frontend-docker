// RUTAS DEL USUARIO

// Perfilusuario
export const perfilUsuario = (req, res) =>{
    res.render("views.dash.user.ejs");
};


// RUTAS VENDEDOR
export const perfilVendedor = (req, res) =>{
    res.render("views.dash.vendedor.ejs");
};

// Mostrar Clientes
export const listarUsuarios = (req, res) =>{
    res.render("views.registrados.clientes.ejs");
};