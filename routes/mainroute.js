import { Router } from "express";
import { 
    createPost,
    deletePost,
    commentUnderPost,
    getPosts,
    getSinglePost,
    joinEmailList,
    emailList,
    allUsers
} from "../controllers/maincontroller.js";
import { verifyToken } from "../middlewares/auth.js";

const router = Router();

router.route("/create-post").post(verifyToken, createPost);
router.route("/delete-post").post(verifyToken, deletePost);
router.route("/comment").post(verifyToken,commentUnderPost);
router.route("/posts").get(verifyToken,getPosts);
router.route("/single-post").get(verifyToken, getSinglePost);
router.route("/join-email-list").post(verifyToken, joinEmailList);
router.route("/email-list").get(verifyToken, emailList);
router.route("/users").get(verifyToken, allUsers);

export default router;

