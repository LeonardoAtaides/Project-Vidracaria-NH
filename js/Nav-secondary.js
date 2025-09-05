
window.addEventListener('DOMContentLoaded', () => {
    const nav = document.querySelector('.nav-secundary');
    const links = nav.querySelectorAll('a');

    const currentPage = window.location.pathname.split('/').pop();

    links.forEach(link => {
        const linkPage = link.getAttribute('href').split('/').pop();
        if(linkPage === currentPage){
            // Calcula posição do link dentro da navbar
            const containerWidth = nav.offsetWidth;
            const itemLeft = link.offsetLeft;
            const itemWidth = link.offsetWidth;

            // Ajusta o scroll para o link ficar visível
            let scrollPos = itemLeft - (containerWidth / 2) + (itemWidth / 2);

            // Evita scroll negativo (início da navbar)
            if(scrollPos < 0) scrollPos = 0;

            // Evita ultrapassar o final da navbar
            const maxScroll = nav.scrollWidth - containerWidth;
            if(scrollPos > maxScroll) scrollPos = maxScroll;

            nav.scrollTo({left: scrollPos, behavior: 'smooth'});
        }
    });
});

