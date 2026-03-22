const express = require('express');
const Booking = require('../models/Booking');
const { verifyToken } = require('../middleware/auth');

const router = express.Router();

// Create a new booking
router.post('/', verifyToken, async (req, res) => {
    const { movieId, seats, date, time } = req.body;
    const userId = req.user.id;

    try {
        const newBooking = new Booking({
            userId,
            movieId,
            seats,
            date,
            time
        });

        await newBooking.save();
        res.status(201).json({ message: 'Booking created successfully', booking: newBooking });
    } catch (error) {
        res.status(500).json({ message: 'Error creating booking', error });
    }
});

// Get all bookings for a user
router.get('/', verifyToken, async (req, res) => {
    const userId = req.user.id;

    try {
        const bookings = await Booking.find({ userId }).populate('movieId');
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching bookings', error });
    }
});

module.exports = router;