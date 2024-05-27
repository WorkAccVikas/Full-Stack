import { Router } from "express";
import { addDpt2 } from "../controllers/dept2.controller.js";

const router = Router();

router.route("/").post(addDpt2);

export default router;
