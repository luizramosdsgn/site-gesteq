// O HTML DO SEU HEADER

const headerHTML = `
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
                    <li><a href="#clientes">Clientes</a></li>
                </ul>

                <div class="nav-cta">
                    <a href="https://gesteq.evolutto.com.br/" target="_blank"   class="btn-cta">Área do Cliente</a>
                </div>
            </div>
            
            <button id="btn-mobile" class="btn-mobile" aria-label="Abrir Menu">
                <span class="hamburguer"></span>
            </button>

        </div>
    </header>
`;

// INJETANDO NA TELA DE FORMA SEGURA
document.addEventListener('DOMContentLoaded', () => {
    const headerContainer = document.getElementById('header-container');
    if (headerContainer) {
        headerContainer.innerHTML = headerHTML;
        
        // Efeito Scroll no Header (Desktop)
        window.addEventListener('scroll', () => {
            if (window.scrollY > 10) {
                headerContainer.classList.add('scrolled');
            } else {
                headerContainer.classList.remove('scrolled');
            }
        });

        // CORREÇÃO E IMPLEMENTAÇÃO: Adicionando ação ao botão do menu mobile
        const btnMobile = document.getElementById('btn-mobile');
        const navMenu = document.getElementById('nav-menu');

        if (btnMobile && navMenu) {
            btnMobile.addEventListener('click', () => {
                navMenu.classList.toggle('ativo');
                btnMobile.classList.toggle('ativo');
            });
            
            // Fechar ao clicar nos links ou no CTA
            navMenu.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', (e) => {
                    if (link.id === 'btn-solucoes') return; // Ignora o clique caso seja no botão que abre o dropdown
                    navMenu.classList.remove('ativo');
                    btnMobile.classList.remove('ativo');
                });
            });

            // Lógica do Dropdown de Soluções
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

                // Fechar o popup ao clicar em uma opção
                dropdownSolucoes.querySelectorAll('a').forEach(link => {
                    link.addEventListener('click', () => {
                        dropdownSolucoes.classList.remove('ativo');
                        btnSolucoes.classList.remove('ativo');
                    });
                });
            }
        }
    }

    // =========================================
    // Lógica - Cards de Identidade Corporativa
    // =========================================
    const cardsIdentidade = document.querySelectorAll('.card-identidade');
    if (cardsIdentidade.length > 0) {
        let currentIndex = 0;
        let intervalId;

        const activateCard = (index) => {
            cardsIdentidade.forEach(card => card.classList.remove('ativo'));
            cardsIdentidade[index].classList.add('ativo');
        };

        const startAutoPlay = () => {
            intervalId = setInterval(() => {
                currentIndex = (currentIndex + 1) % cardsIdentidade.length;
                activateCard(currentIndex);
            }, 5000);
        };

        const stopAutoPlay = () => {
            clearInterval(intervalId);
        };

        // Inicia o autoplay
        startAutoPlay();
    }

    // =========================================
    // Lógica - Linha do Tempo Animada (Timeline)
    // =========================================
    const timelineItems = document.querySelectorAll('.timeline-item');
    if (timelineItems.length > 0) {
        // Fade in animation items
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visivel');
                }
            });
        }, { threshold: 0.3 }); // disparar quando 30% vísivel

        timelineItems.forEach(item => {
            observer.observe(item);
        });
    }

    const timeline = document.querySelector('.timeline');
    const timelineFill = document.querySelector('.timeline-preenchimento');
    
    if (timeline && timelineFill) {
        window.addEventListener('scroll', () => {
            const rect = timeline.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            // Distancia scrollada "dentro" do elemento:
            // Começa quando o topo original da linha chega um pouco abaixo do meio da tela
            let startFillingAt = windowHeight * 0.75; 
            
            let scrolled = startFillingAt - rect.top;
            let percentage = scrolled / rect.height;

            if (percentage < 0) percentage = 0;
            if (percentage > 1) percentage = 1;

            timelineFill.style.height = `${percentage * 90}%`;
        });
    }

    // =========================================
    // Lógica - Seção de Números (Contadores)
    // =========================================
    const numerosItems = document.querySelectorAll('.numero-item');
    if (numerosItems.length > 0) {

        const animarContador = (el) => {
            const target = parseInt(el.dataset.target, 10);
            const prefix = el.dataset.prefix || '';
            const duration = 1800; // ms
            const startTime = performance.now();

            const update = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                // Ease-out cúbico
                const eased = 1 - Math.pow(1 - progress, 3);
                const current = Math.round(eased * target);
                el.textContent = prefix + current;
                if (progress < 1) requestAnimationFrame(update);
            };

            requestAnimationFrame(update);
        };

        let alreadyFired = false;

        const numerosObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Fade-in do card
                    entry.target.classList.add('visivel');

                    // Animar contador apenas uma vez (quando a seção centraliza)
                    if (!alreadyFired) {
                        alreadyFired = true;
                        numerosItems.forEach(item => {
                            const valorEl = item.querySelector('.numero-valor');
                            if (valorEl) animarContador(valorEl);
                        });
                    }
                }
            });
        }, { threshold: 0.4 }); // dispara quando 40% do item está visível

        numerosItems.forEach(item => numerosObserver.observe(item));
    }

    // =========================================
    // Lógica - Seção de Clientes (Abas)
    // =========================================
    const abasBtns = document.querySelectorAll('.clientes-aba');
    const paineisCarrossel = document.querySelectorAll('.clientes-painel');

    if (abasBtns.length > 0) {
        abasBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const alvo = btn.dataset.aba;

                // Atualiza botões
                abasBtns.forEach(b => {
                    b.classList.remove('ativa');
                    b.setAttribute('aria-selected', 'false');
                });
                btn.classList.add('ativa');
                btn.setAttribute('aria-selected', 'true');

                // Atualiza painéis
                paineisCarrossel.forEach(painel => {
                    painel.classList.remove('ativo');
                });
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