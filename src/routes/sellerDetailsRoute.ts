import { Router } from "express";
import SellerDetail from "../components/controller/sellerDetailsController";
const router: Router = Router();

router.post("/", SellerDetail);

export default router;
