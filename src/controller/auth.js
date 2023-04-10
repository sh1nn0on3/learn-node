import * as service from "../service";


export const register = async (req, res) => {
  try {
    const { email, password } = req.body;
    // console.log({ email, password });
    if (!email || !password)
      return req.status(400).json({
        err: 2,
        mes: "Iternal Server Error",
      });
    const response = await service.register(req.body);
    return res.status(200).json(response);
  } catch (err) {
    return res.status(500).json({
      err: -1,
      mes: "Iternal Server Error",
    });
  }
};


export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // console.log({ email, password });
    if (!email || !password)
      return req.status(400).json({
        err: 2,
        mes: "Iternal Server Error",
      });
    const response = await service.login(req.body);
    return res.status(200).json(response);
  } catch (err) {
    return res.status(500).json({
      err: -1,
      mes: "Iternal Server Error",
    });
  }
};
