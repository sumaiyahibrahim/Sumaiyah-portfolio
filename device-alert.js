// Device Alert Script
document.addEventListener('DOMContentLoaded', function() {
    // Force clear any previous localStorage setting for testing
    // localStorage.removeItem('deviceAlertDismissed');
    
    // Check if the user is on a mobile or tablet device
    function isMobileOrTablet() {
        return window.innerWidth < 992;
    }
    
    // Check if the user has already dismissed the alert
    function hasUserDismissedAlert() {
        return localStorage.getItem('deviceAlertDismissed') === 'true';
    }
    
    // Create the device alert
    function createDeviceAlert() {
        // Create alert elements
        const alertDiv = document.createElement('div');
        alertDiv.className = 'device-alert';
        alertDiv.id = 'deviceAlert';
        
        const alertContent = document.createElement('div');
        alertContent.className = 'device-alert-content';
        
        const alertIcon = document.createElement('div');
        alertIcon.className = 'device-alert-icon';
        alertIcon.innerHTML = '<i class="fas fa-laptop"></i>';
        
        const alertMessage = document.createElement('div');
        alertMessage.className = 'device-alert-message';
        alertMessage.textContent = 'For the best experience viewing this portfolio, please use a desktop or laptop computer. Some interactive elements may work better on larger screens.';
        
        const alertButtons = document.createElement('div');
        alertButtons.className = 'device-alert-buttons';
        
        const continueButton = document.createElement('button');
        continueButton.className = 'device-alert-continue';
        continueButton.textContent = 'Continue Anyway';
        
        const dismissButton = document.createElement('button');
        dismissButton.className = 'device-alert-dismiss';
        dismissButton.textContent = "Don't Show Again";
        
        // Assemble the alert
        alertButtons.appendChild(continueButton);
        alertButtons.appendChild(dismissButton);
        
        alertContent.appendChild(alertIcon);
        alertContent.appendChild(alertMessage);
        alertContent.appendChild(alertButtons);
        
        alertDiv.appendChild(alertContent);
        
        // Add the alert to the document
        document.body.appendChild(alertDiv);
        
        // Add event listeners
        continueButton.addEventListener('click', function() {
            hideAlert(alertDiv);
        });
        
        dismissButton.addEventListener('click', function() {
            localStorage.setItem('deviceAlertDismissed', 'true');
            hideAlert(alertDiv);
        });
        
        return alertDiv;
    }
    
    // Show the device alert
    function showDeviceAlert() {
        if (isMobileOrTablet() && !hasUserDismissedAlert()) {
            // Check if alert already exists
            let alertDiv = document.getElementById('deviceAlert');
            
            // If it doesn't exist, create it
            if (!alertDiv) {
                alertDiv = createDeviceAlert();
            }
            
            // Show the alert immediately
            alertDiv.style.display = 'block';
        }
    }
    
    // Hide the alert with animation
    function hideAlert(alertDiv) {
        alertDiv.style.opacity = '0';
        alertDiv.style.transform = 'translate(-50%, 20px)';
        alertDiv.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        
        setTimeout(function() {
            alertDiv.remove();
        }, 300);
    }
    
    // Initialize the alert with a slight delay to ensure DOM is fully loaded
    setTimeout(function() {
        showDeviceAlert();
    }, 500);
    
    // Also check on resize (in case of orientation change or window resizing)
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            showDeviceAlert();
        }, 250);
    });
});
