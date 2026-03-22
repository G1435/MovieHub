// This file contains JavaScript functions for fetching and displaying the list of movies. 
// It handles the movie details view.

document.addEventListener('DOMContentLoaded', () => {
    fetchMovies();
});

function fetchMovies() {
    fetch('/api/movies')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(movies => {
            displayMovies(movies);
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

function displayMovies(movies) {
    const moviesContainer = document.getElementById('movies-container');
    moviesContainer.innerHTML = '';

    movies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.className = 'movie-card';
        movieCard.innerHTML = `
            <img src="${movie.poster}" alt="${movie.title}" class="movie-poster">
            <h3>${movie.title}</h3>
            <p>${movie.description}</p>
            <a href="movie-details.html?id=${movie._id}" class="btn">View Details</a>
        `;
        moviesContainer.appendChild(movieCard);
    });
}