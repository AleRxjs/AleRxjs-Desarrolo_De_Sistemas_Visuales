import express from 'express';

const router = express.Router();

// Ejemplo de ruta
router.get('/items', (req, res) => {
  res.json({ message: 'Items route', items: [] });
});

router.post('/items', (req, res) => {
  res.status(201).json({ message: 'Item created', data: req.body });
});

export default router;
