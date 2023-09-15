function usuarioData (sequelize, Datatypes) {
    let a = 'Usuario'

    let campoUsuario = {
        id:{type: Datatypes.INTEGER, primaryKey: true, autoIncrement: true},
        nombre: {type: Datatypes.STRING},
        apellido: {type: Datatypes.STRING},
        email: {type: Datatypes.STRING},
        clave: {type: Datatypes.STRING},
        avatar: {type: Datatypes.STRING, allowNull: true},
        rol: {type: Datatypes.ENUM('Creador','Admin','Usuario')},
        puntos: {type: Datatypes.STRING},
        dni: {type: Datatypes.STRING},
        fecha_alta: {type: Datatypes.DATE},
        fecha_baja: {type: Datatypes.DATE}
    }
    {
        
    }
    
    let config = {camelCase: false, timestamps: false, tablename: "Usuario"};

    const usuario = sequelize.define(a,campoUsuario,config)

    return usuario

}

module.exports = usuarioData;