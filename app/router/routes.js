module.exports = (app) => {
  app.get("/", (req, res) => {
    const response = {
      'status': 200,
      'message': 'Success'
    };
    return res.status(200).send(response);
  });
};
