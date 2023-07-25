const express = require('express');
const app = express();
const usersRoutes = require('./routes/usersRoutes.js')
const productosRoutes = require('./routes/productosRoutes.js')
const path = require('path');

const methodOverride = require('method-override');
app.use(methodOverride('_method'));
app.use(express.urlencoded({extended:false})); // esta linea es para poder recibir la informacion desde el front en res.body

app.use(express.static(path.join(__dirname, '../public')));

app.set('view engine', 'ejs');
app.set('views', './src/views');

app.use(express.json());

app.use('/', usersRoutes);
app.use('/product', productosRoutes);
app.use('/user', usersRoutes);

app.use('*', function(req,res){
    res.send("Ruta Erronea");
});



app.use((req,res,next) => {
    res.status(404).render('not-found');
})

app.listen(3030, () => {
    console.log('Servidor corriendo');
});