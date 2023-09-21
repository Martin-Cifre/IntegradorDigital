const fs = require('fs');
const path = require('path');
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier')
const multer = require('multer');
const db = require ('../database/models')
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
  edit: async (req, res) => {
    try {
      const idProductoJuegos = req.params.idProductoJuegos;
      const productoEdit = await db.Juego.findByPk(idProductoJuegos);

      if (!productoEdit) {
        return res.status(404).render('not-found'); // Manejo de producto no encontrado
      }

      res.render("product/productosEditar", { productoEdit: productoEdit });
    } catch (error) {
      console.error(error);
      res.status(500).send('Error interno del servidor'); // Manejo de errores
    }
  },
  update: async (req, res) => {
    try {
      const productoEdit = await db.Juego.findByPk(req.params.idProductoJuegos);

      if (!productoEdit) {
        return res.status(404).send('Producto no encontrado'); // Manejo de producto no encontrado
      }

      // Actualizar los campos del producto con los datos del formulario
      productoEdit.nombre = req.body.nombre;
      productoEdit.genero = req.body.genero;
      productoEdit.precio = req.body.precio;
      productoEdit.rating = req.body.rating;
      productoEdit.descripcion = req.body.descripcion;
      productoEdit.fecha_alta = req.body.fecha_alta;
      productoEdit.fecha_baja = req.body.fecha_baja;
      productoEdit.descuento = req.body.descuento;

      // Guardar los cambios en la base de datos
      await productoEdit.save();

      res.redirect('product/details' + idProductoJuegos);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error interno del servidor'); // Manejo de errores
    }
  },
  getCreateForm: (req, res) => {
    res.render("product/create")
    
  },
  postCreateForm: async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).send('Debe proporcionar una imagen');
      }
  
      // Crear el juego en la base de datos
      const juego = await db.Juego.create({
        nombre: req.body.nombre,
        precio: req.body.precio,
        rating: req.body.rating,
        descripcion: req.body.descripcion,
        fecha_alta: req.body.fecha_alta,
        fecha_baja: req.body.fecha_baja,
        descuento: req.body.descuento,
      });
  
      // Crear y asociar imágenes al juego
      const imagen = await db.Imagen.create({
        url_imagen: result.secure_url, // Reemplaza con la URL real de la imagen
        juego_id: juego.id, // Asociar la imagen con el juego recién creado
      });

      const categorias = await db.Categoria.findAll();
  
      return res.render('product/create', { categorias: categorias });
    } catch (error) {
      console.error('Error al crear un nuevo producto:', error);
      return res.status(500).send('Error interno del servidor');
    }
  },
  productosDetalle: async (req, res) => {
    try {
      // obtengo el juego 
      const juegoEncontrado = await db.Juego.findByPk(req.params.id, {
        include: [{ model: db.Imagen, as: 'imagenes' }], // Para incluir las imagenes
      });

      // Renderiza la vista 'detalle' con el juego y las imagenes 
      res.render('product/details', { juegoEncontrado});
    } catch (error) {
      console.error('Error al obtener el juego desde la base de datos:', error);
      res.status(500).json({ error: 'Hubo un error al obtener el juego desde la base de datos.' });
    }
  },
  search: (req, res) => {
    const buscarJuego = req.query.search.toLowerCase();
  
    const datosJuegos = JSON.parse(fs.readFileSync(juegosFilePath, "utf-8"));
    
    const resultadoJuegos = datosJuegos.filter(juego => juego.nombre.toLowerCase().includes(buscarJuego));
    
    res.render('resultadoJuego', { resultadoJuegos: resultadoJuegos });
  }
};

module.exports = controlador;