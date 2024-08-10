const responseJsonV2 = (res, status = 404, responseV2) => {
  return res.status(status).send(responseV2);
};

module.exports = responseJsonV2;
