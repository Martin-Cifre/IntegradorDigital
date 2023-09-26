const fs = require('fs');
const path = require('path');
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier')
const multer = require('multer');
const db = require ('../database/models')
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const cloudinaryConfig = {
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
};

cloudinary.config(cloudinaryConfig);

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
      res.status(500).send('Error interno del servidor'); 
    }
  },
  update: async (req, res) => {
    try {
      const productoEdit = await db.Juego.findByPk(req.params.idProductoJuegos);

      if (!productoEdit) {
        return res.status(404).send('Producto no encontrado'); 
      }

      
      productoEdit.nombre = req.body.nombre;
      productoEdit.genero = req.body.genero;
      productoEdit.precio = req.body.precio;
      productoEdit.rating = req.body.rating;
      productoEdit.descripcion = req.body.descripcion;
      productoEdit.fecha_alta = req.body.fecha_alta;
      productoEdit.fecha_baja = req.body.fecha_baja;
      productoEdit.descuento = req.body.descuento;

      // Guardar los cambios en la DB
      await productoEdit.save();

      res.redirect('product/details' + idProductoJuegos);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error interno del servidor');
    }
  },
  getCreateForm: async (req, res) => {

     const categorias = await db.Categoria.findAll(); 

    res.render("product/create", {categorias: categorias})
    
  },
  postCreateForm: async (req, res) => {
    try {
      let imageBuffer;
      let customFilename = "";
    
      if (!req.file) {
        imageBuffer = "DefectProduct.jpg";
      } else {
        imageBuffer = req.file.buffer;
        customFilename = Date.now() + '-producto';
      }
    
      const folderName = 'productos';
      const uploadPromise = new Promise((resolve, reject) => {
        let stream = cloudinary.uploader.upload_stream({ folder: folderName, resource_type: 'image', public_id: customFilename }, (error, result) => {
          if (error) {
            console.error('Error upload:', error);
            reject(error);
          } else {
            console.log('Upload ok:', result);
            resolve(result);
          }
        });
    
        streamifier.createReadStream(imageBuffer).pipe(stream);
      });

      const uploadedImage = await uploadPromise;


      if (!req.file) {
        return res.status(400).send('Debe proporcionar una imagen');
      }
  
      // Crear el juego en la DB
      const juego = await db.Juego.create({
        nombre: req.body.nombre,
        precio: req.body.precio,
        rating: req.body.rating,
        descripcion: req.body.descripcion,
        fecha_alta: req.body.fecha_alta,
        fecha_baja: req.body.fecha_baja,
        descuento: req.body.descuento,
        categoria_id: req.body.categoria_id
      });
  

      // Crear y asocia la imagen al juego
      const imagen = await db.Imagen.create({
        url_imagen: req.file ? uploadedImage.secure_url : imageBuffer, 
        juego_id: juego.id, 
      });

      const categorias = await db.Categoria.findAll();
  
      return res.render('product/create', {categorias});
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