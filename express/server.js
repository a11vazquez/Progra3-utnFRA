
/*===================
        IMPORTS
=====================*/
// , { json, response } 
import express from "express"; //importamos el framework express.js
import environments from "./src/api/config/environments.js"; //importamos las varriables de entorno (.env)
import cors from "cors"; //Modulo para que la api pueda ser consumida
import morgan from "morgan"; //modulo que guarda y, muestra cada peticion al Sv
import expressEjsLayouts from "express-ejs-layouts";
import session from "express-session";

//rutas de los endpoints
import { productRoutes } from "./src/api/routes/index.js";

//configuracion de la ruta absoluta del proyecto
import { _dirname, join } from "./src/api/utils/index.js";



const app = express(); //contiene la ejecucion de la instancia express
const PORT = environments.port; 
const SESSION_KEY = environments.session_key;

/*=================
    Middelwares
=====================*/

app.use(cors()); // permite las peticiones externas
app.use(morgan("dev")); //middleware registra cada peticion http, dev modo desarrollo. combined modo produccion(por defecto)
app.use(express.json()); // parsea los datos a json, metodos POST PUT PATH
app.use("/api/products", productRoutes); // use middleware Routes, pasa la ruta base hacia routes que se encarga de ejecutar la carga del metodo.
app.use(express.static(join(_dirname, "src/public"))); 
app.use(session({
        secret: SESSION_KEY, //configurar una pw para firmar la cookie y, no permitir alterar sesiones

}));



/*========================
        CONFIG
==========================*/
//configuramos EJS como motor de plantillas HTML
app.set("view engine", "ejs"); //Cuando haga res.render(...), va a usar EJS como motor de vistas.


//las vistas se sirvan desde la carpeta views
app.set("views", join(_dirname, "src/views"));

//activa el siste de layout
app.use(expressEjsLayouts);

//cuando se lea una vista con render, layout lo mete dentro de una plantilla predeterminada main.ejs
app.set("layout", "layout/main");

/*===================
        Endpoints
=====================*/

// .render index, gracias al set, el render busca las vistas, las vistas las setiamos en la carpeta src/views, busca el nombre "index", sabiendo que es .ejs por el set del view engine como ejs, que seria el motor que se especifica para servir plantillas estaticas.



app.get("/", async (resq, res) =>{
        res.send("SERVER RUN");     
});

app.listen(PORT,() =>{
    console.log(`Server running in port: ${PORT}`);
});