const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { createTicket } = require('../controllers/ticketController');

// Genera y descarga un ticket en PDF. Requiere autenticación.
router.post('/', protect, createTicket);

module.exports = router;
