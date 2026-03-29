import { Router } from "express";
import * as controller from "./note.controller.js";
import { auth } from "../../DB/middlewares/auth.middlewares.js";

const router = Router();

//1
router.post("/", auth, controller.create);
//2
router.patch("/update/:noteId", auth, controller.update);
//3
router.put("/replace/:noteId", auth, controller.replace);
//4
router.patch("/all", auth, controller.updateAll);
//5
router.delete("/:noteId", auth, controller.remove);
//6
router.get("/paginate-sort", auth, controller.paginate);
//7
router.get("/by-id/:noteId", auth, controller.getById);
//8
router.get("/note-by-content", auth, controller.getByContent);
//9
router.get("/note-with-user", auth, controller.withUser);
//10
router.get("/aggregate", auth, controller.aggregate);
//11
router.delete("/", auth, controller.deleteAll);

export { router as noteRouter };
