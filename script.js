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
            // Bersihkan semua error sebelumnya
            clearError('nama');
            clearError('email');
            clearError('pesan');

            // Dapatkan input berdasarkan atribut NAME
            const nameInput = contactForm.querySelector('input[name="nama"]');
            const emailInput = contactForm.querySelector('input[name="email"]');
            const messageInput = contactForm.querySelector('textarea[name="pesan"]');

            let isValid = true;
            let errorMessage = [];

            if (nameInput.value.trim() === '') {
                showError('nama', 'Nama tidak boleh kosong.');
                isValid = false;
            }

            if (emailInput.value.trim() === '') {
                showError('email', 'Email tidak boleh kosong.');
                isValid = false;
            } else if (!isValidEmail(emailInput.value.trim())) {
                showError('email', 'Format email tidak valid.');
                isValid = false;
            }

            if (messageInput.value.trim() === '') {
                showError('pesan', 'Pesan tidak boleh kosong.');
                isValid = false;
            }

            if (!isValid) {
                event.preventDefault(); // Mencegah form dikirim jika ada error
                const firstErrorElement = document.querySelector('.error');
                if (firstErrorElement) {
                    firstErrorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            } else {
                // Jika valid, biarkan form terkirim secara normal ke Netlify.
                // Netlify akan menangkap ini.
                // Kita tidak perlu event.preventDefault() di sini,
                // dan juga tidak perlu contactForm.submit() manual setelah validasi sukses.
                // Cukup biarkan event terjadi secara alami.

                // Untuk memastikan Netlify mendeteksinya dengan sempurna,
                // kita akan membiarkan action default terjadi, dan kemudian Netlify akan menangani.
                // Opsional: Tampilkan alert sukses dan reset setelah Netlify selesai memproses.
                // Namun untuk debugging, kita akan tampilkan alert setelah ini.

                // Penting: Pastikan tidak ada alert() atau reset() yang mengganggu redirect Netlify.
                // Netlify akan secara otomatis me-redirect ke halaman sukses.
                // Jika Anda ingin pesan sukses kustom, Netlify punya fitur "Success message"
                // atau redirect ke halaman "Thank You" yang bisa kita buat.
                // Untuk saat ini, kita hapus alert() dan reset() di sini agar Netlify bekerja mulus.
                // Setelah form terkirim ke Netlify, Netlify akan menangani redirect ke halaman suksesnya.
                // Jadi tidak perlu alert lagi di JS ini.
                // Untuk debugging sementara, kita bisa tambahkan ini, tapi ini harusnya di handle oleh Netlify:
                // alert('Pesan Anda berhasil dikirim! Netlify akan memprosesnya.');
                // contactForm.reset();
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