import { Router } from "express";
import DenySeller from "../components/controller/denySellerController";
const router: Router = Router();

router.post("/", DenySeller);

export default router;
