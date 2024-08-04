const responseJson = require("../utils/response");
const CheckController = require("../controllers/checkController");
const PrinterController = require("../controllers/printer");

const apiRoutes = (app) => {
  /**
   * @swagger
   * /api/check:
   *   get:
   *     summary: Check Database Connection.
   *     description: To check the database connection is established.
   *     tags:
   *       - Check
   *     responses:
   *       200:
   *         description: Success
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: Connection has been established successfully.
   *                 data:
   *                   type: object
   *                   nullable: true
   *                   example: null
   *       500:
   *         description: Unable to connect to the database.
   */
  app.get("/api/check", (req, res) => {
    CheckController.db(req, res);
  });

  /**
   * @swagger
   * /api/printers:
   *   get:
   *     summary: Get List Printers
   *     description: To get a list of all printer devices
   *     tags:
   *       - Printers
   *     responses:
   *       200:
   *         description: Success
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: Success
   *                 data:
   *                   type: array
   *                   items:
   *                     type: object
   *                     properties:
   *                       id:
   *                         type: integer
   *                         example: 1
   *                       name:
   *                         type: string
   *                         example: Printer Kasir
   *       400:
   *         description: Failed Invalid message
   */
  app.get("/api/printers", (req, res) => {
    PrinterController.findAll(req, res);
  });

  /**
   * @swagger
   * /api/printers/{id}:
   *   get:
   *     summary: Get Info Printer
   *     description: To get a list of one printer device based on id
   *     tags:
   *       - Printers
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         schema:
   *           type: integer
   *         description: The printer ID
   *     responses:
   *       200:
   *         description: Success
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: Success
   *                 data:
   *                   type: object
   *                   properties:
   *                     id:
   *                       type: integer
   *                       example: 1
   *                     name:
   *                       type: string
   *                       example: Printer Kasir
   *       400:
   *         description: Failed Invalid message
   *       404:
   *         description: Failed Printer not found
   */
  app.get("/api/printers/:id", (req, res) => {
    PrinterController.findOne(req, res);
  });

  /**
   * @swagger
   * /api/printers:
   *   post:
   *     summary: Add Printer
   *     description: Create a new printer device.
   *     tags:
   *       - Printers
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               name:
   *                 type: string
   *                 description: The name of the printer.
   *                 example: Printer Kasir
   *             required:
   *               - name
   *     responses:
   *       200:
   *         description: Successfully created printer.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: Success
   *                 data:
   *                   type: object
   *                   properties:
   *                     id:
   *                       type: integer
   *                       example: 1
   *                     name:
   *                       type: string
   *                       example: Printer Kasir
   *       400:
   *         description: Failed Invalid message
   */
  app.post("/api/printers", (req, res) => {
    PrinterController.create(req, res);
  });

  /**
   * @swagger
   * /api/printers/{id}:
   *   put:
   *     summary: Update Printer
   *     description: Update an existing printer device
   *     tags:
   *       - Printers
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         schema:
   *           type: integer
   *         description: The printer ID
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               name:
   *                 type: string
   *                 description: The name of the printer
   *                 example: Printer Kasir
   *             required:
   *               - name
   *     responses:
   *       200:
   *         description: Successfully updated printer
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: Success
   *                 data:
   *                   type: object
   *                   nullable: true
   *                   example: null
   *       400:
   *         description: Failed Invalid message
   *       404:
   *         description: Failed Printer not found
   */
  app.put("/api/printers/:id", (req, res) => {
    PrinterController.update(req, res);
  });

  app.all("*", (req, res) => {
    return responseJson(
      res,
      404,
      "Not found. Please read API Docs @ /api/docs"
    );
  });
};

module.exports = apiRoutes;
