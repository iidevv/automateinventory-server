import { Router } from "express";
import { signIn, signUp } from "../controllers/authController";
import { authenticateJWT } from "../config/passport";

const router = Router();

router.post("/login", async (req, res) => {
  try {
    await signIn(req, res);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error", error: err });
  }
});

router.post("/sign-up", async (req, res) => {
  try {
    await signUp(req, res);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error", error: err });
  }
});

// Protected route that requires authentication
router.get("/protected", authenticateJWT, (req, res) => {
  res.json({ message: "This is a protected route", user: req.user });
});

export default router;
