const { Usuario, Juego, Categoria } = require('../database/models');

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
          avatar: usuario.avatar,
          dni: usuario.dni,
          fecha_alta: usuario.fecha_alta,
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
          url_imagen: juego.Imagen[0].url_imagen,
          categoria_id: juego.categoria_id
        })),
      };
      res.json(response);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener productos' });
    }
  },

  obtenerProductosPorCategoriaPorId: async (req, res) => {
    const categoriaId = req.params.id;

    try {
      /* Buscamos la categoría por su ID para obtener su nombre */
      const categoria = await Categoria.findByPk(categoriaId);

      if (!categoria) {
        return res.status(404).json({ error: 'Categoría no encontrada' });
      }

      /* Luego, buscamos los productos asociados a la categoría */
      const productos = await Juego.findAll({
        where: { categoria_id: categoriaId },
        include: [{ association: 'Imagen' }],
      });

     /* Creamos un objeto para mantener el recuento de productos por categoría */
      const countByCategory = {
        [categoria.nombre]: productos.length,
      };

      /*  Obtengo los nombres de los videojuegos asociados a la categoría */
      const Game = productos.map(juego => juego.nombre);

      const response = {
        countByCategory,
        Game,
      };
      res.json(response);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener productos por categoría' });
    }
  },

  obtenerCategorias: async (req, res) => {
    try {
      const categorias = await Categoria.findAll();
      const response = {
        count: categorias.length,
        categ: categorias.map(categoria => ({
          id: categoria.id,
          nombre: categoria.nombre,
        })),
      };
      res.json(response);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener categorías' });
    }
  },
  obtenerCategoriasConLosProductos: async (req, res) => {
    try {
      const categorias = await Categoria.findAll();
      

      res.json(response);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener categorias con productos'})
    }
  }
};

module.exports = apiController;