import {Router} from "express";
import { inserUser } from "../controllers/user.controller.js";
const router = Router();

router.post("/", inserUser);

export default router;