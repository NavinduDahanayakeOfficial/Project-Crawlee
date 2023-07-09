import express from "express";
import { forgotPassword, login, loginStatus, logoutUser, resetPassword, signup } from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", logoutUser);
router.post("/forgotPassword", forgotPassword);
router.patch("/resetPassword/:resetToken", resetPassword);
router.get("/loginStatus", loginStatus);

export default router;