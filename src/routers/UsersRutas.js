const express= require ('express');
const router= express.Router();

const path = require('path');


//midelewares
const uploadFile = require('../middlewares/multerMiddleware');
const {validaciones} =require('../middlewares/validatorMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');
const userLoggedMiddleware = require('../middlewares/userLoggedMiddleware');
const paraEditUser = require('../middlewares/paraEditUser');

//controllers
let usersController= require('../controllers/usersController');


//rutas:
//formulario de Login
router.get('/login', guestMiddleware, usersController.login);
//procesar el login
router.post('/login', usersController.processLogin);


//formulario de registro
router.get('/register',guestMiddleware, usersController.register);//esto mi add

//formulario de recuperar
router.get('/recuperar', usersController.recover);
//formulario de perfil
router.get('/perfil', authMiddleware ,usersController.perfil);


//para salir del perfil
router.get('/logout/', userLoggedMiddleware, usersController.logout);// esta bien


//crud
router.get('/listar', guestMiddleware ,usersController.listar);
router.post('/register', uploadFile.single('avatar'), validaciones, usersController.processRegister);//agrega usuarios
router.get('/borrar/:id', guestMiddleware ,usersController.delete);

//router.get('/editarusuario/:id',usersController.edit);//este misdelware te deja entrar si tas registrada
//router.put('/editarusuario/:id',usersController.update);
router.get('/perfil/edit/:id', usersController.edit)//detalle
router.put('/perfil/edit/:id', uploadFile.single('avatar'),usersController.update)

module.exports= router;