const path = require("path");
const indexController = {
  index: (req, res) => {
    res.render(path.join(__dirname, "../views/index.ejs"));
  },
  hogwartsLegacy: (req, res) => {
    res.render(path.join(__dirname, "../views/hogwarts-legacy.ejs"));
  },
  carrito: (req, res) => {
    res.render(path.join(__dirname, "../views/carrito.ejs"));
  }
};

module.exports = indexController;