'use strict';
// Student Entity Model

// Model interface
module.exports = function(sequelize, DataTypes) {
    let Aluno = sequelize.define(
        'Aluno',
        {
            id: {
                type: DataTypes.INTEGER, 
                primaryKey: true, 
                autoIncrement: true,
                allowNull: false 
            },
            nome: {
                type: DataTypes.STRING,
                allowNull: false            
            },
            data_nascimento:{
                type: DataTypes.DATEONLY,
                allowNull: false
            }
        },
        {
            schema: 'public',
            tableName: 'aluno',
            timestamps: true
        }
    );

    return Aluno;
}