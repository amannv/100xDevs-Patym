import { Router } from "express";
import { checkBalance, transferMoney } from "../controllers/accountController.js";
import authMiddleware from "../middleware/authmiddleware.js";
const accountRouter = Router();

accountRouter.get("/balance", authMiddleware, checkBalance);
accountRouter.post("/transfer", authMiddleware, transferMoney);

export default accountRouter;