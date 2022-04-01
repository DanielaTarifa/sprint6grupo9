const express= require('express');
const router= express.Router();

let productController=require('../controllers/productController');
const multer=require('multer')

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/img')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})



var upload = multer({ storage: storage })


//home
router.get('/', productController.all);
//detalle
router.get('/productDetail/:id', productController.detail);
router.get('/productCart',productController.cart);
router.get('/resumen',productController.resumen);

//search
router.get('/search', productController.search);

//CRUD- 
//crear
router.get('/agregarProducto', productController.add);//add-crear
router.post('/agregarProducto',upload.single("imagen"), productController.create);//create-guardado
//leer
router.get('/allproducts',productController.listAdmi);//listado admi-alls
router.get('/todos',productController.listClient);//listado admi-alls
//modificar
router.get('/editarProducto/:id', productController.edit);//editar
router.put('/editarProducto/:id',upload.single("imagen"), productController.update);//actualizar
//eliminar
router.delete('/borrar/:id',productController.delete);

module.exports= router;