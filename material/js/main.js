const body = document.body;
const image = body.querySelector('#coin');
const h1 = body.querySelector('h1');
const totalElement = body.querySelector('#total');
const powerElement = body.querySelector('#power');
const progressBar = body.querySelector('.progress');

// Get values from localStorage with default values
const getStoredValue = (key, defaultValue) => {
    let value = localStorage.getItem(key);
    if (value === null) {
        localStorage.setItem(key, defaultValue);
        return defaultValue;
    }
    return Number(value);
};

// Set text content of an element with a value
const setTextContent = (element, value) => {
    element.textContent = value;
};

// Get and update the 'coins', 'total', 'power', and 'count'
let coins = getStoredValue('coins', 0);
let total = getStoredValue('total', 500);
let power = getStoredValue('power', 500);
let count = getStoredValue('count', 1);

// Initial display updates
setTextContent(h1, coins.toLocaleString());
setTextContent(totalElement, `/${total}`);
setTextContent(powerElement, power);

// Handle click on the coin image
image.addEventListener('click', (e) => {
    let x = e.offsetX;
    let y = e.offsetY;

    navigator.vibrate(5);

    // Get current coin and power values from localStorage
    coins = getStoredValue('coins', 0);
    power = getStoredValue('power', 500);

    // Handle the coin collection logic based on power
    if (power > 0) {
        coins += 1;
        localStorage.setItem('coins', coins);
        setTextContent(h1, coins.toLocaleString());

        power -= 1;
        localStorage.setItem('power', power);
        setTextContent(powerElement, power);

        // Provide visual feedback when coins are collected
        animateCoinCollection(x, y);
    }

    // Update progress bar
    progressBar.style.width = `${(100 * power) / total}%`;
});

// Function to animate the coin collection based on click position
function animateCoinCollection(x, y) {
    if (x < 150 && y < 150) {
        image.style.transform = 'translate(-0.25rem, -0.25rem) skewY(-10deg) skewX(5deg)';
    } else if (x < 150 && y > 150) {
        image.style.transform = 'translate(-0.25rem, 0.25rem) skewY(-10deg) skewX(5deg)';
    } else if (x > 150 && y > 150) {
        image.style.transform = 'translate(0.25rem, 0.25rem) skewY(10deg) skewX(-5deg)';
    } else if (x > 150 && y < 150) {
        image.style.transform = 'translate(0.25rem, -0.25rem) skewY(10deg) skewX(-5deg)';
    }

    // Reset transform after animation
    setTimeout(() => {
        image.style.transform = 'translate(0px, 0px)';
    }, 100);
}

// Auto-increment power based on count every second
setInterval(() => {
    count = getStoredValue('count', 1);
    power = getStoredValue('power', 500);

    // Increment power over time, if needed
    if (total > power) {
        power += count;
        localStorage.setItem('power', power);
        setTextContent(powerElement, power);

        // Update progress bar based on current power
        progressBar.style.width = `${(100 * power) / total}%`;
    }
}, 1000);
