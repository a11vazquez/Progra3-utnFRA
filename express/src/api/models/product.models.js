import connection from "../database/db.js";

const selectAllProducts =  async () =>{
    const sqlSentence = 'SELECT * FROM products';
    return  connection.query(sqlSentence); // enviamos la sentencia a BDD, mediante la conexion importada de database
        //trae rows,fields y, metadatos. con [rows] destructuring y, solo trae las filas de la consulta(cada objeto producto, retorna un array de objetos).    
}

const selectProductWhereId = async (id) =>{
     const sentenceSql = `SELECT * from products WHERE id = ?`;
    const [rows] = await connection.query(sentenceSql,[id]);
    console.log("rows desde models [0] y rows normal : ", rows[0], rows);
    return  rows[0] || null; //si rows[0] no hay objeto, retorna undefined, undefined es falsy y, entra al null con el  operador ||
}

const insertProduct = async (name, image, price, category) => {
    const query = "INSERT INTO products (name, img, price, category) VALUES (?, ?, ?, ?)"
    const [result] = await connection.query(query, [name, image, price, category]);

    return result.insertId || null;
};

const updateProduct = async (name, image, price, category, id) =>{
     const sql = "UPDATE products set name = ?, img = ?, price = ?, category = ? WHERE id = ?";
    const [result] = await connection.query(sql,[name, image, price, category, id]);
    return result.affectedRows || null;
};

const deleteProduct = async (id) => {
        let sql = "DELETE FROM products WHERE id = ?"
        //let sql = "UPDATE FROM products  set active = 0 WHERE id = ?"
        let [result] = await connection.query(sql, [id]);
        return result.affectedRows || null;
};

export default {
    selectAllProducts,
    selectProductWhereId,
    insertProduct,
    updateProduct,
    deleteProduct
}