
/*===================
        IMPORT
=====================*/
import express, { json, response } from "express"; //importamos el framework express.js
import connection from "./src/api/database/db.js"; //importamos la conexion a la BDD
import environments from "./src/api/config/environments.js"; //importamos las varriables de entorno (.env)
import cors from "cors"; //Modulo para que la api pueda ser consumida
const app = express(); //contiene la ejecucion de la instancia express
const PORT = environments.port;

/*=================
    Middelwares
=====================*/

app.use(cors()); // permite las peticiones externas
app.use(express.json()); // parsea los datos a json, metodos POST PUT PATH

    


    /*===================
        Endpoints
=====================*/

//peticiones get, traer datos de la BDD, recibe una peticion(resq) y, da una respuesta(resp)
// declara la sentencia a la BDD
app.get("/", async (resq, res) =>{

        res.send("SERVER RUN");
            

});


//Buscar Producto
app.get("/products", async (resq, res) =>{
    try {
        console.log("Peticion exitosa, productos retornados.");
        const sqlSentence = 'SELECT * FROM products';
        const [rows] = await connection.query(sqlSentence); // enviamos la sentencia a BDD, mediante la conexion importada de database
        //trae rows,fields y, metadatos. con [rows] destructuring y, solo trae las filas de la consulta(cada objeto producto, retorna un array de objetos).
        
        //devolvemos la respuesta, codigo 200 de exito, se parsea a json con una propiedad estandar, payload, para guardar el array de objetos de las rows obtenidas de la BDD en formato json, similar a stringiy, pero json({}) forma parte del entorno de express.
        res.status(200).json({
            payload: rows,
            message: rows.length == 0 ? "No hay Productos" : "Productos Encontrados"
        });

        console.log("Productos : ", payload.rows);

    } catch (err) {
        console.error(err)

        res.status(500).json({
                message: "Error interno al obtener productos"
        });
    }
});


//Buscar Producto por ID
app.get("/products/:id", async (req, res) => {
    try {
        //destructuring solo la id de los parametros, simil let id = req.params.id;
        let {id} = req.params; 

        let sentenceSql = `SELECT * from products WHERE id = ?`;
        const [rows] = await connection.query(sentenceSql,[id]); //Id reemplaza el ?, evita SQL INJECTION
        console.log("Producto obtenido por id: ", rows[0]);

        res.status(200).json({
              product: rows[0],
        });
    } catch (error) {
           console.error(err)

        res.status(500).json({
                message: "NO ENCONTRADO"
        });
    }
});



/*POST */
//Crear Producto
app.post("/products", async (req, res) => {
    try {
        /*destructuring , req.body es el objeto parseado con el middelware express.json(), el fetch del lado del cliente, manda el body como json(objeto producto) y, del lado del servidor, se recibe como objeto.
        */
        const {name, image, price, category} = req.body;
        console.table(req.body);
        console.log(typeof(req.body));

        let query = "INSERT INTO products (name, img, price, category) VALUES (?, ?, ?, ?)"
        let [result] = await connection.query(query, [name, image, price, category]);
        
        res.status(201).json({
            message: "producto creado con exito",
            idProduct: result.insertId
        })
    } catch (error) {
         res.status(500).json({
            message: "Error al crear producto"
        })
    }
});


//Eliminar Producto
app.delete("/products/:id", async (req, res) =>{
    try {
        let {id} = req.params;
        console.log(`ID PRODUCTO DEL SERVER: ${id}`);
        let sql = "DELETE FROM products WHERE id = ?"
        //let sql = "UPDATE FROM products  set active = 0 WHERE id = ?"
        let [result] = await connection.query(sql, [id]);

        console.log(result);
        return res.status(200).json({
            result,
            message: `PRODUCT WITH ${id} DELETED`
        });
        
    } catch (error) {
        console.log(`ERROR AL ELIMINAR PRODUCTO CON ID ${id}`);
        res.status(500).json({
            messagge: `ERROR AL ELIMINAR PRODUCTO CON ID, ${id}`,
            error: error.message
        });
    }
});

//Modificar producto
app.put("/products", async (req, res) =>{
    try {
        let {id, name, image, price, category} = req.body;
        console.log(req.body);
        let sql = "UPDATE products set name = ?, img = ?, price = ?, category = ? WHERE id = ?";
        let result = await connection.query(sql,[name, image, price, category, id]);
        console.log(result);

        res.status(200).json({
            message: "Producto actualizado correctamente"
        });

    } catch (error) {
        console.error("Error al actualzar producto : ", error);
        res.status(500).json({
            message: "ERROR SERVER MODIFY",
            modify: error.message
        });
    }


});
    

app.listen(PORT,() =>{
    console.log(`Server running in port: ${PORT}`);
});