import server from "./server.js";

server.listen(server.get("port"), ()=>{
    console.log(`Frontend-ejecutandose en el puerto: ${server.get("port")}`);
})

