document.getElementById('copyButton').addEventListener('click', function() {
  var copyText = document.getElementById('link');
  var statusMessage = document.getElementById('statusMessage');  // For displaying success/failure message
  var tooltip = document.querySelector('.tooltip');  // Tooltip to show copied feedback

  // Use the Clipboard API for modern browsers
  if (navigator.clipboard) {
      navigator.clipboard.writeText(copyText.value).then(function() {
          // Success feedback
          statusMessage.textContent = "Link copied to clipboard!";
          statusMessage.style.color = 'green';

          // Show tooltip with copied message
          tooltip.textContent = "Copied!";
          tooltip.style.visibility = 'visible';
          tooltip.style.opacity = '1';
          
          // Hide status message and tooltip after 2 seconds
          setTimeout(function() {
              statusMessage.textContent = '';
              tooltip.style.visibility = 'hidden';
              tooltip.style.opacity = '0';
          }, 2000);

      }).catch(function(err) {
          // Handle error if copy fails
          statusMessage.textContent = "Failed to copy. Please try again.";
          statusMessage.style.color = 'red';
      });
  } else {
      // Fallback for older browsers
      copyText.select();
      copyText.setSelectionRange(0, 99999); // For mobile devices

      try {
          var successful = document.execCommand('copy');
          if (successful) {
              statusMessage.textContent = "Link copied to clipboard!";
              statusMessage.style.color = 'green';
          } else {
              throw new Error('Copy failed');
          }
      } catch (err) {
          statusMessage.textContent = "Failed to copy. Please try again.";
          statusMessage.style.color = 'red';
      }

      // Clear status message after 2 seconds
      setTimeout(function() {
          statusMessage.textContent = '';
      }, 2000);
  }
});
