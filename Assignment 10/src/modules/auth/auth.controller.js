import { Router } from "express";
import { login, signup } from "./auth.service.js";
import {
  SuccessResponse,
  globalErrorHandling,
} from "../../common/utils/response/index.js";

const router = Router();

router.post("/signup", async (req, res) => {
  try {
    const result = await signup(req.body);

    return res.status(201).json({
      message: "User created successfully",
      data: result,
      otp: result.otp
    });
  } catch (error) {
    return res.status(error.cause?.status || 500).json({
      message: error.message,
      extra: error.cause?.extra,
    });

  }
});

router.post("/login", async (req, res) => {
  try {
    const result = await login(req.body);

    return res.status(200).json({
      message: "User logged in successfully",
      data: result,
    });
  } catch (error) {
    return res.status(error.cause?.status || 500).json({
      message: error.message,
      extra: error.cause?.extra,
    });
  }
});

export default router;
