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

router.get('/', productController.all);
router.get('/editarProducto/:id', productController.edit);
router.put('/editarProducto/:id',upload.single("imagen"), productController.editar);
router.get('/agregarProducto', productController.add);
router.post('/agregarProducto',upload.single("imagen"), productController.create);
router.get('/productDetail/:id', productController.detail);
router.get('/productCart',productController.cart);
router.get('/resumen',productController.resumen);
router.get('/allproducts',productController.alls);
router.get('/todos',productController.todos);
router.delete('/borrar/:id',productController.delete);

module.exports= router;