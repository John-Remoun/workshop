import { Router } from "express";
import * as controller from "./books.service.js";
const router=Router()

// 1 Create Collections
router.post("/collection/books", controller.createBooksCollection);
// 2 Create Authors
router.post("/collection/authors", controller.createAuthors);
// 3 Create Capped Logs
router.post("/collection/logs", controller.createCappedLogs);
// 4 Create Book Index
router.post("/collection/index", controller.createBookIndex);

// 5 Insert One Book
router.post("/", controller.insertOneBook);
// 6 Insert Many Books
router.post("/batch", controller.insertManyBooks);

// 7 Insert Log
router.post("/log", controller.insertLog);

// 8 Update Book Year
router.patch("/:title", controller.updateBookYear);

// 9 Find By Title
router.get("/title/:title", controller.findByTitle);
// 10 Find Between Years
router.get("/year-range", controller.findBetweenYears);
// 11 Find By Genre
router.get("/genre/:genre", controller.findByGenre);
// 12 Skip Limit
router.get("/skip-limit", controller.skipLimit);
// 13 Year Integer
router.get("/year-integer", controller.yearInteger);
// 14 Exclude Genres
router.get("/exclude-genres", controller.excludeGenres);


// 15 Delete Before Year
router.delete("/delete-before", controller.deleteBeforeYear);

// 16 Aggregate >2000 and sort
router.get("/aggregate1", controller.aggregate1);
// 17 Aggregate >2000 and show title, author, year
router.get("/aggregate2", controller.aggregate2);
// 18 Aggregate Unwind Genres
router.get("/aggregate3", controller.aggregate3);
// 19 Aggregate Lookup Logs
router.get("/aggregate4", controller.aggregate4);

export default router;