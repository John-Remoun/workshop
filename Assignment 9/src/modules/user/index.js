import { Router } from "express";
import * as userRouter from "./user.controller.js";
import { auth } from "../../DB/middlewares/auth.middlewares.js";

const router = Router();

//1
router.post("/signup", userRouter.signup);
//2
router.post("/login", userRouter.login);
//3
router.patch("/", auth, userRouter.updateUser);
//4
router.delete("/", auth, userRouter.deleteUser);
//5
router.get("/", auth, userRouter.getUser);

export { router as userRouter };
