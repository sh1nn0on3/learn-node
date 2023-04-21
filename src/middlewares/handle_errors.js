import createError from "http-errors";

export const badRequest = (err, res) => {
  const error = createError.BadRequest(err);
  return res.status(400).json({
    err:2,
    mes: error.message,
  });
};

export const interalServerError = (res) => {
  const error = createError.InternalServerError();
  return res.status(500).json({
    err: 1,
    mes: error.message,
  });
};

export const notFound = (req, res) => {
  const error = createError.NotFound(`this is route is not defined ...`);
  return res.status(404).json({
    err: 2,
    mes: error.message,
  });
};

export const notAuth = (err, res) => {
  const error = createError.Unauthorized(err);
  return res.status(401).json({
    err: 1,
    mes: error.message,
  });
};
