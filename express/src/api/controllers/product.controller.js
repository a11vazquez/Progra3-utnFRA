import connection  from "../database/db.js" // importo el pool de conexiones
import productModels from "../models/product.models.js";
//GET products METHOD 
export const getProducts =  async (req, res) =>{
    try {
        console.log("Peticion exitosa, productos retornados.");
        
       const [rows] = await productModels.selectAllProducts();
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
};

//GET ID METHOD
export const getProductById = async (req, res) => {
    try {
        //destructuring solo la id de los parametros, simil let id = req.params.id;
        let {id} = req.params; 

        const product = await productModels.selectProductWhereId(id);
        product ?  res.status(200).json({
                  product: product,
            }) :  res.status(404).json({
                message: "NOT FOUND, No se encontro el producto con el ID buscada"
            });
        console.log("Producto obtenido por id: ", product);

        // if(product){
        //     res.status(200).json({
        //           product: product,
        //     });
        // }else{
        //     return res.status(404).json({
        //         message: "NOT FOUND, No se encontro el producto con el ID buscada"
        //     });
        // }
    } catch (error) {
           console.error(error)

        res.status(500).json({
                message: "NO ENCONTRADO"
        });
    }
};

//POST METHOD 
export const createProduct =  async (req, res) => {
    try {
        /*destructuring , req.body es el objeto parseado con el middelware express.json(), el fetch del lado del cliente, manda el body como json(objeto producto) y, del lado del servidor, se recibe como objeto.
        */
         const {name, image, price, category} = req.body;
        const result =  await productModels.insertProduct(name, image, price, category);
        console.log("resultado id : ", result);
        result ? 
        res.status(201).json({
            message: "producto creado con exito",
            idProduct: result
        }) : res.status(400).json({
            message: "falla al crear el producto"
        });
    } catch (error) {
         res.status(500).json({
            message: "Error al crear producto"
        })
    }
}

export const deleteProductById =  async (req, res) =>{
    try {
        let {id} = req.params;
        console.log(`ID PRODUCTO DEL SERVER: ${id}`);
            const result = productModels.deleteProduct(id);
            result ? 
                res.status(200).json({
                    result,
                    message: `PRODUCT WITH ${id} DELETED`
                }) : res.status(404).json({
                    message: "ERROR!, No se encontro ningun producto con el ID buscado"
                });

        
    } catch (error) {
        console.log(`ERROR AL ELIMINAR PRODUCTO CON ID ${id}`);
        res.status(500).json({
            messagge: `ERROR AL ELIMINAR PRODUCTO CON ID, ${id}`,
            error: error.message
        });
    }
}

export const modifyProduct = async (req, res) =>{
    try {
     
       const {id, name, image, price, category} = req.body;

            let result = await productModels.updateProduct(name, image, price, category, id);
            console.log(result);
            
            result ? res.status(200).json({
                message: "Producto actualizado correctamente"
            }) : res.status(404).json({
                    message: "ERROR!, No se encontro ningun producto con el ID buscado"
            });

    } catch (error) {
        console.error("Error al actualzar producto : ", error);
        res.status(500).json({
            message: "ERROR SERVER MODIFY",
            modify: error.message
        });
    }
};