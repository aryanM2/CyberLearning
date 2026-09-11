/**
 * Standardized Success Response
 */
export const successResponse = (res, statusCode = 200, message = 'Success', data = null, meta = null) => {
  const response = {
    success: true,
    message,
    ...(data !== null && { data }),
    ...(meta !== null && { meta }),
  };
  return res.status(statusCode).json(response);
};

/**
 * Standardized Error Response
 */
export const errorResponse = (res, statusCode = 500, message = 'Internal Server Error', errors = null) => {
  const response = {
    success: false,
    message,
    ...(errors !== null && { errors }),
  };
  return res.status(statusCode).json(response);
};
