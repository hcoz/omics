const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const GeneExpression = require('../models/GeneExpression');

router.get('/expression', async (req, res) => {
  try {
    const { geneIDs } = req.query;
    
    // Input validation
    if (!geneIDs) {
      return res.status(400).json({ 
        error: 'Missing required field: geneIDs' 
      });
    }

    if (!Array.isArray(geneIDs)) {
      return res.status(400).json({ 
        error: 'geneIDs must be an array' 
      });
    }

    if (geneIDs.length === 0) {
      return res.status(400).json({ 
        error: 'geneIDs array cannot be empty' 
      });
    }

    // Query database
    const expressions = await GeneExpression.findAll({
      where: {
        gene: {
          [Op.in]: geneIDs
        }
      }
    });

    // Handle non-existent genes
    const foundGenes = expressions.map(exp => exp.gene);
    const missingGenes = geneIDs.filter(id => !foundGenes.includes(id));

    // Prepare response
    const response = {
      data: expressions,
      metadata: {
        totalRequested: geneIDs.length,
        found: expressions.length,
        missing: missingGenes
      }
    };

    if (missingGenes.length > 0) {
      response.warning = `${missingGenes.join(', ')} gene${missingGenes.length > 1 ? 's' : ''} not found in database`;
    }

    res.json(response);

  } catch (error) {
    console.error('Error fetching gene expressions:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

module.exports = router; 
