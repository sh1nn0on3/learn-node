import db from "../models";

import { Op } from "sequelize";

// READ
export const getBooks = ({ page, limit, name, order, available, ...query }) =>
  new Promise(async (res, rej) => {
    try {
      const queries = { raw: true, nest: true };
      const offset = !page || +page <= 1 ? 0 : +page - 1;
      const fLimit = +limit || +process.env.LIMIT_BOOK;
      queries.offset = offset * fLimit;
      queries.limit = fLimit;
      if (order) queries.order = [order];
      if (name) query.title = { [Op.substring]: name };
      const response = await db.Book.findAndCountAll({
        where: query,
        ...queries,
      });
      res({
        err: response ? 0 : 1,
        mes: response ? "GOT!!!" : "Cannot found books",
        book: response,
      });
    } catch (error) {
      rej(error);
    }
  });

// CREATE
