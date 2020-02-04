import { Router } from "express";
import Login from "../components/controller/loginController";

const router: Router = Router();

router.post("/", Login);

export default router;
