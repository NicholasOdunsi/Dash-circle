
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

    // Trivial, non-networking demo handler for newsletter form
    var form = document.getElementById('newsletter-form');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            var nameInput = document.getElementById('full-name');
            var emailInput = document.getElementById('email');
            var nameVal = nameInput ? nameInput.value.trim() : '';
            var emailVal = emailInput ? emailInput.value.trim() : '';

            if (!emailVal) {
                alert('Please enter a valid email.');
                return;
            }

            alert('Thank you' + (nameVal ? ', ' + nameVal : '') + '! You\'re on the list.');
            form.reset();
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


