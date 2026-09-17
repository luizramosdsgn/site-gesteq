/* ===========================================
   main.js — Script unificado do site Gesteq
   =========================================== */

document.addEventListener('DOMContentLoaded', () => {

    // =========================================
    // Base Path — Detecta profundidade da página
    // =========================================
    const depth = (window.location.pathname.replace(/\/[^/]*$/, '').match(/\//g) || []).length;
    const basePath = depth <= 1 ? '' : '../'.repeat(depth - 1);
    const homeHref = basePath ? basePath + 'index.html' : '#inicio';
    const isHome = !basePath;

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
        const inicioHref = isHome ? '#inicio' : homeHref;
        const sobreHref = isHome ? '#sobre' : homeHref + '#sobre';
        const metodoHref = isHome ? '#metodologia' : homeHref + '#metodologia';
        const blogHref = isHome ? '#blog' : homeHref + '#blog';
        const clientesHref = isHome ? '#clientes' : homeHref + '#clientes';

        headerContainer.innerHTML = `
        <header class="cabecalho">
            <div class="container nav-container">
                <a href="${inicioHref}" aria-label="Ir para inicio" class="logo-link">
                    <img src="${basePath}resources/assets/icons/logo-gesteq.svg" alt="Logo Gesteq">
                </a>
                <div class="nav-menu" id="nav-menu">
                    <ul class="nav-links">
                        <li><a href="${inicioHref}">Início</a></li>
                        <li><a href="${sobreHref}">Sobre Nós</a></li>
                        <li class="dropdown-container">
                            <a href="${metodoHref}" class="dropdown-toggle" id="btn-solucoes">Soluções <img src="${basePath}resources/assets/icons/btn-menu.svg" alt="seta down"></a>
                            <ul class="dropdown-menu" id="dropdown-solucoes">
                                <li><a href="${basePath}solucoes/gestao-estrategica.html">Gestão Estratégica com Foco nos Resultados</a></li>
                                <li><span></span></li>
                                <li><a href="#">Padronização dos Processos</a></li>
                                <li><span></span></li>
                                <li><a href="#">Desenvolvimento dos Líderes e Equipes</a></li>
                            </ul>
                        </li>
                        <li><a href="${blogHref}">Blog</a></li>
                        <li><a href="${clientesHref}">Clientes</a></li>
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
    // Footer — Injeção via JS
    // =========================================
    const footerContainer = document.getElementById('footer-container');

    if (footerContainer) {
        const inicioFooter = isHome ? '#inicio' : homeHref;
        const sobreFooter = isHome ? '#sobre' : homeHref + '#sobre';
        const blogFooter = isHome ? '#blog' : homeHref + '#blog';
        const clientesFooter = isHome ? '#clientes' : homeHref + '#clientes';

        footerContainer.innerHTML = `
    <footer class="footer" id="footer">
      <div class="container footer-conteudo">
        <!-- Coluna 1: Logo + Descrição + Redes -->
        <div class="footer-col footer-marca">
          <a
            href="${inicioFooter}"
            class="footer-logo-link"
            aria-label="Ir para o início"
          >
            <img
              src="${basePath}resources/assets/icons/logo-gesteq-branco.svg"
              alt="Logo Gesteq"
              class="footer-logo"
            />
          </a>
          <p class="footer-desc">
            Transformamos o potencial das organizações em resultados reais
            através de metodologia, gestão e desenvolvimento humano.
          </p>
          <div class="footer-redes">
            <a
              href="https://www.instagram.com/gesteq.consultoria/"
              target="_blank"
              rel="noopener"
              aria-label="Instagram da Gesteq"
              class="footer-rede-link"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.75"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/in/marcos-araujo-gesteq-47939047/"
              target="_blank"
              rel="noopener"
              aria-label="LinkedIn da Gesteq"
              class="footer-rede-link"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.75"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path
                  d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"
                />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
            <a
              href="https://www.facebook.com/gesteq/"
              target="_blank"
              rel="noopener"
              aria-label="Facebook da Gesteq"
              class="footer-rede-link"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.75"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path
                  d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"
                />
              </svg>
            </a>
          </div>
        </div>

        <!-- Coluna 2: Navegação -->
        <div class="footer-col footer-nav">
          <h4 class="footer-titulo-col">Navegação</h4>
          <ul class="footer-links">
            <li><a href="${inicioFooter}">Início</a></li>
            <li><a href="${sobreFooter}">Sobre Nós</a></li>
            <li><a href="${blogFooter}">Blog</a></li>
            <li><a href="${clientesFooter}">Clientes</a></li>
          </ul>
        </div>

        <!-- Coluna 3: Horário + Contato -->
        <div class="footer-col footer-contato">
          <h4 class="footer-titulo-col">Atendimento</h4>
          <ul class="footer-horarios">
            <li>
              <span class="horario-dia">Segunda — Sexta</span>
              <span class="horario-hora">08h às 18h</span>
            </li>
            <li>
              <span class="horario-dia">Sábado</span>
              <span class="horario-hora">08h às 12h</span>
            </li>
            <li>
              <span class="horario-dia">Domingo</span>
              <span class="horario-hora">Fechado</span>
            </li>
          </ul>
          <a
            href="https://wa.me/5581997674255"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Entre em contato via WhatsApp"
            class="btn-footer-contato"
            >Entre em Contato
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
        </div>
      </div>
      <!-- /footer-conteudo -->

      <div class="footer-base">
        <div class="container footer-base-inner">
          <hr class="footer-linha" />
          <p class="footer-copyright">
            &copy; <span id="footer-ano"></span> Gesteq. Todos os direitos
            reservados. | Desenvolvido por
            <a
              style="color: rgba(255, 255, 255, 0.6)"
              href="https://www.instagram.com/audaciamarketingco/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Audácia Mkt&Co — Agência de Marketing"
              >Audácia Mkt&Co</a
            >
          </p>
        </div>
      </div>
    </footer>`;
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

    // =========================================
    // Páginas Internas — Reveal de Seções
    // =========================================
    const revealItems = document.querySelectorAll('.servico-bloco, .servico-cta-conteudo');

    if (revealItems.length) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visivel');
                }
            });
        }, { threshold: 0.15 });

        revealItems.forEach(item => revealObserver.observe(item));
    }

});
