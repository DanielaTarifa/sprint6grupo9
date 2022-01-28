const express= require ('express');
const router= express.Router();

const path = require('path');


//midelewares
const uploadFile = require('../middlewares/multerMiddleware');
const {validaciones} =require('../middlewares/validatorMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');
const packageName = require('../middlewares/guestMiddleware');

//controllers
let usersController= require('../controllers/usersController');
const guestMiddleware = require('../middlewares/guestMiddleware');


//rutas:
//formulario de Login
router.get('/login', guestMiddleware, usersController.login);
//procesar el login
router.post('/login', usersController.processLogin);


//formulario de registro
router.get('/register',guestMiddleware, usersController.register);
//procesa el registro
router.post('/register', uploadFile.single('avatar'), validaciones, usersController.processRegister);


//formulario de recuperar
router.get('/recuperar', usersController.recover);
//formulario de perfil
router.get('/perfil', authMiddleware ,usersController.perfil);

//para salir del perfil
router.get('/', usersController.logout);


module.exports= router;