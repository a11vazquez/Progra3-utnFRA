//Index.js sirve para centralizar las importaciones de las rutas, luego en app se importan todas desde este mismo index, sin tener que hacer un importa por cada archivo de routes distinto que tengamos.
//Ej: import {productRoutes, orderRoutes} from "./index.js"

import productRoutes from "./product.routes.js";
import viewsRoutes from "./views.routes.js";
import userRoutes from "./user.routes.js";

export {
    productRoutes, //exporta todas las rutas de productos 
    viewsRoutes,
    userRoutes
}