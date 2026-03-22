const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    posterUrl: {
        type: String,
        required: true
    },
    showtimes: [{
        date: {
            type: Date,
            required: true
        },
        time: {
            type: String,
            required: true
        }
    }]
});

module.exports = mongoose.model('Movie', movieSchema);