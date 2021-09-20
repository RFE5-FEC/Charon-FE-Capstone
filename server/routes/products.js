const models = require("../models/index");

module.exports = (app) => {
  app.get("/current-product"),
    (req, res) => {
      const productList = require("../data/productList");
      return res.json({
        code: 200,
        msg: "ok",
        currentProduct: productList.data[0],
      });
    };
  app.get("/currentProduct"),
    (req, res) => {
      const productList = require("../data/productList");
      return res.json({
        code: 200,
        msg: "ok",
        currentProduct: productList.data[0],
      });
    };
  app.get("/products", (req, res) => {
    models.products.getAll((err, responseData) => {
      if (err) {
        console.error("Error: ", err);
        res.status(500).end();
      } else {
        res.send(responseData.data);
      }
    });
  });
  app.get("/products/:product_id", (req, res) => {
    let id = req.params.product_id;
    models.products.info(id, (err, responseData) => {
      if (err) {
        console.error("Error: ", err);
        res.status(500).end();
      } else {
        res.send(responseData.data);
      }
    });
  });
  app.get("/products/:product_id/styles", (req, res) => {
    let id = req.params.product_id;
    models.products.styles(id, (err, responseData) => {
      if (err) {
        console.error("Error: ", err);
        res.status(500).end();
      } else {
        res.send(responseData.data);
      }
    });
  });
  app.get("/products/:product_id/related", (req, res) => {
    let id = req.params.product_id;
    models.products.related(id, (err, responseData) => {
      if (err) {
        console.error("Error: ", err);
        res.status(500).end();
      } else {
        res.send(responseData.data);
      }
    });
  });
};
