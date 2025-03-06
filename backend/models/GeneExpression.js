const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const GeneExpression = sequelize.define('GeneExpression', {
  geneId: {
    type: DataTypes.TEXT,
    primaryKey: true,
    allowNull: false
  },
  transcript: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  exper_rep1: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  exper_rep2: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  exper_rep3: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  control_rep1: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  control_rep2: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  control_rep3: {
    type: DataTypes.FLOAT,
    allowNull: true
  }
}, {
  tableName: 'gene_expressions',
  timestamps: false
});

module.exports = GeneExpression; 
