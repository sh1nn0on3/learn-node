import { notAuth } from "../middlewares/handle_errors";
import * as service from "../service";

export const getBook = async (req, res) => {
  try {
    const response = await service.getBooks(req.query);
    return res.status(200).json(response);
  } catch (err) {
    return notAuth(res);
  }
};
