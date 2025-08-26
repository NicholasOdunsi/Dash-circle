
// Smooth scroll to newsletter on CTA click
document.addEventListener('DOMContentLoaded', function () {
    var joinCta = document.getElementById('join-cta');
    if (joinCta) {
        joinCta.addEventListener('click', function () {
            var newsletter = document.getElementById('newsletter');
            if (newsletter) {
                newsletter.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    }

    // Newsletter form handler with Google Sheets integration
    var form = document.getElementById('newsletter-form');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            var nameInput = document.getElementById('full-name');
            var emailInput = document.getElementById('email');
            var nameVal = nameInput ? nameInput.value.trim() : '';
            var emailVal = emailInput ? emailInput.value.trim() : '';
            var submitButton = form.querySelector('.submit-button');

            if (!emailVal) {
                alert('Please enter a valid email.');
                return;
            }

            // Disable submit button during submission
            submitButton.disabled = true;
            submitButton.textContent = 'Submitting...';

            // Replace YOUR_GOOGLE_APPS_SCRIPT_URL with the actual URL from your Google Apps Script deployment
            // Replace this URL with your NEW deployment URL after redeploying
            var scriptUrl = 'https://script.google.com/macros/s/AKfycbwkIjB_h6X4uIfGCBGZHXZqhbBwhID_N171FDy0LBrDP9wIpSWpF7xFA--G79zoGDGNtg/exec'
            // Try using JSONP approach to avoid CORS
            var script = document.createElement('script');
            var callbackName = 'callback_' + Date.now();
            
            // Create a global callback function
            window[callbackName] = function(response) {
                // Clean up
                document.head.removeChild(script);
                delete window[callbackName];
                
                if (response && response.success) {
                    alert('Thank you' + (nameVal ? ', ' + nameVal : '') + '! You\'re have become a member of the circle.');
                    form.reset();
                } else {
                    alert('There was an error submitting your information. Please try again.');
                }
                
                // Re-enable submit button
                submitButton.disabled = false;
                submitButton.textContent = 'Submit';
            };
            
            // Create the script URL with parameters
            var params = new URLSearchParams({
                name: nameVal,
                email: emailVal,
                callback: callbackName
            });
            
            script.src = scriptUrl + '?' + params.toString();
            script.onerror = function() {
                alert('There was an error submitting your information. Please try again.');
                submitButton.disabled = false;
                submitButton.textContent = 'Submit';
                document.head.removeChild(script);
                delete window[callbackName];
            };
            
            document.head.appendChild(script);
        });
    }

    // Smooth scrolling for header nav links with offset for fixed header
    var headerOffset = 90; // approximate header height
    var navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    if (navLinks.length) {
        navLinks.forEach(function (link) {
            link.addEventListener('click', function (e) {
                e.preventDefault();
                var targetId = link.getAttribute('href').slice(1);
                var targetEl = document.getElementById(targetId);
                if (!targetEl) return;
                var top = targetEl.getBoundingClientRect().top + window.scrollY - headerOffset;
                window.scrollTo({ top: top, behavior: 'smooth' });
            });
        });
    }

    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
});


