
window.addEventListener('DOMContentLoaded', () => {
    const nav = document.querySelector('.nav-secundary'); // container com overflow-x
    const links = nav.querySelectorAll('a');

    const currentPage = window.location.pathname.split('/').pop();

    links.forEach(link => {
        const linkPage = link.getAttribute('href').split('/').pop();
        if(linkPage === currentPage){
            // Calcula a posição relativa do link dentro do nav
            const itemLeft = link.offsetLeft; // posição do link dentro do <ul>
            const itemWidth = link.offsetWidth;
            const containerWidth = nav.clientWidth;

            // Ajusta scroll para centralizar o link
            let scrollPos = itemLeft + itemWidth/2 - containerWidth/2;

            // Evita scroll negativo ou além do final
            scrollPos = Math.max(0, Math.min(scrollPos, nav.scrollWidth - containerWidth));

            // Rola a navbar
            nav.scrollTo({ left: scrollPos, behavior: 'smooth' });
        }
    });
});

