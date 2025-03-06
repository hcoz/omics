const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const GeneExpression = require('../models/GeneExpression');
const { calculateStats } = require('../utils/helpers');


// Gene expressions data endpoint
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
        geneId: {
          [Op.in]: geneIDs
        }
      }
    });

    // Handle non-existent genes
    const foundGenes = expressions.map(exp => exp.geneId);
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
      response.warning = `${missingGenes.join(', ')} gene${missingGenes.length > 1 ? 's were' : ' was'} not found in database`;
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

// Gene statistics endpoint
router.get('/stats/:geneId', async (req, res) => {
  try {
    const { geneId } = req.params;
    
    const gene = await GeneExpression.findOne({
      where: { geneId: geneId }
    });

    if (!gene) {
      return res.status(404).json({
        error: `Gene ${geneId} not found`
      });
    }

    // Get experimental and control values
    const experimentalValues = [
      gene.exper_rep1,
      gene.exper_rep2,
      gene.exper_rep3
    ].filter(val => val !== null);

    const controlValues = [
      gene.control_rep1,
      gene.control_rep2,
      gene.control_rep3
    ].filter(val => val !== null);

    // Calculate statistics
    const stats = {
      experimental: calculateStats(experimentalValues),
      control: calculateStats(controlValues),
      geneId: geneId,
      transcript: gene.transcript
    };

    res.json(stats);

  } catch (error) {
    console.error('Error calculating gene statistics:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

module.exports = router; 
