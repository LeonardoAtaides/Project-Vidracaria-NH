window.addEventListener('DOMContentLoaded', () => {
    const nav = document.querySelector('.nav-secundary');
    const links = nav.querySelectorAll('a');

    const currentPage = window.location.pathname.split('/').pop();

    links.forEach(link => {
        const linkPage = link.getAttribute('href').split('/').pop();
        if(linkPage === currentPage){
            link.classList.add('active');
            // Scroll horizontal da navbar
            // 'offsetLeft' pega a posição do item em relação ao container
            const containerWidth = nav.offsetWidth;
            const itemLeft = link.offsetLeft;
            const itemWidth = link.offsetWidth;

            // Centraliza o item ou aproxima do final se for último
            const scrollPos = itemLeft - (containerWidth / 2) + (itemWidth / 2);
            nav.scrollTo({left: scrollPos, behavior: 'smooth'});
        }
    });
});