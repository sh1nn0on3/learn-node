import db from "../models";
import jwt from "jsonwebtoken";

export const register = ({ email, password }) =>
  new Promise(async (resolve, reject) => {
    try {
      // console.log(3);
      const response = await db.User.findOrCreate({
        where: { email },
        raw: true,
        defaults: {
          email,
          password,
        },
      });

      const token = response[1]
        ? jwt.sign(
            {
              id: response[0].id,
              email: response[0].email,
              role_code: response[0].role_code,
            },
            process.env.JWT_SECRET,
            { expiresIn: "5d" }
          )
        : null;
      console.log("🚀 ~ file: auth.js:18 ~ newPromise ~ token:", token);
      // console.log("🚀 ~ file: auth.js:14 ~ newPromise ~ response:", response)
      resolve({
        err: response[1] ? 0 : 1,
        mes: response[1] ? "true" : "false because had email",
        access_token: token ? `Bearer ${token}` : token,
      });

      resolve("register service");
      // console.log("after resolve");
      return;
    } catch (error) {
      reject(error);
    }
  });

export const login = ({ email, password }) =>
  new Promise(async (resolve, reject) => {
    try {
      // console.log(b);
      // console.log(3);

      const response = await db.User.findOne({
        where: { email },
        // row: true,
      });

      console.log("🚀 ~ file: auth.js:53 ~ newPromise ~ response:", response);
      const token = response
        ? jwt.sign(
            {
              id: response.id,
              email: response.email,
              role_code: response.role_code,
            },
            process.env.JWT_SECRET,
            { expiresIn: "5d" }
          )
        : null;
      // console.log("🚀 ~ file: auth.js:14 ~ newPromise ~ response:", response)
      resolve({
        err: response ? 0 : 1,
        mes: response ? "register is success" : "email false",
        access_token: token ? `Bearer ${token}` : token,
      });

      resolve("login service");
      // console.log("after resolve");
      return;
    } catch (error) {
      reject(error);
    }
  });
