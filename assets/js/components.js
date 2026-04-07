// O HTML DO SEU HEADER

const headerHTML = `
<header class="cabecalho">
        <div class="container nav-container">
            
            <a href="#inicio" aria-label="Ir para inicio" class="logo-link">
                <img src="assets/icons/logo-gesteq.svg" alt="Logo Gesteq">
            </a>

            <div class="nav-menu" id="nav-menu">
                <ul class="nav-links">
                    <li><a href="#inicio">Início</a></li>
                    <li><a href="#sobre">Sobre Nós</a></li>
                    <li><a href="#metodologia">Soluções</a></li>
                    <li><a href="#">Clientes</a></li>
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
                link.addEventListener('click', () => {
                    navMenu.classList.remove('ativo');
                    btnMobile.classList.remove('ativo');
                });
            });
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
            }, 3000);
        };

        const stopAutoPlay = () => {
            clearInterval(intervalId);
        };

        // Inicia o autoplay
        startAutoPlay();

        // Adiciona os eventos de hover
        cardsIdentidade.forEach((card, index) => {
            card.addEventListener('mouseenter', () => {
                stopAutoPlay();
                activateCard(index);
                currentIndex = index;
            });

            card.addEventListener('mouseleave', () => {
                startAutoPlay();
            });
            
            // Impede a navegação padrão ao clicar (já que o href é "#")
            card.addEventListener('click', (e) => {
                e.preventDefault();
            });
        });
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

            timelineFill.style.height = `${percentage * 100}%`;
        });
    }
});