const {resolve} = require("path")
const fs = require("fs")
const bcryptjs = require('bcryptjs');

let model = {
    all : function () {

        let file = resolve(__dirname,'../data','usuarios.json')
        let data = fs.readFileSync(file)
        return JSON.parse(data);
    },
    one : function (id) {

        let all = model.all();
        return all.find(e => e.id == id)
    },
    findByField : function (field, text) {
        
        let all = model.all()
        let userFound =  all.find(oneUser => oneUser[field] === text)
        return userFound
    },
    generate : function (data) {

        let user = {}

        let all = model.all()
        let last = all.pop()
        user.id = last.id + 1
        
        user.firstName = data.firstName
        user.lastName = data.lastName
        user.email = data.email
        user.password = bcryptjs.hashSync(data.password, 10)
        user.image = data.image
        return user
    },
    write : function (data) {

        let file = resolve(__dirname,'../data','usuarios.json')
        let json = JSON.stringify(data,null,2);
        return fs.writeFileSync(file,json)
    }
}

module.exports = model