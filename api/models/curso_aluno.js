'use strict';

// Model interface
module.exports = function(sequelize, DataTypes) {
    var Curso_aluno = sequelize.define(
        'Curso_aluno',
        {
            schema: 'public', 
            tableName: 'curso_aluno', 
            timestamps: true
        }
    );

    Curso_aluno.associate = function(models) {
        Curso_aluno.belongsTo(
            models.Curso,
            {
                as: 'curso',
                onUpdate: 'CASCADE', 
                onDelete: 'CASCADE',
                foreignKey: { 
                    allowNull: false 
                }
            }
        );
        Curso_aluno.belongsTo(
            models.Aluno,
            {
                as: 'aluno',
                onUpdate: 'CASCADE', 
                onDelete: 'CASCADE',
                foreignKey: { 
                    allowNull: false 
                }
            }
        );
    }

    Curso_aluno.load_scopes = function(models) {

    }

    return Curso_aluno;
};