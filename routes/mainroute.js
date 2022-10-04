import { Router } from "express";
import { 
    createPost,
    deletePost,
    commentUnderPost,
    getPosts,
    getSinglePost
} from "../controllers/maincontroller.js";
import { verifyToken } from "../middlewares/auth.js";

const router = Router();

router.route("/create-post").post(verifyToken, createPost);
router.route("/delete-post").post(verifyToken, deletePost);
router.route("/comment").post(verifyToken,commentUnderPost);
router.route("/posts").get(verifyToken,getPosts);
router.route("/single-post").get(verifyToken, getSinglePost);

export default router;
