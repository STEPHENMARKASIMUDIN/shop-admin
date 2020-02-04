import { Router } from "express";
import DisplayProduct from "../components/controller/displayProductController";
const router: Router = Router();

router.get("/", DisplayProduct);

export default router;
