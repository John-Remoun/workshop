import { Router } from "express";
import * as controller from "./user.controller.js";

const router = Router();

// 1- Signup
router.post("/signup", controller.signup);

// 2- Create or update 
router.put("/:id", controller.updateUser);

// 3- Find by email
router.get("/by-email", controller.getByEmail);

// 4- Get by id without role
router.get("/:id", controller.getById);

export { router as userRouter };
export default router;
