import { Router } from "express";
import * as controller from "./post.controller.js";

const router = Router();

// CREATE POST
router.post("/", controller.createPost);

// DELETE POST
router.delete("/:postId", controller.deletePost);

// GET POSTS DETAILS
router.get("/details", controller.postDetails);

// GET COMMENT COUNT
router.get("/comment_count", controller.commentCount);

export { router as postRouter };
export default router;
