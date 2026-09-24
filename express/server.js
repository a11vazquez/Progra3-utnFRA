
/*===================
        IMPORTS
=====================*/
import express, { json, response } from "express"; //importamos el framework express.js
import environments from "./src/api/config/environments.js"; //importamos las varriables de entorno (.env)
import cors from "cors"; //Modulo para que la api pueda ser consumida
import morgan from "morgan";

import { productRoutes } from "./src/api/routes/index.js";

const app = express(); //contiene la ejecucion de la instancia express
const PORT = environments.port;

/*=================
    Middelwares
=====================*/

app.use(cors()); // permite las peticiones externas
app.use(express.json()); // parsea los datos a json, metodos POST PUT PATH
app.use(morgan("dev")); //middleware registra cada peticion http, dev modo desarrollo. combined modo produccion(por defecto)
app.use("/api/products", productRoutes); // use middleware Routes, pasa la ruta base hacia routes que se encarga de ejecutar la carga del metodo.

/*===================
        Endpoints
=====================*/

app.get("/", async (resq, res) =>{
        res.send("SERVER RUN");     
});

app.listen(PORT,() =>{
    console.log(`Server running in port: ${PORT}`);
});