const sequelize = require('../database.js').sequelize;
const { DataTypes, Model } = require('sequelize');

class SearchInput extends Model {}

SearchInput.init({
    searchInput: {
        type: DataTypes.STRING,
        allowNull: false
    }, 
    page: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    }
},{
    sequelize,
    modelName: 'searchInput'

});

SearchInput.sync({alter:true});

module.exports = SearchInput;