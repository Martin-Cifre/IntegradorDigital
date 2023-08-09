const usersRoutes = require('./routes/usersRoutes.js')
const productosRoutes = require('./routes/productosRoutes.js')

const express = require('express');
const path = require('path');
const methodOverride = require('method-override');

const app = express();



app.use(express.static(path.join(__dirname, '../public')));


app.use('/', usersRoutes);
app.use('/product', productosRoutes);
app.use('/user', usersRoutes);

app.use('*', function(req,res){
    res.send("Ruta Erronea");
});

app.set('view engine', 'ejs');
app.set('views', './src/views');

// app.use(express.urlencoded({ extended: false}));
app.use(express.urlencoded({ extended: false}));
app.use(express.json());

app.use(methodOverride('_method'));

app.use((req,res,next) => {
    res.status(404).render('not-found');
})

app.listen(3030, () => {
    console.log('Servidor corriendo');
});