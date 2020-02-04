import { Router } from "express";
import SendMessage from "../components/controller/sendMessage.Controller";
const router: Router = Router();

router.post("/", SendMessage);

export default router;
