import { viewProducts } from "../controllers/view.controller.js";
import { Router } from "express";
const router = Router();


router.get("/", viewProducts);

router.get("/search", async (req, res) =>{
        res.render("search", {
                title: "Search By Id"
        });
});

router.get("/create", async (req, res) =>{
        res.render("create", {
                title: "Crear Producto",
                about: "Producto",
        });
});

router.get("/modify", async (req, res) =>{
        res.render("modify", {
                title: "Modificar Producto"
        });
});

router.get("/delete", async (req, res) =>{
        res.render("delete", {
                title: "Eliminar Producto"
        });
});

router.get("/login", async(req, res) =>{
        res.render("login",{
                title: "login dashboard"
        }
        );
});

export default router