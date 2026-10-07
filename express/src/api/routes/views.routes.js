import { viewProducts } from "../controllers/view.controller.js";
import { Router } from "express";
import { sessionValidate } from "../middlewares/middlewares.js";
const router = Router();


router.get("/panel",sessionValidate, viewProducts);

router.get("/search",  async (req, res) =>{
        if(!req.session.user){
       return res.redirect("/login");
    }
        res.render("search", {
                title: "Search By Id"
        });
});

router.get("/create",sessionValidate,  async (req, res) =>{
        res.render("create", {
                title: "Crear Producto",
                about: "Producto",
        });
});

router.get("/modify",sessionValidate,  async (req, res) =>{
        res.render("modify", {
                title: "Modificar Producto"
        });
});

router.get("/delete",sessionValidate,  async (req, res) =>{
        res.render("delete", {
                title: "Eliminar Producto"
        });
});

router.get("/login", async(req, res) =>{
        res.render("login",{
                title: "login dashboard"
        });
});

export default router;