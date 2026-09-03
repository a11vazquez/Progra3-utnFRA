
/*===================
        IMPORT
=====================*/
import express, { json, response } from "express"; //importamos el framework express.js
import connection from "./src/api/database/db.js"; //importamos la conexion a la BDD
import environments from "./src/api/config/environments.js"; //importamos las varriables de entorno (.env)
import cors from "cors"; //Modulo para que la api pueda ser consumida
const app = express(); //contiene la ejecucion de la instancia express
const PORT = environments.PORT;

/*=================
    Middelwares
=====================*/

app.use(cors());

const url = 'http://localhost:3000'
async function obtenerProductos()
{
    try {
        
        let res = await fetch(`${url}/products`);
        let data = await res.json();
        
        let products = data.payload;
        console.table(products);
    } catch (error) {
            console.error('error obteniendo productos : ', error);
    }
    }

    function init(){
        obtenerProductos();
    }
    /*===================
        Endpoints
=====================*/

//peticiones get, traer datos de la BDD, recibe una peticion(resq) y, da una respuesta(resp)
// declara la sentencia a la BDD

app.get("/products", async (resq, res) =>{
    try {
        const sqlSentence = 'SELECT * FROM products';
        const [rows] = await connection.query(sqlSentence); // enviamos la sentencia a BDD, mediante la conexion importada de database
        //trae rows,fields y, metadatos. con [rows] destructuring y, solo trae las filas de la consulta(cada objeto producto, retorna un array de objetos).
        
        //devolvemos la respuesta, codigo 200 de exito, se parsea a json con una propiedad estandar, payload, para guardar el array de objetos de las rows obtenidas de la BDD en formato json, similar a stringiy, pero json({}) forma parte del entorno de express.
        res.status(200),json({
            payload: rows,
            message: rows.length == 0 ? "No hay Productos" : "Productos Encontrados"
        });

        console.log(rows);

    } catch (err) {
        console.error(err)

        res.status(500),json({
                message: "Error interno al obtener productos"
        });
    }
});

app.get("/products/:id", async (req, res) => {
    try {
        //destructuring solo la id de los parametros, simil let id = req.params.id;
        let {id} = req.params; 

        let sentenceSql = `SELECT * from products WHERE id = ?`;
        const [rows] = await connection.query(sentenceSql,[id]); //Id reemplaza el ?, evita SQL INJECTION

    } catch (error) {
        
    }
});

app.listen(PORT,() =>{
    console.log(`Server running in port: ${PORT}`);
});