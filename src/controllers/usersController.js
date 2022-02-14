const {validationResult} = require('express-validator');
const { create } = require('../model/User');
const User = require('../model/User');
const  bcryptjs = require ('bcryptjs');
const session = require('express-session');


const path = require('path');
let db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");


//una forma de llamar a modelos de la carpeta models
const Users = db.Users;
const Rols = db.Rols;
 

const usersController={
    register:(req,res)=>{

        return res.render('users/register');
    },
    processRegister:(req,res)=>{
        const resultValidation = validationResult(req);

        if (resultValidation.errors.length > 0) {
            return res.render('users/register', {
                errors: resultValidation.mapped(),
                oldData: req.body
            })
        }


    //tiene que salir un cartel q ya esta en uso el mail si se repite 2 veces//
        let userInDB = User.findByField ('email', req.body.email);
        if (userInDB){
            return res.render ('users/register',{
                errors:{
                    email:{
                    msg: 'este email ya esta registrado'
                    }
                },
                oldData: req.body
            });
        }
        
        //crea nuevos usuarios/ 
        let userToCreate= {
            ...req.body,
            password: bcryptjs.hashSync(req.body.password, 10),
            avatar: req.file.filename,
            rol: "cliente"
        }


        let userCreated=  User.create(userToCreate);

        return res.redirect('/login'); //una vez registrado te lleva para que entres x login 
    },
    login:( req,res)=>{
        return res.render('users/login');
        },
    processLogin:(req,res)=>{
        let userToLogin = User.findByField('email', req.body.email);

        if (userToLogin){
        let isOkThepassword= bcryptjs.compareSync(req.body.password,userToLogin.password);
        if (isOkThepassword){
            delete userToLogin.password;
            req.session.userLogged= userToLogin;

            if( req.body.remeber_user){
            res.cookie('userEmail', req.body.email,{ maxAge: (1000 * 60) * 2})
            }

            return res.redirect('perfil')
        }
        return res.render ('users/login', {
            errors: {
                email: {
                    msg: 'las credenciales son invalidas'
                }
            }
        });
        }
        return res.render ('users/login', {
        errors: {
            email: {
                msg: 'No se encuentra registrado este email'
                }
            }
        });

    },

    recover:(req,res)=>{
        return res.render('users/recuperar');
    },

    perfil:(req,res)=>{
        return res.render('users/perfil',{
        user: req.session.userLogged
        });

    },

    logout:(req,res)=>{
        res.clearCookie('userEmail')
        req.session.destroy();
        return res.redirect('/');
    },
    edit:(req, res)=> {
        let id=req.params.id;
        let user=User.find(id);
        res.render('./users/register',{user})
    },
    editar:(req,res)=>{
        let img=User.find(req.params.id);
        let producto={
            id:req.params.id,
            nombre:req.params.body.nombre,
            apellido:req.params.body.apellido,
            nombreDeUsuario:req.params.body.nombreDeUsuario,
            email:req.params.body.email,
            tel:req.params.body.tel,
            password:req.params.body.password,
            avatar:req.file!=null?req.file.filename:img.imagen,
            
        };
        User.update(producto);
        res.redirect("/perfil")
    },
    delete:(req,res)=>{
        User.delete(req.params.id);
        res.redirect("/");
    }
}

module.exports=usersController;