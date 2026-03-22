// utils.js
function showAlert(message, type) {
    const alertBox = document.createElement('div');
    alertBox.className = `alert alert-${type}`;
    alertBox.innerText = message;
    document.body.appendChild(alertBox);
    setTimeout(() => {
        alertBox.remove();
    }, 3000);
}

function setLoginState(isLoggedIn) {
    localStorage.setItem('isLoggedIn', isLoggedIn);
}

function getLoginState() {
    return localStorage.getItem('isLoggedIn') === 'true';
}

function clearLoginState() {
    localStorage.removeItem('isLoggedIn');
}

function formatDate(date) {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(date).toLocaleDateString(undefined, options);
}

function formatTime(date) {
    const options = { hour: '2-digit', minute: '2-digit' };
    return new Date(date).toLocaleTimeString(undefined, options);
}

export { showAlert, setLoginState, getLoginState, clearLoginState, formatDate, formatTime };