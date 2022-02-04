const fs= require('fs');
const { all } = require('../routers/UsersRutas');
const path = require('path');

const User={

    
    fileName:'./src/data/user.json',
    

    getData: function(){
        return JSON.parse(fs.readFileSync(this.fileName, 'utf-8'))
    },

    generateId: function (){
    let allUsers= this.findAll();
    let lastUser= allUsers.pop();
    if(lastUser){ 
    return lastUser.id + 1;
    }
    return 1;
    },
    find: function (id) {
        let rows = this.readFile();
        
        return rows.find(i => i.id == id);
    },
    
    findAll: function (){
        return this.getData();
    },

    findByPk:function (id){
        let allUsers= this.findAll();
        let userFound = allUsers.find(oneUser => oneUser.id === id);
        return userFound;
    },

    findByField: function(field, text){
    let  allUsers= this.findAll();
    let userFound = allUsers.find(oneUser => oneUser[field] === text);
    return userFound;
    },

    create: function (userData){
    let allUsers= this.findAll();
    let newUser= {
        id: this.generateId(),
        ...userData
    }
    allUsers.push(newUser);
    fs.writeFileSync(this.fileName,JSON.stringify(allUsers, null,' '));
    return newUser;
    },

    delete: function (id){
        let allUsers= this.findAll();
        let finalUsers= allUsers.filter( oneUser => oneUser.id !== id);
        fs.writeFileSync(this.fileName,JSON.stringify(finalUsers, null,' '));
    },
    update: function (row) {
        let rows = this.readFile();

        let updatedRows = rows.map(oneRow => {
            if (oneRow.id == row.id) {
                return row;
            }

            return oneRow;
        });
        // escribo el archivo
       
        this.writeFile(updatedRows);

        return row.id;
    },
    perfil: (req,res)=>{
        res.render('./perfil')
    },

}

module.exports= User;