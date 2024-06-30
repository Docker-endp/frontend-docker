// RUTAS DEL USUARIO

// Perfilusuario
export const perfilUsuario = (req, res) =>{
    res.render("views.dash.user.ejs");
};

// Editar perfil
export const modificarPU = (req, res) =>{
    res.render("views.editarperfilU.ejs");
};


// RUTAS VENDEDOR
export const perfilVendedor = (req, res) =>{
    res.render("views.dash.vendedor.ejs");
};

// Mostrar Clientes
export const listarUsuarios = (req, res) =>{
    res.render("views.registrados.clientes.ejs");
};