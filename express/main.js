
/*===================
        IMPORT
=====================*/
import express from "express"; //importamos el framework express.js
import connection from "./src/api/database/db.js"; //importamos la conexion a la BDD
import environments from "./src/api/config/environments.js"; //importamos las varriables de entorno (.env)

const app = express(); //contiene la ejecucion de la instancia express

const PORT = environments.PORT;

/*===================
        Endpoints
=====================*/

//peticiones get, traer datos de la BDD, recibe una peticion(resq) y, da una respuesta(resp)
// declara la sentencia a la BDD

app.get("/products", async (resq, resp) =>{
    try {
        const sqlSentence = 'SELECT * FROM products';
        const res = await connection.query(sqlSentence); // enviamos la sentencia a BDD, mediante la conexion importada de database


    } catch (error) {
        
    }
});


app.listen(PORT,(err) =>{
    console.log(`Server running in port: ${PORT}`);
});