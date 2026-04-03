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
                    <li><a href="#">Sobre Nós</a></li>
                    <li><a href="#">Soluções</a></li>
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
});