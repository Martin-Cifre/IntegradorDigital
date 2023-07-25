const fs = require('fs');
const path = require('path');
const ftp = require('basic-ftp');
const { Readable } = require('stream');

const juegosFilePath = path.join(__dirname, '../data/datosJuegos.json');
const games = JSON.parse(fs.readFileSync(juegosFilePath, 'utf-8'));
async function ftp_upload(image_origin_route, image_destiny_route) {
  // Connect to the FTP server
  const client = new ftp.Client();
  await client.access({
    host: 'ftp.linsock.com.ar',
    user: 'u629722589.soundstage',
    password: '12_Soundstage_34'
  });
  // Upload the file to the FTP server
  await client.uploadFrom(image_origin_route, image_destiny_route);
  // Close the FTP connection
  client.close();
}

// Abrir json de  juegos


const controlador = {
  producto: (req, res) => {
    res.render('prueba', { datosDeLosJuegos: games });
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
  guardar: async (req, res) => {
    const file = req.file;
    const stream = new Readable();
    stream.push(file.buffer);
    stream.push(null);


    await ftp_upload(stream, '/public/images/' + file.originalname);
    let nuevoId = games[games.length - 1].id;
    nuevoId++;
    let nuevoJuego = {
      id: nuevoId,
      nombre: req.body.gameName,
      precio: req.body.precio,
      imagenJuego: "https://linsock.com.ar/soundstage/public/images/" + req.file.originalname
    }
    games.push(nuevoJuego);
    fs.writeFileSync(juegosFilePath, JSON.stringify(games, null, ' '));
    res.render('altaproducto');
  }

};

module.exports = controlador;