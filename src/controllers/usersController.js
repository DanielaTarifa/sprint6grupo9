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

    listar:(req,res)=>{//funciona (solo funciona cuando no estas logeado 0.0) arreglar css y ejs
        Users.findAll()
        .then(listarUsuarios => {
            res.render('users/listar', {listarUsuarios: listarUsuarios})
        });

    },

    delete: (req, res) =>{
        let userId = req.params.id;
        User.destroy({where: {id: userId}}) 
        .then(()=>{
            return res.redirect('/')})
        .catch(error => res.send(error)) 
    },//falta probar
    
    processRegister:(req,res)=>{
        const resultValidation = validationResult(req);

        if (resultValidation.errors.length > 0) {
            return res.render('users/register', {
                errors: resultValidation.mapped(),
                oldData: req.body
            })
        }

    //tiene que salir un cartel q ya esta en uso el mail si se repite 2 veces//
    let userInDB = db.Users.findAll({where: {email: req.body.email}});
        
        if(!userInDB){
            return res.render('./users/register',{
                errors:{
                    email :{
                        msg: 'Este email ya esta registrado'
                    }
                },
                oldData:req.body,
            });
        };

        Users.create({
            name: req.body.nombre,
            lastname: req.body.apellido,
            userName: req.body.nombreDeUsuario,
            email: req.body.email,
            cel: req.body.tel,
            password: bcryptjs.hashSync(req.body.password, 10),
            avatar: req.file.filename,
            rolId: 1 })

            .then( () => {
                return res.redirect('/login');
            })
            .catch( error => {
                return res.send(error);
            });
        
        //crea nuevos usuarios en json/ 
        /*let userToCreate= {
            ...req.body,
            password: bcryptjs.hashSync(req.body.password, 10),
            avatar: req.file.filename,
            rol: "cliente"
        }

        let userCreated=  User.create(userToCreate);

        return res.redirect('/login'); //una vez registrado te lleva para que entres x login */
    },

    login:( req,res)=>{
        return res.render('users/login');
        },

    processLogin:(req,res)=>{
        Users.findOne(
            { 
                where : { email: req.body.email}
            })
        .then( user => {

            if (user != null) {

                    let isOkPassword = bcryptjs.compareSync(req.body.password, user.password);

                    if (isOkPassword) {

                        req.session.userLogged = user;

                        if (req.body.remember_user){

                            res.cookie('userEmail', req.body.email, {maxAge:(1000 * 60) * 60})
                        }

                            res.redirect('/perfil')
                    }

                    res.render('./users/login' , {
                        errors: {
                            email: {
                                msg: 'Las credenciales son inválidas!'
                            }
                        }
                    });
                } else {
                    res.render('./users/login', {
                        errors: {
                            email: {
                                msg: 'No se encuentra registrado este email'
                            }
                        }
                    });
                }
        })
        .catch(error => res.send(error));
    },

    edit: (req, res)=> {
        res.render('./perfil');
    },
    update: (req, res)=>{
        
        db.Users.update({
            name: req.body.nombre,
            lastname: req.body.apellido,
            userName: req.body.nombreDeUsuario,
            email: req.body.email,
            cel: req.body.tel,
            avatar: req.file.filename,
        },{
            where: { id: req.params.id}
        })
        .then( () => {
                req.session.user = req.body.nombre;
                req.session.email = req.body.email;
                req.session.image = req.file.filename;
                console.log(req.session)
                res.redirect("/perfil");
        })
        .catch( error => {
            return res.send(error);
        });
    
    },
    
    
    recover:(req,res)=>{
        return res.render('users/recuperar');
    },//esta bien

    perfil:(req,res)=>{
        
        res.render('users/perfil', {user: req.session.userLogged});

    },//esta bien

    logout:(req,res)=>{
        res.clearCookie('userEmail')
        req.session.destroy();
        return res.redirect('/');
    }// esta bien
}

module.exports=usersController;