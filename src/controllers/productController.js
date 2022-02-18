const req = require('express/lib/request');
const jsonDB = require('../model/jsonDatabase');
const product = jsonDB('products');
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const path = require('path');
let db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize")

//una forma de llamar a modelos de la carpeta models
const Products = db.Products;
const Categories = db.Categories;
const Numbersofinstallments = db.Numbersofinstallments;
const Sections = db.Sections;

const productController={


    all:(req,res)=>{
        let productos =product.all();
        res.render('./products/index',{productos:productos,mil:toThousand})
    },
    alls:(req,res)=>{
        let productos =product.all();
        res.render('./products/allproducts',{productos:productos,mil:toThousand})
    },
    todos:(req,res)=>{
        let productos =product.all();
        res.render('./products/todos',{productos:productos,mil:toThousand})
    },
    index: (req, res)=> {
        res.render('./products/index')
    },
    edit:(req, res)=> {
        let id=req.params.id;
        let producto=product.find(id);
        res.render('./products/editProduct',{producto})
    },
    add: (req,res)=>{
        res.render('./products/productAdd')
    },
    create:(req,res)=>{
        let producto={
            nombre:req.body.nombre,
            descripcion:req.body.descripcion,
            cuotas:"COMPRALO EN 12 CUOTAS DE $"+req.body.cuotas,
            precio:Number(req.body.precio),
            imagen:req.file.filename,
            categoria:req.body.categoria
        };
        product.create(producto);
        res.redirect("/");
    },
    detail:function (req,res) {
        let id=req.params.id;
        let producto=product.find(id);
        let productos =product.all();
        res.render('./products/productDetail',{producto,mil:toThousand,productos:productos})
    },
    editar:(req,res)=>{
        let img=product.find(req.params.id);
        let producto={
            id:req.params.id,
            nombre:req.body.nombre,
            descripcion:req.body.descripcion,
            cuotas:"COMPRALO EN 12 CUOTAS DE $"+req.body.cuotas,
            precio:Number(req.body.precio),
            imagen:req.file!=null?req.file.filename:img.imagen,
            categoria:req.body.categoria
        };
        product.update(producto);
        res.redirect("/allproducts")
    },
    cart: (req,res)=>{
        res.render('./products/productCart')
    },
    resumen: function(req,res) {
        res.render('./products/resumen')
    },
    delete:(req,res)=>{
        product.delete(req.params.id);
        res.redirect("/allproducts");
    }
}

module.exports=productController;
