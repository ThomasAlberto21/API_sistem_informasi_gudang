import { ResponseError } from '../error/responseError.js';

const errorMiddleware = (err, req, res, next) => {
  if (!err) {
    next();
  }

  if (err instanceof ResponseError) {
    res.status(err.status).json({
      status: 'Error',
      message: err.message,
    }).end();
  } else {
    res.status(500).json({
      status: 'Error',
      message: 'Internal server error',
    }).end();
  }
};

export { errorMiddleware };