import { Router } from "express";
import { addEmp, getEmpDetails } from "../controllers/emp.controller.js";

const router = Router();

router.route("/").post(addEmp);
router.route("/:id").get(getEmpDetails);

export default router;
