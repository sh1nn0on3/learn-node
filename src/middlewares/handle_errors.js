import createError from "http-errors";

export const interalServerError = (res) => {
  const error = createError.InternalServerError();
  return res.status(error.status).json({
    err: 1,
    mes: error.message,
  });
};

export const notFound = (req ,res) => {
    const error = createError.NotFound(`this is route is not defined ...`);
    return res.status(error.status).json({
      err: 2,
      mes: error.message,
    });
  };