'use strict';
module.exports = (sequelize, DataTypes) => {
  const Transactions = sequelize.define('Transactions', {
    transactionType: DataTypes.STRING,
    amount: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    accountId: DataTypes.INTEGER,
    description: DataTypes.STRING,
    date: DataTypes.DATE
  }, {});
  Transactions.associate = function(models) {
    // associations can be defined here
    Transactions.belongsTo(models.Users,{foreignKey: 'userId'});
    models.Users.hasMany(Transactions,{foreignKey: 'userId'});
    Transactions.belongsTo(models.Accounts,{foreignKey: 'accountId'});
    models.Accounts.hasMany(Transactions,{foreignKey: 'accountId'});
  };
  return Transactions;
};