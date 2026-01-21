import { NODE_ENV, port } from "../config/config.service.js";
import { userRouter, postRouter, commentRouter } from "./modules/index.js";
import express from "express";

import { sequelize } from "./DB/connection.db.js";
import "./DB/model/index.js";

async function bootstrap() {
  const app = express();
  app.use(express.json());

  //DB
  await sequelize.sync({ alter: false, force: false });
  console.log("connected DB ✅");

  // ROUTES
  app.get("/", (req, res) => res.send("Hello World!"));

  app.use("/user", userRouter);
  app.use("/post", postRouter);
  app.use("/comment", commentRouter);

  //  INVALID ROUTE
  app.use("{/*dummy}", (req, res) => {
    return res.status(404).json({ message: "Invalid application routing" });
  });

  //  GLOBAL ERROR HANDLER
  app.use((error, req, res, next) => {
    const status = error.cause?.status ?? 500;

    return res.status(status).json({
      error_message:
        status == 500
          ? "something went wrong"
          : (error.message ?? "something went wrong"),

      stack: NODE_ENV == "development" ? error.stack : undefined,
    });
  });

  //  SERVER
  app.listen(port, () => {
    console.log(`Server Running On Port ${port} 🚀`);
  });
}

export default bootstrap;
