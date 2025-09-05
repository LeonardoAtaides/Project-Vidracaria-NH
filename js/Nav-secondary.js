// Pega todos os links da navbar
  const links = document.querySelectorAll('.nav-secundary a');

  links.forEach(link => {
    // Compara o href do link com o URL atual
    if(link.href === window.location.href){
      link.classList.add('active'); // Adiciona a classe 'active'
      // Faz o scroll horizontal para centralizar o item
      link.scrollIntoView({behavior: 'smooth', inline: 'center'});
    }
  });