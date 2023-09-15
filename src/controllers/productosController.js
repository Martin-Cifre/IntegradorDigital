const fs = require('fs');
const path = require('path');
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier')
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
cloudinary.config({
    cloud_name: 'ddczp5dbb',
    api_key: '745942551174111',
    api_secret: 'Isu49y1h_cdXGXrPx5WgJ1SxA5w',
    debug: true
})

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'productos', 
  allowedFormats: ['jpg', 'png'],
  filename: function (req, file, cb) {
    cb(undefined, 'productos');
  },
});

const upload = multer({ storage: storage });

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
    res.render("product/create")
    
  },
  postCreateForm: async (req, res) => {
    try {
      const oldProduct = await db.Juego.findOne({ where: { nombre: req.body.nombre } });
      
      if (!oldProduct) {
        let imageUrl = null; // Variable para almacenar la URL de la imagen en Cloudinary

        // Verifica si se cargó una imagen
        if (req.file) {
          // Carga la imagen en Cloudinary y obtén la URL
          const result = await cloudinary.uploader.upload(req.file.path, {
            resource_type: 'imageProducto',
          });
          imageUrl = result.secure_url;
        }
        
        await db.Juego.create ({
          nombre: req.body.nombre,
          genero: req.body.genero,
          precio: req.body.precio,
          rating: req.body.rating,
          imagenJuego: result.secure_url,
          descripcion: req.body.descripcion,
          fecha_alta: req.body.fecha_alta,
          fecha_baja: req.body.fecha_baja,
          descuento: req.body.descuento
      });

      return res.render('/');
    } else {
      
      return res.status(400).send('El juego ya existe');
    }
  } catch (error) {
    console.error('Error al crear un nuevo producto:', error);
    res.status(500).send('Error interno del servidor');
  }
    console.log('Juego cargado');
      
    
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

     const stream = cloudinary.uploader.upload_stream(
      { resource_type: 'image', public_id: customFileName },
      (error, result) => {
        if (error) {
          console.error('Error al cargar la imagen a Cloudinary:', error);
          return res.status(500).json({ error: 'Error al cargar la imagen' });
        }
      }
    ); 
      // La carga de la imagen fue exitosa, ahora puedes crear el nuevo juego y guardar los datos en el JSON

      let productsGames = [];

      const datosJuegos = fs.readFileSync(juegosFilePath, 'utf-8');
                    productsGames = JSON.parse(datosJuegos);
           

        idNuevo=0;

        for (let s of productsGames){
			if (idNuevo<s.id){
				idNuevo=s.id;
			}
		}

		idNuevo++;

      const newGame = {
          id: idNuevo,
          nombre: req.body.nombre,
          genero: req.body.genero,
          precio: req.body.precio,
          rating: req.body.rating,
          imagenJuego: req.file ? req.file.filename : 'vacio0.jpg',
          descripcion: req.body.descripcion,
          img1carrousel : req.file ? req.file.filename : 'vacio.jpg',
          img2carrousel : req.file ? req.file.filename2 : 'vacio2.jpg',
          img3carrousel : req.file ? req.file.filename3 : 'vacio3.jpg',
      };

      productsGames.push(newGame);

      fs.writeFileSync(juegosFilePath, JSON.stringify(productsGames,null,' '));

      console.log('Juego cargado');
      res.status(200).json({ message: 'Juego cargado correctamente' });

    }
};

module.exports = controlador;