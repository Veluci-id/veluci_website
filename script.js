document.addEventListener('DOMContentLoaded', function() {
    // --- 1. Fungsionalitas Hamburger Menu ---
    const menuToggle = document.getElementById('mobile-menu');
    const mainNav = document.getElementById('main-nav');

    if (menuToggle && mainNav) { // Pastikan elemen ditemukan
        menuToggle.addEventListener('click', function() {
            menuToggle.classList.toggle('is-active');
            mainNav.classList.toggle('is-active');
            // Optional: Mencegah scrolling saat menu aktif
            document.body.classList.toggle('no-scroll');
        });

        // Menutup menu jika item diklik (untuk single-page navigation)
        const navLinks = mainNav.querySelectorAll('ul li a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (menuToggle.classList.contains('is-active')) {
                    menuToggle.classList.remove('is-active');
                    mainNav.classList.remove('is-active');
                    document.body.classList.remove('no-scroll');
                }
            });
        });
    }

    // --- 2. Validasi Formulir Kontak ---
    const contactForm = document.querySelector('.contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const nameInput = contactForm.querySelector('input[type="text"]');
            const emailInput = contactForm.querySelector('input[type="email"]');
            const messageInput = contactForm.querySelector('textarea');

            let isValid = true;
            let errorMessage = [];

            if (nameInput.value.trim() === '') {
                isValid = false;
                errorMessage.push('Nama tidak boleh kosong.');
            }

            if (emailInput.value.trim() === '') {
                isValid = false;
                errorMessage.push('Email tidak boleh kosong.');
            } else if (!isValidEmail(emailInput.value.trim())) {
                isValid = false;
                errorMessage.push('Format email tidak valid.');
            }

            if (messageInput.value.trim() === '') {
                isValid = false;
                errorMessage.push('Pesan tidak boleh kosong.');
            }

            if (!isValid) {
                alert('Kesalahan formulir:\n' + errorMessage.join('\n'));
            } else {
                alert('Pesan Anda berhasil dikirim! Kami akan segera menghubungi Anda.');
                contactForm.reset();
            }
        });
    }

    function isValidEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    // --- 3. Efek Scroll Reveal ---
    const revealElements = document.querySelectorAll('.reveal-on-scroll');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-revealed');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElements.forEach(element => {
        observer.observe(element);
    });
});