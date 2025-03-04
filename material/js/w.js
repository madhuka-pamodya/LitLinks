// Modal and button elements
const openModalBtn = document.getElementById('openModalBtn');
const walletModal = document.getElementById('walletModal');
const closeBtn = document.querySelector('.close-btn');
const connectWalletBtn = document.getElementById('connectWallet');
const cancelWalletBtn = document.getElementById('cancelWallet');
const statusMessage = document.getElementById('statusMessage');
const spinner = document.getElementById('spinner'); // Assuming there's a spinner for loading

// Open Modal - Show the modal with a smooth transition
function openModal() {
    walletModal.classList.add('show');  // Add a class to show the modal
    setTimeout(() => {
        walletModal.style.display = 'flex';
    }, 100);  // Adding delay for transition effect
}

// Close Modal - Hide the modal smoothly
function closeModal() {
    walletModal.classList.remove('show');  // Trigger the closing transition
    setTimeout(() => {
        walletModal.style.display = 'none';
    }, 300);  // Delay to allow transition
}

// Add event listeners
openModalBtn.addEventListener('click', openModal);

closeBtn.addEventListener('click', closeModal);

// Close modal if user clicks outside of the modal content area
window.addEventListener('click', (event) => {
    if (event.target === walletModal) {
        closeModal();
    }
});

// Connect Wallet - Simulate the connection process
connectWalletBtn.addEventListener('click', () => {
    if (walletModal.classList.contains('connecting')) {
        return; // Prevent multiple connection attempts
    }

    // Indicate that the process is starting
    walletModal.classList.add('connecting');
    statusMessage.textContent = 'Connecting to your TON wallet...';
    spinner.style.display = 'block';  // Show the spinner

    // Simulate a connection attempt (you can replace this with actual logic)
    setTimeout(() => {
        const connectionSuccess = Math.random() > 0.5; // Simulate success or failure

        if (connectionSuccess) {
            statusMessage.textContent = 'Successfully connected to your TON wallet!';
            statusMessage.style.color = 'green';  // Success message styling
            spinner.style.display = 'none';  // Hide spinner
            walletModal.classList.remove('connecting');
        } else {
            statusMessage.textContent = 'Oops, something went wrong. Please try again.';
            statusMessage.style.color = 'red';  // Error message styling
            spinner.style.display = 'none';  // Hide spinner
            walletModal.classList.remove('connecting');
        }
    }, 2000);  // Simulate a 2-second delay for the connection attempt
});

// Cancel Wallet - Close the modal without doing anything
cancelWalletBtn.addEventListener('click', () => {
    closeModal();
    statusMessage.textContent = '';
    spinner.style.display = 'none';  // Hide the spinner if canceled
});

// CSS transitions
/*
  .modal {
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  .modal.show {
    opacity: 1;
  }

  .connecting {
    pointer-events: none;  // Disable interactions while connecting
  }

  #spinner {
    display: none;
  }
*/
