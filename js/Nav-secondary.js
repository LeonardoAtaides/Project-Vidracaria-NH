const links = document.querySelectorAll('.nav-secundary a');

links.forEach(link => {
// Pega só o nome do arquivo do href do link
const linkPage = link.getAttribute('href').split('/').pop();
// Pega só o nome do arquivo da página atual
const currentPage = window.location.pathname.split('/').pop();

if(linkPage === currentPage){
  link.classList.add('active'); // adiciona destaque
  // Centraliza no scroll horizontal (mobile)
  link.scrollIntoView({behavior: 'smooth', inline: 'center'});
}
});

