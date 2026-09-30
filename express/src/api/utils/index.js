
//Logica para trabajar con los archivos y, rutas del proyecto.
import { fileURLToPath } from "url" //convierte url en archivo file
import { dirname, join } from "path" // dirname devuelve del directorio una ruta, y join unifica rutas.

//convierte la url del file actual en una ruta
const _filename =  fileURLToPath(import.meta.url); // file : ./src/utils/index.js -> ./src/utils/index.js

//devuelve la ruta del archivo actual, solo el directorio  -> ./src/utils/index.js
const _dirname = join(dirname(_filename), "../../../");

export {
    _dirname,
    join
}
