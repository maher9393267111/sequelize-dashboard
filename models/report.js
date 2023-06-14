module.exports = (sequelize, DataTypes) => {
    const Report = sequelize.define("Report", {
      month: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
      },
      year: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
      },
      customers: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
      },
      products: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
      },
      revenue: {
        type: DataTypes.BIGINT,
        allowNull: false,
        defaultValue: 0,
      },
      profit: {
        type: DataTypes.BIGINT,
        allowNull: false,
        defaultValue: 0,
      }
    })
  
    Report.associate = (models) => {
      Report.belongsToMany(models.SellForm, {
        through: models.ReportDetail
      })
      Report.hasMany(models.ReportDetail)
    }
  
    return Report;
}