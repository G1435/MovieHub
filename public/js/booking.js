// This file contains JavaScript functions for managing the booking process, including seat selection and confirmation.

document.addEventListener('DOMContentLoaded', function() {
    const movieId = localStorage.getItem('selectedMovieId');
    const dateInput = document.getElementById('date');
    const timeInput = document.getElementById('time');
    const seatsContainer = document.getElementById('seats');
    const bookButton = document.getElementById('book-button');
    const totalPriceDisplay = document.getElementById('total-price');
    let selectedSeats = [];
    const seatPrice = 10; // Example price per seat

    // Fetch movie details and render seat selection
    fetch(`/api/movies/${movieId}`)
        .then(response => response.json())
        .then(movie => {
            document.getElementById('movie-title').innerText = movie.title;
            renderSeats(movie.bookedSeats);
        });

    // Render seats based on booked seats
    function renderSeats(bookedSeats) {
        for (let i = 1; i <= 20; i++) { // Assuming 20 seats
            const seat = document.createElement('div');
            seat.className = 'seat';
            seat.innerText = i;
            seat.onclick = () => toggleSeatSelection(i);
            if (bookedSeats.includes(i)) {
                seat.classList.add('booked');
                seat.onclick = null; // Disable click for booked seats
            }
            seatsContainer.appendChild(seat);
        }
    }

    // Toggle seat selection
    function toggleSeatSelection(seatNumber) {
        if (selectedSeats.includes(seatNumber)) {
            selectedSeats = selectedSeats.filter(seat => seat !== seatNumber);
        } else {
            selectedSeats.push(seatNumber);
        }
        updateTotalPrice();
        highlightSelectedSeats();
    }

    // Update total price based on selected seats
    function updateTotalPrice() {
        totalPriceDisplay.innerText = `Total Price: $${selectedSeats.length * seatPrice}`;
    }

    // Highlight selected seats
    function highlightSelectedSeats() {
        const seats = document.querySelectorAll('.seat');
        seats.forEach(seat => {
            if (selectedSeats.includes(parseInt(seat.innerText))) {
                seat.classList.toggle('selected', true);
            } else {
                seat.classList.toggle('selected', false);
            }
        });
    }

    // Book tickets
    bookButton.onclick = function() {
        const bookingData = {
            userId: localStorage.getItem('userId'),
            movieId: movieId,
            seats: selectedSeats,
            date: dateInput.value,
            time: timeInput.value
        };

        fetch('/api/bookings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bookingData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Booking confirmed!');
                window.location.href = 'confirmation.html';
            } else {
                alert('Error: ' + data.message);
            }
        });
    };
});