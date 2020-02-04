/**
 *
 * @param xcode number
 *
 * 200 - Success
 * 500 - Internal Server Error
 * 400 - No Data Found
 * 401 - Unauthorized
 * 409 - Request Timeout
 * 503 - Service unavailable
 * 0 - Unable to process request. The system encountered some technical problem. Sorry for the inconvenience.
 * 1 - Incorrect Username or Password
 * 2 - Seller successfully DENIED
 * 3 - Seller successfully DISABLED
 * 4 - Seller successfully ENABLED
 * 5 - Message sent
 * 6 - Password successfully changed
 * 7 - Connection timeout
 * 8 - Incomplete Parameters Provided
 */

const ResMsg = (xcode: number): string => {
  const response = {
    200: "SUCCESS",
    500: "Internal Server Error",
    400: "No Data Found",
    401: "Unauthorized",
    409: "Request Timeout",
    503: "Service Unavailable",
    0: "Unable to process request. The system encountered some technical problem. Sorry for the inconvenience.",
    1: "Incorrect Username or Password. Please try again later.",
    2: "Seller successfully DENIED",
    3: "Seller successfully DISABLED",
    4: "Seller successfully ENABLED",
    5: "Message successfully sent",
    6: "Password successfully changed",
    7: "Unable to process request. Connection timeout occured. Please try again later.",
    8: "Incomplete Parameters Provided"
  };

  return response[xcode] ? response[xcode] : response[200];
};

export default ResMsg;
