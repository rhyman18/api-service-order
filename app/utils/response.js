const responseJson = (res, status = 404, message = null, data = null) => {
  return res.status(status).send({
    message,
    data,
  });
};

module.exports = responseJson;
