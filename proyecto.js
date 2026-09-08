document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // 1. NAVEGACIÓN SPA
    // ==========================================
    const pages = document.querySelectorAll('.page');
    const navLinks = document.querySelectorAll('.nav-links a[data-page]');
    const pageButtons = document.querySelectorAll('[data-page]');

    function showPage(pageId) {
        pages.forEach(page => page.classList.remove('active'));

        const targetPage = document.getElementById(pageId);
        if (targetPage) {
            targetPage.classList.add('active');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-page') === pageId) {
                link.classList.add('active');
            }
        });

        if (window.innerWidth <= 1024) {
            closeMenu();
        }
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            showPage(link.getAttribute('data-page'));
        });
    });

    pageButtons.forEach(btn => {
        if (!btn.classList.contains('nav-links')) {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                showPage(btn.getAttribute('data-page'));
            });
        }
    });

    // ==========================================
    // 2. MENÚ MÓVIL
    // ==========================================
    const mobileBtn = document.getElementById('mobileMenuBtn');
    const closeMenuBtn = document.getElementById('closeMenuBtn');
    const sidebar = document.querySelector('.sidebar');
    const mobileLogo = document.getElementById('mobileLogo');

    function openMenu() {
        sidebar.classList.add('active');
        document.body.style.overflow = 'hidden';
        if (mobileLogo) mobileLogo.style.display = 'none';
    }

    function closeMenu() {
        sidebar.classList.remove('active');
        document.body.style.overflow = '';
        if (window.innerWidth <= 1024 && mobileLogo) {
            setTimeout(() => { mobileLogo.style.display = 'block'; }, 300);
        }
    }

    mobileBtn.addEventListener('click', openMenu);
    closeMenuBtn.addEventListener('click', closeMenu);

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 1024) {
                closeMenu();
            }
        });
    });

    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 1024 &&
            sidebar.classList.contains('active') &&
            !sidebar.contains(e.target) &&
            !mobileBtn.contains(e.target)) {
            closeMenu();
        }
    });

    // ==========================================
    // 3. MODO OSCURO
    // ==========================================
    const themeToggle = document.getElementById('themeToggle');

    function updateThemeIcon(theme) {
        const icon = theme === 'dark' ? 'fa-sun' : 'fa-moon';
        if (themeToggle) themeToggle.querySelector('i').className = `fa-solid ${icon}`;
    }

    const savedTheme = localStorage.getItem('fesatech-theme') || 'light';
    document.body.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    function toggleTheme() {
        const current = document.body.getAttribute('data-theme');
        const newTheme = current === 'dark' ? 'light' : 'dark';
        document.body.setAttribute('data-theme', newTheme);
        localStorage.setItem('fesatech-theme', newTheme);
        updateThemeIcon(newTheme);
    }

    if (themeToggle) themeToggle.addEventListener('click', toggleTheme);

    // ==========================================
    // 4. ANIMACIÓN DE ESCRITURA (TYPING EFFECT)
    // ==========================================
    const typingTextEl = document.getElementById('typing-text');
    if (typingTextEl) {
        const phrases = [
            "para vender tus casas modulares 24/7",
            "para filtrar y calificar a cada cliente",
            "para que ningún lead se enfríe en el chat",
            "para convertir tu WhatsApp en ventas"
        ];
        let phraseIdx = 0;
        let charIdx = 0;
        let isDeleting = false;
        let typingSpeed = 80;

        function type() {
            const currentPhrase = phrases[phraseIdx];
            if (isDeleting) {
                typingTextEl.textContent = currentPhrase.substring(0, charIdx - 1);
                charIdx--;
                typingSpeed = 40;
            } else {
                typingTextEl.textContent = currentPhrase.substring(0, charIdx + 1);
                charIdx++;
                typingSpeed = 80;
            }

            if (!isDeleting && charIdx === currentPhrase.length) {
                isDeleting = true;
                typingSpeed = 2000; // Pausa de 2 segundos al completar la frase
            } else if (isDeleting && charIdx === 0) {
                isDeleting = false;
                phraseIdx = (phraseIdx + 1) % phrases.length;
                typingSpeed = 500; // Pausa de 0.5 segundos antes de comenzar la nueva
            }

            setTimeout(type, typingSpeed);
        }
        setTimeout(type, 1000);
    }
});

// ==========================================
// FORZAR SCROLL AL TOPE
// ==========================================
window.addEventListener('load', () => {
    window.scrollTo(0, 0);
});

if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}
