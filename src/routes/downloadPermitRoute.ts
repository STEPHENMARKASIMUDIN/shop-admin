import { Router } from "express";
import DownloadPermit from "../components/controller/downloadPermitController";
const router: Router = Router();

router.get("/", DownloadPermit);

export default router;
