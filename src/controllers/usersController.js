const path = require("path");
const indexController = {
  index: (req, res) => {
    res.render(path.join(__dirname, "../views/login.ejs"));
  },
  login: (req, res) => {
    res.render(path.join(__dirname, "../views/login.ejs"));
  },
  signIn: (req, res) => {
    res.render(path.join(__dirname, "../views/signIn.ejs"));
  }
};

module.exports = indexController;