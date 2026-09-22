
//importa el modulo dotenv en una variable
import dotenv from "dotenv"

dotenv.config() // cargamos las variables del archivo .env

//exporta la informacion del .env modo default cuando se lo consulta
export default {

	port: process.env.PORT || 3500,
	database: {
	 host: process.env.DB_HOST,
	 name: process.env.DB_NAME,
	 user: process.env.DB_USER,
	 password: process.env.DB_PASSWORD
	}
}