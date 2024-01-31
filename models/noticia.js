'use strict';

module.exports =(sequelize, DataTypes)=>{
    const noticia = sequelize.define('noticia',{
        titulo:{type:DataTypes.STRING(100), allowNull:false},
        cuerpo:{type:DataTypes.TEXT('medium'), allowNull:false},
        fecha:{type:DataTypes.DATE},
        external:{type:DataTypes.UUID, defaultValue:DataTypes.UUIDv4},
        estado:{type:DataTypes.BOOLEAN, defaultValue:true}
    },{freezeTableName:true});
    return noticia;
}