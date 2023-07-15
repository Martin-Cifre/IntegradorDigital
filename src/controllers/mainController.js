const fs = require('fs');
const path= require('path');
const gamesPath= path.join(__dirname, "../data/datosJuegos.json");

const mainController = {
    index: (req,res) => {
        const datosJuegos = JSON.parse(fs.readFileSync(gamesPath, 'utf-8'));
console.log(datosJuegos); 
res.render("home", { datosJuegos: datosJuegos });
    },
    about: (req,res) => {
        res.render("about")
    }
};

module.exports = mainController