const express = require('express');
const router = express.Router();
const AvisoService = require('../services/AvisoService');
const { authenticateToken } = require('../middlewares/authMiddleware');

router.post('/create', authenticateToken, async (req, res) => {
    try {
        const avisoData = req.body;
        const result = await AvisoService.agregarAviso(avisoData);
        res.status(201).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear el aviso' });
    }
});

module.exports = router;