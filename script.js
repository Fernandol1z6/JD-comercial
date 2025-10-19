(function() {
    'use strict';

    document.addEventListener('DOMContentLoaded', () => {

        // =================================
        // SELETORES
        // =================================
        const header = document.querySelector('header');
        const menuToggle = document.querySelector('.menu-toggle');
        const mobileNav = document.querySelector('.mobile-nav');
        const heroElements = document.querySelectorAll('.hero-content .reveal');
        const revealElements = document.querySelectorAll('.reveal');
        const windowHeight = window.innerHeight;
        const revealPoint = 150; // Ponto para iniciar a revelação (150px do fundo)


        // =================================
        // 1. FUNCIONALIDADE DO MENU MOBILE
        // =================================
        if (menuToggle && mobileNav) {
            menuToggle.addEventListener('click', () => {
                mobileNav.classList.toggle('open');
                const icon = menuToggle.querySelector('i');

                // Alterna os ícones 'fa-bars' e 'fa-times'
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');

                // Atualiza o atributo ARIA para acessibilidade
                const isExpanded = mobileNav.classList.contains('open');
                menuToggle.setAttribute('aria-expanded', isExpanded);
            });

            // Fecha o menu ao clicar num link (para navegação suave)
            mobileNav.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    if (mobileNav.classList.contains('open')) {
                        mobileNav.classList.remove('open');
                        const icon = menuToggle.querySelector('i');
                        icon.classList.remove('fa-times');
                        icon.classList.add('fa-bars');
                        menuToggle.setAttribute('aria-expanded', 'false');
                    }
                });
            });
        }


        // =================================
        // 2. ANIMAÇÃO INICIAL DA HERO SECTION
        // =================================
        // Ativa a animação da hero section após um pequeno delay para carregar o CSS
        setTimeout(() => {
            heroElements.forEach(el => {
                el.classList.add('active');
            });
        }, 100);


        // =================================
        // 3 & 4. LÓGICA DE SCROLL (Reveal + Header)
        // =================================

        const handleScroll = () => {
            const scrollY = window.scrollY;

            // 3. SCROLL REVEAL
            revealElements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;

                if (elementTop < windowHeight - revealPoint) {
                    element.classList.add('active');
                }
                // Nota: Não removemos a classe 'active' para manter os elementos visíveis.
            });

            // 4. HEADER SCROLL EFFECT
            if (header) {
                if (scrollY > 50) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
            }
        };

        // Adiciona um único listener para ambas as funcionalidades de scroll
        window.addEventListener('scroll', handleScroll);

        // Chama a função handleScroll uma vez na carga da página para elementos já visíveis
        handleScroll();
        // =================================
        // 5. CARROSSÉIS
        // =================================
        const initCarousel = (container) => {
            const carousel = container.querySelector('.product-cards-grid, .galaxy-cards-grid');
            const cards = carousel.children;
            const prevBtn = container.querySelector('.carousel-button.prev');
            const nextBtn = container.querySelector('.carousel-button.next');

            // Criar indicadores
            const indicators = document.createElement('div');
            indicators.className = 'carousel-indicators';
            const totalIndicators = Math.ceil(cards.length / 3); // 3 cards visíveis por vez em desktop

            for (let i = 0; i < totalIndicators; i++) {
                const dot = document.createElement('div');
                dot.className = 'indicator' + (i === 0 ? ' active' : '');
                indicators.appendChild(dot);
            }
            container.appendChild(indicators);

            // Função para atualizar indicadores
            const updateIndicators = () => {
                const scrollPercentage = carousel.scrollLeft / (carousel.scrollWidth - carousel.clientWidth);
                const activeIndex = Math.round(scrollPercentage * (totalIndicators - 1));

                indicators.querySelectorAll('.indicator').forEach((dot, index) => {
                    dot.classList.toggle('active', index === activeIndex);
                });
            };

            // Handlers de navegação
            if (prevBtn) prevBtn.addEventListener('click', () => {
                carousel.scrollBy({
                    left: -carousel.offsetWidth,
                    behavior: 'smooth'
                });
            });

            if (nextBtn) nextBtn.addEventListener('click', () => {
                carousel.scrollBy({
                    left: carousel.offsetWidth,
                    behavior: 'smooth'
                });
            });

            // Atualizar indicadores no scroll
            carousel.addEventListener('scroll', updateIndicators);

            // Touch scroll support
            let startX;
            let scrollLeft;

            carousel.addEventListener('touchstart', (e) => {
                startX = e.touches[0].pageX - carousel.offsetLeft;
                scrollLeft = carousel.scrollLeft;
            });

            carousel.addEventListener('touchmove', (e) => {
                if (!startX) return;
                const x = e.touches[0].pageX - carousel.offsetLeft;
                const walk = (x - startX) * 2;
                carousel.scrollLeft = scrollLeft - walk;
            });

            carousel.addEventListener('touchend', () => {
                startX = null;
            });
        };

        // Inicializar todos os carrosséis
        document.querySelectorAll('.product-carousel-container').forEach(initCarousel);
    });

})();