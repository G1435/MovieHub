const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');

// GET /api/movies - Fetch all movies
router.get('/', async (req, res) => {
    try {
        const movies = await Movie.find();
        res.json(movies);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// GET /api/movies/:id - Fetch movie details by ID
router.get('/:id', async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }
        res.json(movie);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;