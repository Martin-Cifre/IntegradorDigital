const path = require('path');

const controlador = {
    producto: (req,res) => {
        let game = [
          {
            id: 1,
            nombre: 'Elden Ring',
            precio: 38.50,
            imagenJuego: "http://martincifre.alwaysdata.net/Juego-EldenRing.png"
          },
          {
            id: 2,
            nombre: 'MARIO KART 8',
            precio: 25.00,
            imagenJuego: "http://martincifre.alwaysdata.net/Juego-MarioKart.png"
          },
          {
            id: 3,
            nombre: 'COD: MW2',
            precio: 29.50,
            imagenJuego: "http://martincifre.alwaysdata.net/Juego-COD.png"
          },
          {
            id: 4,
            nombre: 'DEAD BY DAYLIGHT',
            precio: 15.50,
            imagenJuego: "http://martincifre.alwaysdata.net/Juego-DBD.png"
          },
      ];
        
        res.render('prueba', {datosDeLosJuegos: game});
    }
};

module.exports = controlador;