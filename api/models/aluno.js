'use strict';

// Model interface
module.exports = function(sequelize, DataTypes) {
    let Aluno = sequelize.define(
        'Aluno',
        {
            id: {
                type: DataTypes.INTEGER, 
                primaryKey: true, 
                autoIncremet: true,
                allowNull: false 
            },
            nome: {
                type: DataTypes.STRING,
                allowNull: false            
            },
            data_nascimento:{
                type: DataTypes.DATE,
                allowNull: false
            }
        },
        {
            schema: 'public',
            tableName: 'aluno',
            timestamps: true
        }
    );

    Aluno.load_scopes = function(models){
        Aluno.addScope(
            'complete',
            {
                include: [{ associate: 'curso_aluno', required: false }]
            }
        );
    }

    return Aluno;
}