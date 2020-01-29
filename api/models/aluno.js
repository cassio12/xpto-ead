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
            }
        },
        {
            schema: 'public',
            tableName: 'aluno',
            timestamps: true
        }
    );

    // Aluno.associate = function(models) {
    //     Aluno.belongsTo(
    //         models.Curso_aluno,
    //         {
    //             as: 'curso_aluno',
    //             onUpdate: 'CASCADE',
    //             onDelete: 'CASCADE',
    //             foreignKey: { 
    //                 allowNull: false
    //             }

    //         }
    //     )
    // }

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