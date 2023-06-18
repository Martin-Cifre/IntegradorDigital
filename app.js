const express = require("express");
const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname, "/public")));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html"); // Permite enviar un archivo HTML
});

app.get("/login.html", (req, res) => {
  res.sendFile(__dirname + "/views/login.html"); 
});

app.get("/signin.html", (req, res) => {
  res.sendFile(__dirname + "/views/signin.html");
});

app.get("/carrito.html", (req, res) => {
  res.sendFile(__dirname + "/views/carrito.html");
});


app.get("/hogwarts-legacy.html", (req, res) => {
  res.sendFile(__dirname + "/views/hogwarts-legacy.html");
});




app.listen(3000, function () {
  console.log("Servidor corriendo");
});
