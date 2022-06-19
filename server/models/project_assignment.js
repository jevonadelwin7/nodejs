const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('project_assignment', {
    pras_proj_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    pras_employee_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    pras_startdate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    pras_enddate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    pras_status: {
      type: DataTypes.STRING(15),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'project_assignment',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "project_assignment_pk",
        unique: true,
        fields: [
          { name: "pras_proj_id" },
          { name: "pras_employee_id" },
        ]
      },
    ]
  });
};
