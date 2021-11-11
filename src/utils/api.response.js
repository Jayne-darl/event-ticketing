// Response object is not globally available so, the need to get if from each request handler

export const request_response = ({
  response,
  status_code = 500,
  message = "Internal Server Error. Please try again or contact Support",
  data,
}) =>
  response.status(status_code).json({
    message,
    ...(data && { data }),
  });
