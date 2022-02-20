const req = require('express/lib/request');
const jsonDB = require('../model/jsonDatabase');
const product = jsonDB('products');
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const path = require('path');
let db = require('../database/models');
const sequelize = db.sequelize;
const { Op, where } = require("sequelize");
const { buildCheckFunction } = require('express-validator');
const { createConnection } = require('net');

//una forma de llamar a modelos de la carpeta models
const Products = db.Products;
const Categories = db.Categories;
const Numbersofinstallments = db.Numbersofinstallments;
const Sections = db.Sections;

const productController={

    
    edit:(req, res)=> {
        let pedidoProducto=Products.findByPk(req.params.id);

        let promesaCuotas= Numbersofinstallments.findAll();
        let promesaSections= Sections.findAll();
        let promesaCategories= Categories.findAll();
        
        Promise.all([pedidoProducto, promesaCuotas, promesaSections, promesaCategories])
        .then(function([ producto, cuotas, secciones, categorias]) {
            
            res.render('./products/editProduct', {producto:producto, cuotas:cuotas, secciones:secciones, categorias:categorias})})
        .catch(error => res.send(error))

    },
    update:(req, res)=> {
        Products.update({
            name:req.body.nombre,
            description:req.body.descripcion,
            duesId:req.body.cuotas,
            price:req.body.precio,
            img:req.file.filename,
            visibility:req.body.visualizacion,
            stock:req.body.stock,
            stockMin:req.body.stockMinimo,
            stockMax:req.body.stockMaximo,
            sectionId:req.body.seccion,
            categoryId:req.body.categoria,
        },{
            where:{
                id:req.params.id
            }
        })
        .then(()=>{
            res.redirect("/")
        })
        .catch(error => res.send(error))

    },
    detail:(req,res)=>{
        let pedidoProducto= Products.findByPk(req.params.id);
        let pedidoListas= Products.findAll();
        let promesaCuotas= Numbersofinstallments.findAll();
        let promesaSections= Sections.findAll();
        let promesaCategories= Categories.findAll();
        
        Promise.all([pedidoProducto, pedidoListas, promesaCuotas, promesaSections, promesaCategories])
        .then(function([ producto, productos, cuotas, secciones, categorias]) {
            
            res.render('./products/productDetail', {producto:producto, productos:productos, cuotas:cuotas, secciones:secciones, categorias:categorias, mil:toThousand})
        })
        .catch(error => res.send(error))    
    },
    cart: (req,res)=>{
        res.render('./products/productCart')
    },
    resumen: function(req,res) {
        res.render('./products/resumen')
    },
    delete:(req,res)=>{
        Products.destroy({
            where:{
                id:req.params.id
            }
        })
        res.redirect("/allproducts");
    }
    
}

module.exports=productController;

