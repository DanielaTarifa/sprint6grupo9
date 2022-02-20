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



module.exports= router;