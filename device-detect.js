// Detecta se é dispositivo móvel
function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;
}

// Função para carregar o CSS correto
function loadCorrectCSS() {
    const existingLink = document.querySelector('link[href*="style.css"]');
    const mobileCSSLink = document.querySelector('link[href*="mobile.css"]');

    if (isMobile()) {
        // Se for mobile e o mobile.css não estiver carregado
        if (!mobileCSSLink) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = 'mobile.css';
            document.head.appendChild(link);
        }
        // Desativa o CSS desktop se estiver carregado
        if (existingLink) {
            existingLink.disabled = true;
        }
    } else {
        // Se for desktop e o style.css não estiver ativo
        if (existingLink) {
            existingLink.disabled = false;
        }
        // Remove o CSS mobile se estiver carregado
        if (mobileCSSLink) {
            mobileCSSLink.remove();
        }
    }
}

// Carrega o CSS correto na inicialização
document.addEventListener('DOMContentLoaded', loadCorrectCSS);

// Recarrega o CSS correto quando a janela é redimensionada
window.addEventListener('resize', loadCorrectCSS);

// Resto do código JavaScript existente...