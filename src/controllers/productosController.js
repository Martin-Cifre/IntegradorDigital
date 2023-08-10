const fs = require('fs');
const path = require('path');

const juegosFilePath = path.join(__dirname, '../data/datosJuegos.json');
const datosJuegos = JSON.parse(fs.readFileSync(juegosFilePath, 'utf-8'));


// Abrir json de  juegos


const controlador = {
  edit: (req, res) => {
    let idProductoJuegos = req.params.idProductoJuegos;
    res.send(idProductoJuegos)

    let productoEdit = productosJuegos[idProductoJuegos];

    res.render("productosEditar", { productoEdit: productoEdit });
  },
  getCreateForm: (req, res) => {
    res.render("users/create")
    
  },
  postCreateForm: (req,res) => {
    const datosJuegos = JSON.parse(fs.readFileSync(juegosFilePath, "utf-8"));
    newGame = {
      id: Math.random() + 1,
      nombre: req.body.nombre,
      genero: req.body.genero,
      precio: req.body.precio,
      rating: req.body.rating,
      imagenJuego: req.file.imagenJuego,
      descripcion: req.body.descripcion
    };
    datosJuegos.push(newGame);
    const juegoJSON = JSON.stringify(datosJuegos, null, ' ');
    fs.writeFileSync(juegosFilePath, juegoJSON);
    console.log('esta todo listo')
    res.redirect('/')
  },
  productosDetalle: (req, res) => {
    const datosJuegos = JSON.parse(fs.readFileSync(juegosFilePath, "utf-8"));
    const juegoEncontrado = datosJuegos.find(juegoEncontrado => juegoEncontrado.id == req.params.id);
    if (juegoEncontrado) {
        res.render("users/details", {juegoEncontrado} );
    } else {
          /* Hay que agregar lo que mostraria si no encuentra el juego */
    }
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