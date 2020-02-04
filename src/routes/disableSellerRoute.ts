import { Router } from "express";
import DisableSeller from "../components/controller/disableSellerController";
const router: Router = Router();

router.post("/", DisableSeller);

export default router;
