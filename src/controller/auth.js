import * as service from "../service";

export const register = async (req, res) => {
  try {
    const response = await service.register();
    return res.status(200).json(response)

  } catch (err) {
    return res.status(500).json({
      err: -1,
      mes: "Iternal Server Error",
    });
  }
};
