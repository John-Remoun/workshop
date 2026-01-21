import { DataTypes } from "sequelize";
import { sequelize } from "../connection.db.js";


const User = sequelize.define("User", {

  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },

  name: DataTypes.STRING,

  email: {
    type: DataTypes.STRING,
    unique: true,
    validate: {
      isEmail: true
    }
  },

  password: DataTypes.STRING,

  role: {
    type: DataTypes.ENUM("user", "admin"),
    defaultValue: "user"
  }

});



export default User;
