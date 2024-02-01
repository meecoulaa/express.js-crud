const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {
    class Department extends Model {}

    Department.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: sequelize.UUIDV4,
                primaryKey: true,
            },
            name: {
            type: DataTypes.STRING,
            allowNull: false,
            },
            company_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: "companies",
                key: "id",
            },
            },
            parent_id: {
            type: DataTypes.UUID,
            allowNull: true,
            },
            created_by: {
            type: DataTypes.UUID,
            allowNull: true,
            },
            created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.NOW,
            },
            updated_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.NOW,
            },
            archived_at: {
            type: DataTypes.DATE,
            allowNull: true,
            },
            deleted_at: {
            type: DataTypes.DATE,
            allowNull: true,
            },        
        },
        {
            sequelize,
            modelName: "department",
            tableName: "company_departments",
            timestamps: true,
            paranoid:true,
            createdAt: "created_at",
            updatedAt: "updated_at",
            deletedAt: "deleted_at",
        }
    );
    return Department;
};
