const axios = require('axios');

// API base URL - using localhost since this will run in the same environment
const API_BASE_URL = 'http://localhost:3000';

// Test timeout - 10 seconds should be enough for our local API
const TEST_TIMEOUT = 10000;

describe('CardKey API Tests', () => {
  // Test 1: Health check endpoint
  test('should return health check status', async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/health`, {
        timeout: TEST_TIMEOUT
      });
      
      expect(response.status).toBe(200);
      expect(response.data.status).toBe('OK');
    } catch (error) {
      console.error('Health check test failed:', error.message);
      throw error;
    }
  }, TEST_TIMEOUT);

  // Test 2: Generate a new card key
  test('should generate a new card key', async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/cards/generate`, {}, {
        timeout: TEST_TIMEOUT
      });
      
      expect(response.status).toBe(201);
      expect(response.data).toHaveProperty('card_code');
      expect(response.data).toHaveProperty('generated_date');
      expect(response.data).toHaveProperty('is_used');
      
      // Verify card code format (26 uppercase letters + date)
      const cardCode = response.data.card_code;
      expect(cardCode).toMatch(/^[A-Z]{26}-\d{4}-\d{2}-\d{2}$/);
    } catch (error) {
      console.error('Generate card test failed:', error.message);
      throw error;
    }
  }, TEST_TIMEOUT);

  // Test 3: Get all cards
  test('should retrieve all cards', async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/cards`, {
        timeout: TEST_TIMEOUT
      });
      
      expect(response.status).toBe(200);
      expect(Array.isArray(response.data.cards)).toBe(true);
    } catch (error) {
      console.error('Get all cards test failed:', error.message);
      throw error;
    }
  }, TEST_TIMEOUT);

  // Test 4: Get specific card by code
  test('should retrieve a specific card by code', async () => {
    try {
      // First generate a card to ensure we have one to query
      const genResponse = await axios.post(`${API_BASE_URL}/api/cards/generate`, {}, {
        timeout: TEST_TIMEOUT
      });
      
      const cardCode = genResponse.data.card_code;
      
      // Now query for that specific card
      const response = await axios.get(`${API_BASE_URL}/api/cards/${cardCode}`, {
        timeout: TEST_TIMEOUT
      });
      
      expect(response.status).toBe(200);
      expect(response.data.card_code).toBe(cardCode);
    } catch (error) {
      console.error('Get specific card test failed:', error.message);
      throw error;
    }
  }, TEST_TIMEOUT);
});
