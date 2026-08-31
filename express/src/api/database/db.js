import mysql from "mysql2/promise"; //importo el package para conectarse a la base de datos 

//importo el archivo environments.js para obtener su contenido
import environments from   "../config/environments.js"

//destructuro el contenido de environments.js en un objeto llamado database
const {database} = environments;

//creo el objeto  pool de conexiones
const connection = mysql.createPool({
    host: database.host,
    database: database.name,
    user: database.user,
    password: database.password
}); //createPool(); es un metodo que como parametro recibe un objeto y, lo que va a recibir es la informacion para conectarse a la base de datos. esa informacion la sacamos de environments.js donde environments.js importo la informacion mediante dotenv del archivo .env donde estan definidas las variables de entorno. entonces environments importa las variables de .env, luego database importa el objeto de environments.js, luego connection accede a esa informacion a traves del objeto database. 

//exporto el pool de conexion para que otros archivos lo puedan importar, usando default para que se importe la referencia al objeto(connection) que contiene el pool de conexiones. 
export default connection;