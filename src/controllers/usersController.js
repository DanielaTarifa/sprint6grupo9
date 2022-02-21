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
        
        return res.render('users/register')
    },

    listar:(req,res)=>{//funciona (solo funciona cuando no estas logeado 0.0) arreglar css
        Users.findAll()
        .then(listarUsuarios => {
            res.render('users/listar', {listarUsuarios: listarUsuarios})
        });

    },

    listarCliente:(req,res)=>{//(solo funciona cuando no estas logeado 0.0) arreglar css
        Users.findAll()
        .then(listarUsuarios => {
            res.render('users/listar', {listarUsuarios: listarUsuarios})
        });

    },
   delete: (req, res) =>{
        let userId = req.params.id;
        User.destroy({where: {id: userId}}) 
        .then(()=>{
            return res.redirect('/users')})
        .catch(error => res.send(error)) 
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
    let userToLogin = Users.findOne({where: {email: req.body.email}});// no anda esta roto
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
        
        //crea nuevos usuarios en json/ 
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
        let userToLogin = User.findByField('email', req.body.email); //busco mal

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

    destroy: (req, res) =>{
        let userId = req.params.id;
        Users.destroy({where: {id: userId}, force: true}) // force: true es para asegurar que se ejecute la acción
        .then(()=>{
            return res.redirect('/')})
        .catch(error => res.send(error)) 
    },

    recover:(req,res)=>{
        return res.render('users/recuperar');
    },

    perfil:(req,res)=>{
        return res.render('users/perfil',{
        user: req.session.userLogged
        });

    },//esta bien

    logout:(req,res)=>{
        res.clearCookie('userEmail')
        req.session.destroy();
        return res.redirect('/');
    }// esta bien
}

module.exports=usersController;