import { Router } from "express";
import ChangePassword from "../components/controller/changePasswordController";
const router: Router = Router();

router.post("/", ChangePassword);

export default router;
