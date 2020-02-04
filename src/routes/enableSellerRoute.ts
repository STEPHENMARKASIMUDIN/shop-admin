import { Router } from "express";
import EnableSeller from "../components/controller/enableSellerController";
const router: Router = Router();

router.post("/", EnableSeller);

export default router;
