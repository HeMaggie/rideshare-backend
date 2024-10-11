// import camelcaseKeys from "camelcase-keys";
var responseHelper = {
  //success, sends data
  ok: (res, data) => {
    const statusCode = 200;
    // data = camelcaseKeys(data, { deep: true });
    data = data;
    sendResponse(res, statusCode, data);
  },
  //Send data without camel casing keys
  send: (res, data) => {
    const statusCode = 200;
    sendResponse(res, statusCode, data);
  },
  //server failure
  failure: (res, message) => {
    const statusCode = 500;
    sendResponse(res, statusCode, { message });
  },
  //failure due to user error
  userError: (res, message) => {
    const statusCode = 400;
    sendResponse(res, statusCode, { message });
  },
};

// Private functions
function sendResponse(res, statusCode, data) {
  res.status(statusCode);
  res.json(data);
}

module.exports = responseHelper;
