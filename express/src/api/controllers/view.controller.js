import productModels from "../models/product.models"; //importo los modelos de sentencia SQL 

//primera vista, ver todos los productos
export const viewProduct = async (req, res) =>{
        try {
            const [rows] = await productModels.selectAllProducts(); //uso el modelo de sentencia sql 
            res.render("index", {
                    title: "Dashboard",
                    about: "Lista de Productos",
                    products: rows 
            });
        } catch (error) {
            console.log(error)
        }  
}

