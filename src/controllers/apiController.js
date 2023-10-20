const { Usuario, Juego, Categoria, Imagen } = require('../database/models');

const apiController = {
  obtenerUsuarios: async (req, res) => {
    try {
      const usuarios = await Usuario.findAll();
      const response = {
        count: usuarios.length,
        users: usuarios.map(usuario => ({
          id: usuario.id,
          nombre: usuario.nombre,
          apellido: usuario.apellido,
          email: usuario.email,
        })),
      };
      res.json(response);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener usuarios' });
    }
  },

  obtenerUsuarioPorId: async (req, res) => {
    const usuarioId = parseInt(req.params.id);
    try {
      const usuario = await Usuario.findByPk(usuarioId, {
        attributes: {
          exclude: ['clave'],
        },
      });
      if (usuario) {
        res.json(usuario);
      } else {
        res.status(404).json({ error: 'Usuario no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener usuario por ID' });
    }
  },

  obtenerProductos: async (req, res) => {
    try {
      const productos = await Juego.findAll({
        include: [{ association: 'Imagen' }],
      });
      const response = {
        count: productos.length,
        products: productos.map(juego => ({
          id: juego.id,
          nombre: juego.nombre,
          descripcion: juego.descripcion,
          precio: juego.precio,
          url_imagen: juego.Imagen[0].url_imagen
        })),
      };
      res.json(response);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener productos' });
    }
  },

  obtenerCategorias: async (req, res) => {
    try {
      const categorias = await Categoria.findAll();
      const response = {
        count: categorias.length,
      };
      res.json(response);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener categorías' });
    }
  },
};

module.exports = apiController;