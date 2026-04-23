document.addEventListener('DOMContentLoaded', () => {
    // Adiciona o HTML da transição se não existir
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
    
    // Animação de entrada (quando a página carrega)
    // As colunas começam cobrindo a tela. Para revelar a página,
    // encolhem em direção ao topo (transform-origin: top) ou base (transform-origin: bottom).
    setTimeout(() => {
        cols.forEach((col, index) => {
            col.style.transformOrigin = 'bottom';
            setTimeout(() => {
                col.style.transform = 'scaleY(0)';
            }, index * 100);
        });
    }, 100);

    // Animação de saída (quando clica em um link)
    const links = document.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            const target = link.getAttribute('target');
            
            // Ignorar links internos (âncoras), nova aba, ações JS, e modificadores de teclado
            if (
                !href ||
                href.startsWith('#') || 
                target === '_blank' || 
                e.ctrlKey || e.metaKey || e.shiftKey || 
                href.startsWith('mailto:') || 
                href.startsWith('tel:') ||
                href.startsWith('javascript:')
            ) {
                return;
            }

            e.preventDefault();
            
            // Quando sai da página, as colunas surgem de cima para baixo
            cols.forEach((col, index) => {
                // Remove a transição momentaneamente para mudar o transform-origin
                col.style.transition = 'none';
                col.style.transformOrigin = 'top';
                col.style.transform = 'scaleY(0)'; 
                
                // Forçar reflow para aplicar as mudanças imediatas
                void col.offsetWidth;
                
                // Restaura a transição e aplica o crescimento
                col.style.transition = 'transform 0.6s cubic-bezier(0.85, 0, 0.15, 1)';
                setTimeout(() => {
                    col.style.transform = 'scaleY(1)';
                }, index * 100);
            });

            // Aguarda a animação terminar antes de redirecionar
            const maxDelay = (cols.length - 1) * 100;
            const transitionDuration = 600; // Tempo do transition no CSS
            
            setTimeout(() => {
                window.location.href = href;
            }, maxDelay + transitionDuration);
        });
    });
});
