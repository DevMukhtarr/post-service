import { Router } from "express";
import { signUp, signIn} from "../controllers/authcontroller.js";
import { verifyToken } from "../middlewares/auth.js";

const router = Router();

router.route("/sign-up").post(signUp);
router.route("/sign-in").post(signIn);

export default router;

