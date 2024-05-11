function toggleTheme() {
    const body = document.body;
    const isLightTheme = body.classList.toggle("light-theme");

    // Update the theme in local storage based on the toggle
    localStorage.setItem('theme', isLightTheme ? 'light' : 'dark');

    applyTheme(); // Apply the current theme settings
}

function applyTheme() {
    const body = document.body;
    const currentTheme = localStorage.getItem('theme') || 'dark'; // Use local storage or default to 'dark'
    const isLightTheme = currentTheme === 'light';

    // Define the themes
    const lightTheme = {
        backgroundColor: '#FFF', // Light background for the body
        textColor: '#333', // Dark text for better readability on light background
        linkColor: '#1a237e', // Deep blue for links
        buttonBackgroundColor: '#e8eaf6' // Light grey for button background
    };

    const darkTheme = {
        backgroundColor: '#121212',
        textColor: '#e0e0e0',
        linkColor: '#9fa8da',
        buttonBackgroundColor: '#616161'
    };

    // Apply the current theme based on whether 'light-theme' is active
    const theme = isLightTheme ? lightTheme : darkTheme;
    body.style.backgroundColor = theme.backgroundColor;
    body.style.color = theme.textColor;
    document.querySelectorAll('a').forEach(link => {
        link.style.color = theme.linkColor;
    });
    document.querySelector('button').style.backgroundColor = theme.buttonBackgroundColor;
}

// Ensure the theme is applied on page load
document.addEventListener('DOMContentLoaded', () => {
    // If there's a theme set in local storage, apply it
    if (localStorage.getItem('theme')) {
        applyTheme();
    }
});


