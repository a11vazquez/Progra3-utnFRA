const validateId = (req, res, next) =>{
    let {id} = req.params;
      //validacion de parametros, id valida.
        if(!id || isNaN(Number(id))){
            return res.status(400).json({
                error: "ERROR, INFORMACION REQUERIDA NO PROPORCIONADA"
            });
        }
    next(); //permite que se siga ejecutando la app luego de usar el middelware.
};

const validateCamps = (req, res, next) =>{
       const {id, name, image, price, category} = req.body;
    
            //validacion campos requeridos.
            if(!id || !name || !image || !price || !category){
               return res.status(400).json({
                    message: "campos no requeridos, no pueden ser null"
                });
            }
                next();
}
export {
    validateId,
     validateCamps
}