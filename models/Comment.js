const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');
const moment = require('moment')

class Comment extends Model {};

Comment.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
    date_created: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: moment().format("M/D/YYYY"),
    },
    text: {
        type: DataTypes.STRING,
        allowNull: false,
        },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'users',
            key: 'id',
        },
    },
    post_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'posts',
            key: 'id',
        },
    },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: false,
        underscored: true,
        modelName: 'comment',
    }
);

module.exports = Comment;