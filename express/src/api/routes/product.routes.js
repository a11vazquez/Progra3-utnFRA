import {Router} from "express"; //importamos middleware router
import connection from "./src/api/database/db.js"; //importamos la conexion a la BDD
import { validateId } from "../middlewares/middlewares.js";  // importamos middleware de validacion numerica del ID
const router = Router(); // ejecuta la instancia de la funcion Router();


//Buscar Producto
router.get("/", async (req, res) =>{
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

        console.log("Productos : ", rows);

    } catch (err) {
        console.error(err)

        res.status(500).json({
                message: "Error interno al obtener productos"
        });
    }
});


//Buscar Producto por ID
router.get("/:id", validateId, async (req, res) => {
    try {
        //destructuring solo la id de los parametros, simil let id = req.params.id;
        let {id} = req.params; 

      

        let sentenceSql = `SELECT * from products WHERE id = ?`;
        const [rows] = await connection.query(sentenceSql,[id]); //Id reemplaza el ?, evita SQL INJECTION
        console.log("Producto obtenido por id: ", rows[0]);

        if(rows.length){
            res.status(200).json({
                  product: rows[0],
            });
        }else{
            return res.status(404).json({
                message: "NOT FOUND, No se encontro el producto con el ID buscada"
            });
        }
    } catch (error) {
           console.error(err)

        res.status(500).json({
                message: "NO ENCONTRADO"
        });
    }
});



/*POST */
//Crear Producto
router.post("/", async (req, res) => {
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
router.delete("/:id", validateId, async (req, res) =>{
    try {
        let {id} = req.params;
        console.log(`ID PRODUCTO DEL SERVER: ${id}`);
        let sql = "DELETE FROM products WHERE id = ?"
        //let sql = "UPDATE FROM products  set active = 0 WHERE id = ?"
        let [result] = await connection.query(sql, [id]);

            if(result.affectedRows){
                console.log(result);
                return res.status(200).json({
                    result,
                    message: `PRODUCT WITH ${id} DELETED`
                });
            }else{
                res.status(404).json({
                    message: "ERROR!, No se encontro ningun producto con el ID buscado"
                });
            }
        
    } catch (error) {
        console.log(`ERROR AL ELIMINAR PRODUCTO CON ID ${id}`);
        res.status(500).json({
            messagge: `ERROR AL ELIMINAR PRODUCTO CON ID, ${id}`,
            error: error.message
        });
    }
});

//Modificar producto
router.put("/", async (req, res) =>{
    try {
        let {id, name, image, price, category} = req.body;

        //validacion campos requeridos.
        if(!id || !name || !image || !price || !category){
           return res.status(400).json({
                message: "campos no requeridos, no pueden ser null"
            });
        }

            console.log(req.body);
            let sql = "UPDATE products set name = ?, img = ?, price = ?, category = ? WHERE id = ?";
            let result = await connection.query(sql,[name, image, price, category, id]);
            console.log(result);
            
     if(result.affectedRows){
                console.log(result);
                res.status(200).json({
                message: "Producto actualizado correctamente"
            });
            }else{
                res.status(404).json({
                    message: "ERROR!, No se encontro ningun producto con el ID buscado"
                });
            }
           
        

    } catch (error) {
        console.error("Error al actualzar producto : ", error);
        res.status(500).json({
            message: "ERROR SERVER MODIFY",
            modify: error.message
        });
    }


});

export default router;