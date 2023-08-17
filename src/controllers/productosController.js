const fs = require('fs');
const path = require('path');
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier')

cloudinary.config({
    cloud_name: 'ddczp5dbb',
    api_key: '745942551174111',
    api_secret: 'Isu49y1h_cdXGXrPx5WgJ1SxA5w',
    debug: true
})

const juegosFilePath = path.join(__dirname, '../data/datosJuegos.json');

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
    const imageBuffer = req.file.buffer;
    const customFileName = 'random'

    const stream = cloudinary.uploader.upload_stream({ resource_type: 'image', public_id: customFileName}, (error, result) => {
    });

    streamifier.createReadStream(imageBuffer).pipe(stream);

    res.send("lesto")

    const datosJuegos = JSON.parse(fs.readFileSync(juegosFilePath, "utf-8"));
    
      newGame = {
        id: Math.random() + 1,
        nombre: req.body.nombre,
        genero: req.body.genero,
        precio: req.body.precio,
        rating: req.body.rating,
        imagenJuego: result.secure_url, 
        descripcion: req.body.descripcion
      };

    datosJuegos.push(newGame);
    const juegoJSON = JSON.stringify(datosJuegos, null, ' ');
    fs.writeFileSync(juegosFilePath, juegoJSON);

  
    res.send('Juego cargado');
  },
  productosDetalle: (req, res) => {
    const datosJuegos = JSON.parse(fs.readFileSync(juegosFilePath, "utf-8"));
    const juegoEncontrado = datosJuegos.find(juegoEncontrado => juegoEncontrado.id == req.params.id);
    if (juegoEncontrado) {
        res.render("users/details", {juegoEncontrado} );
    } else {
          res.render('not-found')
    }
  },
  search: (req, res) => {
    const buscarJuego = req.query.search.toLowerCase();
  
    const datosJuegos = JSON.parse(fs.readFileSync(juegosFilePath, "utf-8"));
    
    const resultadoJuegos = datosJuegos.filter(juego => juego.nombre.toLowerCase().includes(buscarJuego));
    
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