import { Model, DataTypes } from "sequelize";
import { sequelize } from "../connection.db.js";


class Post extends Model {}

Post.init({

  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },

  title: DataTypes.STRING,
  content: DataTypes.TEXT,
  userId: DataTypes.INTEGER

}, {
  sequelize,
  modelName: "Post",
  paranoid: true
});


export default Post;
