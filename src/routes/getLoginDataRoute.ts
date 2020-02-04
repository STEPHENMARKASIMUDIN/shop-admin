import { Router } from "express";
import GetLoginData from "../components/controller/getUserController";
const router: Router = Router();

router.post("/", GetLoginData);

export default router;
