const checkoutController = {
  agregarCarrito: async (req, res) => {
    console.log(req.body);
    const { precioJuego, nombreJuego,idProductoJuegos } = req.body;
    

    if (!req.session.cart) {
      req.session.cart = [];
    }
    indiceencontrado =-1
    for (let index = 0; index < req.session.cart.length ; index++) {
      const element = req.session.cart[index];
      console.log(element.idProductoJuegos)
      console.log(idProductoJuegos)
      if(element.idProductoJuegos == idProductoJuegos ){
        indiceencontrado=index;
      }
    }

    if(indiceencontrado==-1){
      const productData = {
        monto_unidad: precioJuego,
        nombre: nombreJuego,
        idProductoJuegos: idProductoJuegos,
        cantidad:1
      };
      req.session.cart.push(productData);
    }else{
      req.session.cart[indiceencontrado].cantidad++;
    }
    const usuarioActual = req.session.userLogged
    console.log(req.session)

    res.render('product/carrito',{productosEnCarrito: req.session.cart,usuarioActual:usuarioActual});

  },
  vaciarCarro: async (req, res) => {
    const usuarioActual = req.session.userLogged
    req.session.cart = [];
    res.render('product/carrito',{productosEnCarrito: req.session.cart,usuarioActual:usuarioActual});
  }
    
  }
  module.exports = checkoutController;