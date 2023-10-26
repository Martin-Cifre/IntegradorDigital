const fs = require('fs');
const path = require('path');
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');
const multer = require('multer');
const db = require('../database/models');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const { validationResult } = require('express-validator');

const cloudinaryConfig = {
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
};

cloudinary.config(cloudinaryConfig);

const controlador = {
  edit: async (req, res) => {
    console.log("HASTA ACA LLEGUE")
    try {
      const idProductoJuegos = req.params.idProductoJuegos;
      const productoEdit = await db.Juego.findByPk(idProductoJuegos);

      if (!productoEdit) {
        return res.status(404).render('not-found'); // Manejo de producto no encontrado
      }

      const usuarioLogueado = req.session.userLogged ? true : false;

      const usuarioActual = req.session.userLogged

      res.render("product/productosEditar", { productoEdit: productoEdit, usuarioLogueado, usuarioActual: usuarioActual });
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

      const usuarioActual = req.session.userLogged

      const juegos = await db.Juego.findAll({
        include: [{ model: db.Imagen, as: 'Imagen' }],
        attributes: ['id', 'nombre', 'precio'],
      });
      juegos

      res.render('home', { juegos, usuarioActual });
    } catch (error) {
      console.error(error);
      res.status(500).send('Error interno del servidor');
    }
  },
  eliminarProducto: async (req, res) => {
    console.log('VOY A ELIMINAR')
    try {
      await db.Juego.destroy({ where: { id: req.params.id } });

      const juegos = await db.Juego.findAll({
        include: [{ model: db.Imagen, as: 'Imagen' }],
        attributes: ['id', 'nombre', 'precio'],
      });

      const usuarioActual = req.session.userLogged
      return res.render('home', { juegos, usuarioActual });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error al eliminar el juego' });
    }
  },
  getCreateForm: async (req, res) => {

    const categorias = await db.Categoria.findAll();

    const usuarioActual = req.session.userLogged
    res.render("product/create", { categorias: categorias, usuarioActual })

  },
  postCreateForm: async (req, res) => {
    try {
      const validProductCreate = validationResult(req);

      if (validProductCreate.errors.length > 0) {
        const usuarioActual = req.session.userLogged
        return res.render('product/create', { errors: validProductCreate.mapped(), usuarioActual });
      }

      const imagePromises = []; // Almacenaremos las promesas para subir todas las imágenes

      if (req.files && req.files.length > 0) {
        for (let i = 0; i < req.files.length; i++) {
          const imageBuffer = req.files[i].buffer;
          const customFilename = Date.now() + '-producto-' + i;
          const folderName = 'productos';

          const uploadPromise = new Promise((resolve, reject) => {
            let stream = cloudinary.uploader.upload_stream(
              {
                folder: folderName,
                resource_type: 'image',
                public_id: customFilename,
              },
              (error, result) => {
                if (error) {
                  console.error('Error upload:', error);
                  reject(error);
                } else {
                  console.log('Upload ok:', result);
                  resolve(result);
                }
              }
            );

            streamifier.createReadStream(imageBuffer).pipe(stream);
          });

          imagePromises.push(uploadPromise);
        }
      }

      const uploadedImages = await Promise.all(imagePromises);

      /* Crear el juego en la DB */
      const juego = await db.Juego.create({
        nombre: req.body.nombre,
        precio: req.body.precio,
        rating: req.body.rating,
        descripcion: req.body.descripcion,
        fecha_alta: req.body.fecha_alta,
        fecha_baja: req.body.fecha_baja,
        descuento: req.body.descuento,
        categoria_id: req.body.categoria_id,
      });

      /* Crear y asociar las imágenes al juego */
      const imagenes = await Promise.all(
        uploadedImages.map((uploadedImage) =>
          db.Imagen.create({
            url_imagen: uploadedImage.secure_url,
            juego_id: juego.id,
          })
        )
      );

      const categorías = await db.Categoria.findAll();

      const juegos = await db.Juego.findAll({
        include: [{ model: db.Imagen, as: 'Imagen' }],
        attributes: ['id', 'nombre', 'precio'],
      });

      const usuarioActual = req.session.userLogged
      // Redirigir a la página principal después de crear el juego
      return res.render('home', { juegos, usuarioActual: usuarioActual });
    } catch (error) {
      console.error('Error al crear un nuevo producto:', error);
      return res.status(500).send('Error interno del servidor');
    }
  },
  productosDetalle: async (req, res) => {
    try {
      /* obtengo el juego */
      const juegoEncontrado = await db.Juego.findByPk(req.params.id, {
        include: [{ model: db.Imagen, as: 'Imagen' }],
      });

      const categoriaEncontrada = await db.Juego.findByPk(req.params.id, {
        include: [{ model: db.Categoria, as: 'categoria' }],
      });

      const usuarioActual = req.session.userLogged
      res.render('product/details', { juegoEncontrado, categoriaEncontrada, usuarioActual: usuarioActual });
    } catch (error) {
      console.error('Error al obtener el juego desde la base de datos:', error);
      res.status(500).json({ error: 'Hubo un error al obtener el juego desde la base de datos.' });
    }
  },
  search: async (req, res) => {


    try {

    } catch (error) {
      console.error(error);
      res.status(500).send('Error de servidor');
    }
  },
  carritoCompra: async (req, res) => {
    try {
      // Obtén el carrito del usuario desde la sesión
      const cart = req.session.cart || [];

      // Obtén información adicional de los productos en el carrito
      const productosEnCarrito = await Promise.all(cart.map(async (item) => {
        const product = await Juego.findByPk(item.productoId); // Obtén información adicional del producto desde la base de datos

        // Obtener las imágenes asociadas al producto
        const imagenes = await Imagen.findAll({ where: { juego_id: product.id } });

        return {
          Juego: {
            nombre: product.nombre,
          },
          monto_unidad: product.precio,
          cantidad: item.cantidad,
          Imagen: imagenes,
        };
      }));

      let total = 0;
      // Calcular el total de la compra
      productosEnCarrito.forEach((product) => {
        total += product.monto_unidad * product.cantidad;
      });

      console.log('Productos en el carrito:', productosEnCarrito);
      console.log('Total de la compra:', total);

      res.render('carrito', { productosEnCarrito, total });
    } catch (error) {
      console.error(error);
      return res.redirect('/carrito');
    }
  },
  // Controlador para agregar productos al carrito
  agregarAlCarrito: async (req, res) => {
    try {
      // Obtén el ID del producto desde la URL
      const productoId = req.params.idProductoJuegos;
      const cantidad = req.body.cantidad; // Obtén la cantidad del producto del formulario

      // Obtén el carrito del usuario desde la sesión
      const cart = req.session.cart || [];

      // Verifica si el producto ya está en el carrito
      const existingProduct = cart.find((item) => item.productoId === productoId);

      if (existingProduct) {
        // Si el producto ya está en el carrito, actualiza la cantidad
        existingProduct.cantidad += parseInt(cantidad);
      } else {
        // Si el producto no está en el carrito, agrégalo
        cart.push({ productoId, cantidad: parseInt(cantidad) });
      }

      // Actualiza el carrito en la sesión del usuario
      req.session.cart = cart;

      // Redirige al usuario nuevamente a la vista del carrito
      return res.redirect('/carrito');
    } catch (error) {
      console.error(error);
      return res.redirect('/carrito');
    }
  },
};

module.exports = controlador;