module.exports = (sequelize, DataTypes) => {

    const ReportDetail = sequelize.define("ReportDetail", {
      quantity: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      subtotal: {
        type: DataTypes.BIGINT,
        allowNull: false,
        defaultValue: 0,
      }
    });
  
    ReportDetail.associate = (models) => {
      ReportDetail.belongsTo(models.Product);
      ReportDetail.belongsTo(models.ProductType);
      ReportDetail.belongsTo(models.Report);
    }
  
    return ReportDetail;
  
  }