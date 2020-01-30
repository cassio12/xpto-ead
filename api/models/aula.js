'use strict';
// Entity model Lesson

// Model interface
module.exports = function(sequelize, DataTypes) {
    let Aula = sequelize.define(
        'Aula',
        {
            id: {
                type: DataTypes.INTEGER, 
                primaryKey: true, 
                autoIncrement: true,
                allowNull: false 
            },
            titulo: { 
                type: DataTypes.STRING, 
                allowNull: false 
            },
            conteudo: {
                type: DataTypes.TEXT,
                allowNull: false
            }
        },
        {
            schema: 'public',
            tableName: 'aula',
            timestamps: true
        }
    );

    Aula.associate = function(models) {
        Aula.belongsTo(
            models.Curso,
            {
                as: 'curso',
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
                foreignKey: { 
                    allowNull: false
                }
            }
        )
    }

    Aula.load_scopes = function(models) {
        Aula.addScope(
            'complete',
            {
                include: [{ association: 'curso', required: false }]
            }
        );
    }
    
    return Aula;
}