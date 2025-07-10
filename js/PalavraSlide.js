// Carossel de palavras
const slide = document.getElementById("palavraSlide");
  const palavras = slide.children;
  const total = palavras.length;

  let index = 0;

  setInterval(() => {
    index++;
    if (index >= total) {
      const clone = palavras[index - total].cloneNode(true);
      slide.appendChild(clone);
    }
    slide.style.transform = `translateY(-${index * 1.2}em)`;
  }, 3500); 
// ---------------------------------//