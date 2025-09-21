const express = require('express');
const router = express.Router();
const db = require('../database');
const { generateCardKey } = require('../cardGenerator');

// Generate a new card
router.post('/generate', (req, res) => {
  const cardCode = generateCardKey();
  const generatedDate = cardCode.split('-').slice(-3).join('-'); // Extract date from card code
  
  const query = 'INSERT INTO cards (card_code, generated_date) VALUES (?, ?)';
  db.query(query, [cardCode, generatedDate], (err, result) => {
    if (err) {
      console.error('Error inserting card:', err);
      return res.status(500).json({ error: 'Failed to generate card' });
    }
    
    res.status(201).json({
      message: 'Card generated successfully',
      card: {
        id: result.insertId,
        card_code: cardCode,
        generated_date: generatedDate
      }
    });
  });
});

// Get all cards with pagination
router.get('/', (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;
  
  const countQuery = 'SELECT COUNT(*) as total FROM cards';
  db.query(countQuery, (err, countResult) => {
    if (err) {
      console.error('Error counting cards:', err);
      return res.status(500).json({ error: 'Failed to retrieve cards' });
    }
    
    const total = countResult[0].total;
    const totalPages = Math.ceil(total / limit);
    
    const query = 'SELECT * FROM cards ORDER BY created_at DESC LIMIT ? OFFSET ?';
    db.query(query, [limit, offset], (err, results) => {
      if (err) {
        console.error('Error retrieving cards:', err);
        return res.status(500).json({ error: 'Failed to retrieve cards' });
      }
      
      res.json({
        cards: results,
        pagination: {
          page,
          limit,
          total,
          totalPages,
          hasNext: page < totalPages,
          hasPrev: page > 1
        }
      });
    });
  });
});

// Get a specific card by code
router.get('/:code', (req, res) => {
  const { code } = req.params;
  
  const query = 'SELECT * FROM cards WHERE card_code = ?';
  db.query(query, [code], (err, results) => {
    if (err) {
      console.error('Error retrieving card:', err);
      return res.status(500).json({ error: 'Failed to retrieve card' });
    }
    
    if (results.length === 0) {
      return res.status(404).json({ error: 'Card not found' });
    }
    
    res.json({ card: results[0] });
  });
});

module.exports = router;
