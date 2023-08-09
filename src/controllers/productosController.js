const fs = require('fs');
const path = require('path');

const juegosFilePath = path.join(__dirname, '../data/datosJuegos.json');
const game = JSON.parse(fs.readFileSync(juegosFilePath, 'utf-8'));


// Abrir json de  juegos


const controlador = {
  producto: (req, res) => {
    res.render('prueba', { datosDeLosJuegos: game });
  },

  edit: (req, res) => {
    let idProductoJuegos = req.params.idProductoJuegos;
    res.send(idProductoJuegos)

    let productoEdit = productosJuegos[idProductoJuegos];

    res.render("productosEditar", { productoEdit: productoEdit });
  },
  productosDetalle: (req, res) => {
    res.render("users/productosDetalle");
  },
  productosDetalle: (req, res) => {
    res.render("users/productosDetalle");
  },
  search: (req, res) => {
    let buscarJuego = req.query.search;
    res.send(buscarJuego);

    let resultadoJuegos = [];

    for (let i = 0; i > resultadoJuegos.length; i++) {
      if (ProductosJuegos[i].name.include(buscarJuego)) {
        resultadoJuegos.push(ProductosJuegos[i]);
      }
    }

    res.render('resultadoJuego', { resultadoJuegos: resultadoJuegos });
  },
  alta: (req, res) => {
    res.render('altaproducto');

  },
  guardar: (req, res) => {
    console.log(req.body);
    res.render('altaproducto');
  }

};

module.exports = controlador;