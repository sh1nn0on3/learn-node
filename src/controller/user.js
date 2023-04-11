import { notAuth } from "../middlewares/handle_errors";
import * as service from "../service";

export const getCurrent = async (req, res) => {
  try {
    const { id } = req.user;

    const response = await service.getOne(id);

    return res.status(200).json(response);
  } catch (err) {
    return notAuth(res);
  }
};
