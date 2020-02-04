import { Router } from "express";
import DisplaySeller from "../components/controller/displaySellerController";
const router: Router = Router();

router.get("/", DisplaySeller);

export default router;
