const fs = require('fs');
const path= require('path');
const gamesPath= path.join(__dirname, "../data/datosJuegos.json");

const productosController = {
    productosDetalle: (req,res) => {
        const id = req.params.id
        const datosJuegos = JSON.parse(fs.readFileSync(gamesPath, "utf-8"));
        const game = datosJuegos.find(game => game.id == id)
        
        console.log('el juego es' + game);
        res.render('users/producto', {game});
    },

    detalleProducto: (req,res) => {
      res.render('users/productosDetalle')
    }
};

module.exports = productosController;