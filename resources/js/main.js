/* ===========================================
   main.js — Script unificado do site Gesteq
   =========================================== */

document.addEventListener('DOMContentLoaded', () => {

    // =========================================
    // Transição de Página (6 colunas)
    // =========================================
    if (!document.querySelector('.page-transition')) {
        const transitionHTML = `
            <div class="page-transition">
                <div class="transition-col"></div>
                <div class="transition-col"></div>
                <div class="transition-col"></div>
                <div class="transition-col"></div>
                <div class="transition-col"></div>
                <div class="transition-col"></div>
            </div>
        `;
        document.body.insertAdjacentHTML('afterbegin', transitionHTML);
    }

    const cols = document.querySelectorAll('.transition-col');

    // Animação de entrada — revela a página
    setTimeout(() => {
        cols.forEach((col, i) => {
            col.style.transformOrigin = 'bottom';
            setTimeout(() => { col.style.transform = 'scaleY(0)'; }, i * 100);
        });
    }, 100);

    // Animação de saída — cobre a página antes de navegar
    document.addEventListener('click', (e) => {
        const link = e.target.closest('a');
        if (!link) return;

        const href = link.getAttribute('href');
        const target = link.getAttribute('target');

        if (
            !href ||
            href.startsWith('#') ||
            target === '_blank' ||
            e.ctrlKey || e.metaKey || e.shiftKey ||
            href.startsWith('mailto:') ||
            href.startsWith('tel:') ||
            href.startsWith('javascript:')
        ) return;

        e.preventDefault();

        cols.forEach((col, i) => {
            col.style.transition = 'none';
            col.style.transformOrigin = 'top';
            col.style.transform = 'scaleY(0)';
            void col.offsetWidth; // reflow
            col.style.transition = 'transform 0.6s cubic-bezier(0.85, 0, 0.15, 1)';
            setTimeout(() => { col.style.transform = 'scaleY(1)'; }, i * 100);
        });

        const totalDelay = (cols.length - 1) * 100 + 600;
        setTimeout(() => { window.location.href = href; }, totalDelay);
    });

    // =========================================
    // Lenis — Smooth Scroll
    // =========================================
    if (typeof Lenis !== 'undefined') {
        new Lenis({ autoRaf: true });
    }

    // =========================================
    // Header — Injeção e Lógica
    // =========================================
    const headerContainer = document.getElementById('header-container');

    if (headerContainer) {
        headerContainer.innerHTML = `
        <header class="cabecalho">
            <div class="container nav-container">
                <a href="#inicio" aria-label="Ir para inicio" class="logo-link">
                    <img src="resources/assets/icons/logo-gesteq.svg" alt="Logo Gesteq">
                </a>
                <div class="nav-menu" id="nav-menu">
                    <ul class="nav-links">
                        <li><a href="#inicio">Início</a></li>
                        <li><a href="#sobre">Sobre Nós</a></li>
                        <li class="dropdown-container">
                            <a href="#metodologia" class="dropdown-toggle" id="btn-solucoes">Soluções <img src="resources/assets/icons/btn-menu.svg" alt="seta down"></a>
                            <ul class="dropdown-menu" id="dropdown-solucoes">
                                <li><a href="#">Gestão Estratégica com Foco nos Resultados</a></li>
                                <li><span></span></li>
                                <li><a href="#">Padronização dos Processos</a></li>
                                <li><span></span></li>
                                <li><a href="#">Desenvolvimento dos Líderes e Equipes</a></li>
                            </ul>
                        </li>
                        <li><a href="#blog">Blog</a></li>
                        <li><a href="#clientes">Clientes</a></li>
                        <li><a href="https://wa.me/5581997674255"><strong>Fale Conosco</strong></a></li>
                    </ul>
                    <div class="nav-cta">
                        <a href="https://gesteq.evolutto.com.br/" target="_blank" class="btn-cta">Área do Cliente</a>
                    </div>
                </div>
                <button id="btn-mobile" class="btn-mobile" aria-label="Abrir Menu">
                    <span class="hamburguer"></span>
                </button>
            </div>
        </header>`;

        // Efeito Scroll no Header
        window.addEventListener('scroll', () => {
            headerContainer.classList.toggle('scrolled', window.scrollY > 10);
        }, { passive: true });

        // Menu Mobile
        const btnMobile = document.getElementById('btn-mobile');
        const navMenu = document.getElementById('nav-menu');

        if (btnMobile && navMenu) {
            btnMobile.addEventListener('click', () => {
                navMenu.classList.toggle('ativo');
                btnMobile.classList.toggle('ativo');
            });

            // Fechar ao clicar nos links (exceto dropdown toggle)
            navMenu.addEventListener('click', (e) => {
                const link = e.target.closest('a');
                if (!link || link.id === 'btn-solucoes') return;
                navMenu.classList.remove('ativo');
                btnMobile.classList.remove('ativo');
            });

            // Dropdown de Soluções
            const btnSolucoes = document.getElementById('btn-solucoes');
            const dropdownSolucoes = document.getElementById('dropdown-solucoes');

            if (btnSolucoes && dropdownSolucoes) {
                btnSolucoes.addEventListener('click', (e) => {
                    e.preventDefault();
                    dropdownSolucoes.classList.toggle('ativo');
                    btnSolucoes.classList.toggle('ativo');
                });

                document.addEventListener('click', (e) => {
                    if (!btnSolucoes.contains(e.target) && !dropdownSolucoes.contains(e.target)) {
                        dropdownSolucoes.classList.remove('ativo');
                        btnSolucoes.classList.remove('ativo');
                    }
                });

                dropdownSolucoes.addEventListener('click', (e) => {
                    if (e.target.closest('a')) {
                        dropdownSolucoes.classList.remove('ativo');
                        btnSolucoes.classList.remove('ativo');
                    }
                });
            }
        }
    }

    // =========================================
    // Cards de Identidade Corporativa — Autoplay
    // =========================================
    const cardsIdentidade = document.querySelectorAll('.card-identidade');

    if (cardsIdentidade.length) {
        let currentIndex = 0;

        const activateCard = (index) => {
            if (index < 0 || index >= cardsIdentidade.length) return;
            cardsIdentidade.forEach(c => c.classList.remove('ativo'));
            cardsIdentidade[index].classList.add('ativo');
        };

        setInterval(() => {
            currentIndex = (currentIndex + 1) % cardsIdentidade.length;
            activateCard(currentIndex);
        }, 5000);
    }

    // =========================================
    // IntersectionObserver unificado
    // (Timeline items + Número items)
    // =========================================
    const timelineItems = document.querySelectorAll('.timeline-item');
    const numerosItems = document.querySelectorAll('.numero-item');

    if (timelineItems.length || numerosItems.length) {
        let contadoresAnimados = false;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('visivel');

                // Animar contadores uma única vez quando qualquer .numero-item fica visível
                if (!contadoresAnimados && entry.target.classList.contains('numero-item')) {
                    contadoresAnimados = true;
                    numerosItems.forEach(item => {
                        const valorEl = item.querySelector('.numero-valor');
                        if (valorEl) animarContador(valorEl);
                    });
                }
            });
        }, { threshold: 0.3 });

        timelineItems.forEach(item => observer.observe(item));
        numerosItems.forEach(item => observer.observe(item));
    }

    // Contadores animados
    function animarContador(el) {
        const target = parseInt(el.dataset.target, 10);
        const prefix = el.dataset.prefix || '';
        const duration = 1800;
        const startTime = performance.now();

        const update = (now) => {
            const progress = Math.min((now - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3); // ease-out cúbico
            el.textContent = prefix + Math.round(eased * target);
            if (progress < 1) requestAnimationFrame(update);
        };

        requestAnimationFrame(update);
    }

    // =========================================
    // Timeline — Linha de Preenchimento
    // =========================================
    const timeline = document.querySelector('.timeline');
    const timelineFill = document.querySelector('.timeline-preenchimento');

    if (timeline && timelineFill) {
        let ticking = false;

        window.addEventListener('scroll', () => {
            if (ticking) return;
            ticking = true;

            requestAnimationFrame(() => {
                const rect = timeline.getBoundingClientRect();
                const startAt = window.innerHeight * 0.75;
                let pct = (startAt - rect.top) / rect.height;
                pct = Math.max(0, Math.min(1, pct));
                timelineFill.style.height = `${pct * 90}%`;
                ticking = false;
            });
        }, { passive: true });
    }

    // =========================================
    // Clientes — Abas do Carrossel
    // =========================================
    const abasBtns = document.querySelectorAll('.clientes-aba');
    const paineis = document.querySelectorAll('.clientes-painel');

    if (abasBtns.length) {
        abasBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const alvo = btn.dataset.aba;

                abasBtns.forEach(b => {
                    b.classList.remove('ativa');
                    b.setAttribute('aria-selected', 'false');
                });
                btn.classList.add('ativa');
                btn.setAttribute('aria-selected', 'true');

                paineis.forEach(p => p.classList.remove('ativo'));
                const painelAlvo = document.querySelector(`.clientes-painel[data-painel="${alvo}"]`);
                if (painelAlvo) painelAlvo.classList.add('ativo');
            });
        });
    }

    // =========================================
    // Footer — Ano dinâmico
    // =========================================
    const anoEl = document.getElementById('footer-ano');
    if (anoEl) anoEl.textContent = new Date().getFullYear();

});
