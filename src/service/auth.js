import db from "../models";

export const register = () =>
  new Promise((resolve, reject) => {
    try {
      resolve("register service");
      console.log("after resolve");
      return;
    } catch (error) {
      reject(error);
    }
  });
