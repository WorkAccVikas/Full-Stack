import { Router } from "express";
import { addEmp2, getEmp2Details } from "../controllers/emp2.controller.js";

const router = Router();

router.route("/").post(addEmp2);
router.route("/:id").get(getEmp2Details);

export default router;
