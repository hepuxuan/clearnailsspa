const express = require("express");
const router = express.Router();
const routes = require("../../common/routes");

/* GET home page. */

for (let route of routes) {
  router.get(route.path, async (req, res, next) => {
    res.render("index", {
      title: "Clear Nails Spa",
      serverData: JSON.stringify({})
    });
  });
}

module.exports = router;
