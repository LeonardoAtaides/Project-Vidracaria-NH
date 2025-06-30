// ANIMAÇÃO CONTAGEM DOS NÚMEROS
document.addEventListener("DOMContentLoaded", function () {
    const counters = document.querySelectorAll(".card-counter h2");
    let hasAnimated = false;

    function animateCounter(counter) {
        const target = +counter.getAttribute("data-target");
        const duration = 1500; // duração total da animação em ms
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const value = Math.floor(progress * target);

            counter.innerText = "+" + value;

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                counter.innerText = "+" + target;
            }
        }

        requestAnimationFrame(update);
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                hasAnimated = true;
                counters.forEach(animateCounter);
            }
        });
    }, { threshold: 0.5 });

    const container = document.getElementById("counter");
    if (container) {
        observer.observe(container);
    }
});
// ---------------------------------//
// Menu ☰
const toggleBtn = document.getElementById("menu-toggle");
const mobileNav = document.getElementById("nav-mobile");
const navLinks = mobileNav.querySelectorAll("a");

toggleBtn.addEventListener("click", () => {
  mobileNav.classList.toggle("active");
});


navLinks.forEach(link => {
  link.addEventListener("click", () => {
    mobileNav.classList.remove("active");
    toggleBtn.textContent = "☰";
  });
});
// ---------------------------------//

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


