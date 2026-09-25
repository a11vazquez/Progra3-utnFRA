import {Router} from "express"; //importamos middleware router

import { validateCamps, validateId } from "../middlewares/middlewares.js";  // importamos middleware de validacion numerica del ID
import { createProduct, deleteProductById, getProductById, getProducts, modifyProduct } from "../controllers/product.controller.js"; //controllers, donde se hace logica de la peticion y, la respuesta.
const router = Router(); // ejecuta la instancia de la funcion Router();


//Buscar Productos
router.get("/", getProducts); //logica de la peticion y , la respuesta en controllers

//Buscar Producto por ID
router.get("/:id", validateId, getProductById);


//Crear Producto
router.post("/",createProduct);

//Eliminar Producto
router.delete("/:id", validateId, deleteProductById);

//Modificar producto
router.put("/", validateCamps, modifyProduct);

export default router;