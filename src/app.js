const usersRoutes = require('./routes/usersRoutes.js')
const productosRoutes = require('./routes/productosRoutes.js')
const apiRoutes = require('./routes/apiRoutes.js')

const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const methodOverride = require('method-override');
const session = require('express-session');
const cors = require('cors')
const app = express();

app.use(express.static(path.join(__dirname, '../public')));

app.use(express.urlencoded({ extended: false}));
app.use(express.json());
app.use(cookieParser());

app.set('view engine', 'ejs');
app.set('views', './src/views');

app.use(methodOverride('_method'));
app.use(session ({secret: 'secreto_Quest!!!!', resave: false, saveUninitialized: true}));

app.use(cors())

app.use('/', usersRoutes);
app.use('/product', productosRoutes);
app.use('/user', usersRoutes);
app.use('/api', apiRoutes)

app.use((req,res,next) => {
    res.status(404).render('not-found');
})

app.listen(3030, () => {
    console.log('Servidor corriendo');
});