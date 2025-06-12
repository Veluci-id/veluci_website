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

    // --- Validasi Formulir Kontak ---
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
        // Clear all previous errors first
        // Pastikan ID ini sesuai dengan atribut 'name' di HTML jika tidak ada ID eksplisit untuk input
        clearError('nama'); // Menggunakan 'nama' sebagai ID sementara untuk showError/clearError
        clearError('email'); // Menggunakan 'email' sebagai ID sementara untuk showError/clearError
        clearError('pesan'); // Menggunakan 'pesan' sebagai ID sementara untuk showError/clearError

        // Dapatkan input berdasarkan atribut NAME
        const nameInput = contactForm.querySelector('input[name="nama"]');
        const emailInput = contactForm.querySelector('input[name="email"]');
        const messageInput = contactForm.querySelector('textarea[name="pesan"]');

        let isValid = true;
        let errorMessage = [];

        if (nameInput.value.trim() === '') {
            showError(nameInput.id || 'nama', 'Nama tidak boleh kosong.'); // Gunakan ID atau nama sebagai fallback
            isValid = false;
        }

        if (emailInput.value.trim() === '') {
            showError(emailInput.id || 'email', 'Email tidak boleh kosong.');
            isValid = false;
        } else if (!isValidEmail(emailInput.value.trim())) {
            showError(emailInput.id || 'email', 'Format email tidak valid.');
            isValid = false;
        }

        if (messageInput.value.trim() === '') {
            showError(messageInput.id || 'pesan', 'Pesan tidak boleh kosong.');
            isValid = false;
        }

        if (!isValid) {
            event.preventDefault(); // Mencegah form dikirim jika ada error
            const firstErrorElement = document.querySelector('input.error, textarea.error, select.error');
            if (firstErrorElement) {
                firstErrorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        } else {
            // Jika valid, biarkan form terkirim secara normal ke Netlify.
            // Netlify akan menangani redirect ke halaman sukses yang kita atur.
            // Tidak perlu alert() sukses dari JS kita.
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