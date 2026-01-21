import { Router } from "express";
import * as controller from "./comment.controller.js";

const router = Router();

// CREATE COMMENT
router.post("/", controller.bulkCreate);

// DELETE COMMENT   
router.patch("/:commentId", controller.updateComment);

// FIND OR CREATE COMMENT
router.post("/F_or_C", controller.findOrCreate);

// SEARCH COMMENTS
router.get("/search", controller.search);

// NEWEST COMMENT
router.get("/newest/:postId", controller.newest);

// COMMENT DETAILS
router.get("/details/:id", controller.details);

export { router as commentRouter };
export default router;
