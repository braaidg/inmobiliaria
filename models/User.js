import Datatypes from "sequelize";
import bcrypt from "bcrypt";
import db from "../config/db.js";

const User = db.define(
  "user",
  {
    name: {
      type: Datatypes.STRING,
      allowNull: false,
    },
    email: {
      type: Datatypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: Datatypes.STRING,
      allowNull: false,
    },
    confirmed: {
      type: Datatypes.BOOLEAN,
      defaultValue: false,
    },
    token: Datatypes.STRING,
  },
  {
    hooks: {
      beforeCreate: async function (user) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      },
    },
  }
);

export default User;
