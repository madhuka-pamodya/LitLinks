const balanceElement = document.getElementById('balance');
let balance = parseInt(localStorage.getItem('balance')) || 0;

// Function to update the displayed balance
function updateBalance() {
    balanceElement.textContent = `Balance: $${balance.toFixed(2)}`; // Show balance with 2 decimal points
}

// Function to show success message
function showSuccessMessage(message) {
    const messageBox = document.createElement('div');
    messageBox.classList.add('message', 'success');
    messageBox.textContent = message;
    document.body.appendChild(messageBox);
    setTimeout(() => messageBox.remove(), 3000); // Remove message after 3 seconds
}

// Function to show error message
function showErrorMessage(message) {
    const messageBox = document.createElement('div');
    messageBox.classList.add('message', 'error');
    messageBox.textContent = message;
    document.body.appendChild(messageBox);
    setTimeout(() => messageBox.remove(), 3000); // Remove message after 3 seconds
}

// Function to complete a task and reward the user
function completeTask(reward, taskUrl) {
    // Validate reward input
    if (isNaN(reward) || reward <= 0) {
        showErrorMessage('Invalid reward value.');
        return;
    }

    // Check if the task is already completed
    if (localStorage.getItem(taskUrl) === 'true') {
        showErrorMessage('You have already completed this task.');
        return;
    }

    // Update balance and save the task completion status
    balance += reward;
    updateBalance();
    localStorage.setItem(taskUrl, 'true');
    localStorage.setItem('balance', balance);

    // Open the task URL in a new tab
    window.open(taskUrl, '_blank');

    // Provide feedback to the user
    showSuccessMessage(`Task completed! You've earned $${reward.toFixed(2)}.`);
}

// Initialize balance display
updateBalance();
