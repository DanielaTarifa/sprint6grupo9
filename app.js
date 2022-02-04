const express = require('express');
const session = require('express-session'); //para iniciar en perfil
const app = express();



//para iniciar la sesion del perfil
app.use(session({
    secret:"floooor",
    resave:false,
    saveUninitialized:false,
}))



app.use(express.static('public'));


//Motor de vistas
//set es configuracion, vamos a configurar app, en el q van 2 parametros
app.set('view engine','ejs');//en el 1ro va el motor de plantilla, en el 2do va el nombre ejs

app.set('views','src/views');//por otro lado vamos a crear otro set, para simplificar el nombres de las vistas. utilzamos un segundo seteo/recurso.


const userLoggedMiddleware = require('./src/middlewares/userLoggedMiddleware');
const UsersRutas= require('./src/routers/UsersRutas')
const productRutas= require('./src/routers/productRutas')

const methodOverride  = require("method-override");
app.use(methodOverride("_method"));

//Ruta product
app.use(userLoggedMiddleware);
app.use('/', productRutas);
app.use(express.urlencoded({extended:true})); 
app.use(express.json());
//Ruta users
app.use('/', UsersRutas);



/*app.get('/logout', function (req, res) {
    req.session.destroy();
    res.redirect('/');
  });*/




app.listen(process.env.PORT || 3000 , ()=>{
    console.log('Servidor funcionando');
});
