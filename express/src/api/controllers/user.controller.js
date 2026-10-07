/*=================
    CONTROLADORES USUARIO
================ */

import userModels from "../models/user.models.js";
import bcrypt from "bcrypt"

export const inserUser = async (req, res) =>{
    try {
        const {name, email, password} = req.body;
        if(!name || !email || !password){
           return  res.status(400).json({
                message: "Datos incompletos, NOT FOUND",
            });
        }
        //bcrypt 
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

        // antes de hashear
        // const [rows] = await userModels.insertUser(name, email, password);
        
        //con hash
         const [rows] = await userModels.insertUser(name, email, hashedPassword);

        if(rows){
            res.status(201).json({
                message: "usuario creado con exito",
                userID: rows.insertId
            });
        }else{
            res.status(404).json({
                message: "ERROR AL CREAR USUARIO"
            });
        }
        

    } catch (error) {
        console.log("ERROR INTERNO DEL SV", error)
        res.status(500).json({
            message: "error interno del sv",
            error: error.message
        });
    }
};

