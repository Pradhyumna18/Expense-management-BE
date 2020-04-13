'use strict';
module.exports = (sequelize, DataTypes) => {
  const Accounts = sequelize.define('Accounts', {
    accountName: DataTypes.STRING,
    accountBalance: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {});
  Accounts.associate = function(models) {
    // associations can be defined here
    Accounts.belongsTo(models.Users,{foreignKey: 'userId'});
    models.Users.hasMany(Accounts,{foreignKey: 'userId'});
  };
  return Accounts;
};