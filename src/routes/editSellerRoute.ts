import { Router } from "express";
import EditSeller from "../components/controller/editSellerController";
const router: Router = Router();

router.post("/", EditSeller);

export default router;
