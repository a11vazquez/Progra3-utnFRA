
/*===================
        IMPORTS
=====================*/
import express from "express"; //importamos el framework express.js, , antes npm i express
import environments from "./src/api/config/environments.js"; //importamos las varriables de entorno (.env)
import cors from "cors"; //Modulo para que la api pueda ser consumidam, antes npm i cors
import morgan from "morgan"; //modulo que guarda y, muestra cada peticion al Sv, , antes npm i morgan
import expressEjsLayouts from "express-ejs-layouts"; //modulo para establecer layouts predeterminados en ejs al servir con send
import session from "express-session"; //modulo para el login, antes npm i express-session

//rutas de los endpoints
import { productRoutes, viewsRoutes, userRoutes } from "./src/api/routes/index.js";

//configuracion de la ruta absoluta del proyecto
import { _dirname, join } from "./src/api/utils/index.js";
import connection from "./src/api/database/db.js";
import bcrypt from "bcrypt";

/*=============
    VARIABLES
 =============*/
const app = express(); //contiene la ejecucion de la instancia express
const PORT = environments.port; //numero de puerto
const SESSION_KEY = environments.session_key; //clave para firmar la cookie para el login


/*========================
     CONFIG EJS / VIEWS
==========================*/
//configuramos EJS como motor de plantillas HTML
app.set("view engine", "ejs"); //Cuando haga res.render(...), va a usar EJS como motor de vistas.


//las vistas se sirvan desde la carpeta views
app.set("views", join(_dirname, "src/views"));

//activa el sistema de layout
app.use(expressEjsLayouts);

//cuando se lea una vista con render, layout lo mete dentro de una plantilla predeterminada main.ejs
app.set("layout", "layout/main");

/*=================
    Middelwares
=====================*/

app.use(cors()); // permite las peticiones externas 
app.use(express.json()); // parsea los datos enviados con fetch a objeto js, metodos POST PUT PATH
app.use(express.urlencoded({ extended: true })); //parsea los datos a objeto js enviados desde el form con HTML.
app.use(express.static(join(_dirname, "src/public"))); //middleware para establecer ruta donde leer los archivos de EJS servidos con send
app.use(session({//middleware para el login(config)
        secret: SESSION_KEY, //configurar una pw para firmar la cookie y, no permitir crear una session inexistente y, acceder a las rutas. protege las rutas de sesiones inxistentes.
        resave: false, // evita guardar la session si no hubo cambios
        saveUninitialized: true //no permite guardar sesiones vacias
}));
app.use(morgan("dev")); //middleware registra cada peticion http, dev modo desarrollo. combined modo produccion(por defecto)

/*==================
        ROUTES
==================*/

//rutas productos
app.use("/api/products", productRoutes); // use middleware Routes, pasa la ruta base hacia routes que se encarga de ejecutar la carga del metodo.

//rutas vistas panel
app.use("/", viewsRoutes); //cuando se sirve ejs, busca las rutas desde aca

//rutas user admin
app.use("/api/user", userRoutes);


app.post("/login", async (req,res) => {
        try {
        //destructuring de datos desde el body
          const {name, email, password} = req.body;

          //validacion de campos
          if(!name || !email || !password){
                return res.render("login", {
                        title: "Login",
                        error: "Todos los campos son necesarios"
                });
          }

        //SIN BCRYPT
        ///1. ver que exista un usuario con el name y, password recibidos.
        // const sql = "SELECT * FROM users WHERE name = ? AND email = ? AND password = ?"; 
        // const [rows] = await connection.query(sql, [name, email, password]);
        
          //Con bcrypt, 1. solo traemos el email
          const sql = "SELECT * FROM users WHERE email = ?";
          const [rows] = await connection.query(sql,[email]);

        //si no retorno nada es por que no existe el usuario en la BDD, retornamos el login con mensaje de error
        if(!rows.length){
                return res.render("login", {
                        title: "Login",
                        error: "Name/email o password no validos"
                });
        }    

        const user = rows[0];// guardamos el objeto usuario recibido de la BDD

        //Con bcrypt, 2. comparamos los hashes de las password
        const match = await bcrypt.compare(password, user.password);
        //si coinciden, devuelve true.
        
        console.log("PASSWORD IGUAL? : ", match);
        if(match){
                //guardamos la session
                req.session.user = {
                        id: user.id,
                        userName: user.name,
                        email: user.email
                }
        
                //Una vez guardado el usuario y, la session, redireccionamos al dashboard
                res.redirect("/panel");
        }else{
               return res.render("login", {
                title: "Login",
                error: "contraseña incorrecta"
               })
        }

        } catch (error) {
                console.log("ERROR EN EL LOGIN : ", error);
                res.status(500).json({
                        error: "error interno en el servidor LOGIN"
                });
        }
});

app.post("/logout", (req,res) =>{
        req.session.destroy((err) =>{
                if(err){
                        console.log("Error al destruir la session : ", err);
                        return res.status(500).json({
                                error: "Error al cerrar la session"
                        });
                }
        });

        res.redirect("/login");
});
/*===================
        Endpoints
=====================*/

// .render index, gracias al set, el render busca las vistas, las vistas las setiamos en la carpeta src/views, busca el nombre "index", sabiendo que es .ejs por el set del view engine como ejs, que seria el motor que se especifica para servir plantillas estaticas.



// app.get("/", async (resq, res) =>{
//         res.send("SERVER RUN");     
// });

app.listen(PORT,() =>{
    console.log(`Server running in port: ${PORT}`);
});