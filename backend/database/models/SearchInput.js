const sequelize = require('../database.js').sequelize;
const { DataTypes, Model } = require('sequelize');

class SearchInput extends Model {}

SearchInput.init({
    searchInput: {
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    sequelize,
    modelName: 'searchInput'

});

SearchInput.sync();

module.exports = SearchInput;