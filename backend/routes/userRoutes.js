import { Router } from "express";
import {
  userSignup,
  userSignin,
  updateProfile,
  findUser,
} from "../controllers/userController.js";
import authMiddleware from "../middleware/authmiddleware.js";
const userRouter = Router();

userRouter.post("/signup", userSignup);
userRouter.post("/signin", userSignin);
userRouter.patch("/updateprofile", authMiddleware, updateProfile);
userRouter.get("/bulk", authMiddleware, findUser);

export default userRouter;
