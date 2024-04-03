import express from "express";
import { getUserData, signInWithGoogle, signOut } from "../controllers/user.js";

const router = express.Router();

//SIGN IN WITH GOOGLE
router.post("/login", signInWithGoogle);

//GETTING USER DATA
router.get("/user", getUserData);

//SIGN OUT
router.get("/logout", signOut);

export default router;
