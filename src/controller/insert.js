import { notAuth } from "../middlewares/handle_errors";
import * as service from "../service";

export const insertData = async (req, res) => {
  try {
    const response = await service.insertData();
    return res.status(200).json(response);
  } catch (err) {
    return notAuth(res);
  }
};
