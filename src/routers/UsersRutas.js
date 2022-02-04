const express= require ('express');
const router= express.Router();

const path = require('path');


//midelewares
const uploadFile = require('../middlewares/multerMiddleware');
const {validaciones} =require('../middlewares/validatorMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');
const userLoggedMiddleware = require('../middlewares/userLoggedMiddleware');

//controllers
let usersController= require('../controllers/usersController');


//rutas:
//formulario de Login
router.get('/login', guestMiddleware, usersController.login);
//procesar el login
router.post('/login', usersController.processLogin);


//formulario de registro
router.get('/register',guestMiddleware, usersController.register);
//procesa el registro
router.post('/register', uploadFile.single('avatar'), validaciones, usersController.processRegister);

//no se puede entrar xq no se como hicieron el model
//les deje echo las funciones solo falta q arreglen como editar el json
router.get('/register/:id', uploadFile.single('avatar'), validaciones, usersController.edit);
router.put('/register/:id', uploadFile.single('avatar'), validaciones, usersController.editar);
//formulario de recuperar
router.get('/recuperar', usersController.recover);
//formulario de perfil
router.get('/perfil', authMiddleware ,usersController.perfil);


//para salir del perfil
router.get('/logout/', userLoggedMiddleware, usersController.logout);


router.delete('/borrar/:id',usersController.delete);

module.exports= router;