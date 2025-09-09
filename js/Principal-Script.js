// ANIMAÇÃO CONTAGEM DOS NÚMEROS
document.addEventListener("DOMContentLoaded", function () {
    const counters = document.querySelectorAll(".card-counter h2");
    let hasAnimated = false;

    function animateCounter(counter) {
        const target = +counter.getAttribute("data-target");
        const duration = 1500;
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

// Menu Mobile
const toggleBtn = document.getElementById("menu-toggle");
const mobileNav = document.getElementById("nav-mobile");
const navLinks = mobileNav.querySelectorAll("a");
const navOverlay = document.querySelector(".nav-overlay"); // fundo preto

// Função para abrir/fechar menu
function toggleMenu(e) {
  e.preventDefault(); // evita comportamentos estranhos no iOS

  mobileNav.classList.toggle("active");
  navOverlay.classList.toggle("active");

  // Troca o ícone do botão
  toggleBtn.textContent = mobileNav.classList.contains("active") ? "x" : "☰";
}

// Ativa menu ao clicar ou tocar
toggleBtn.addEventListener("click", toggleMenu);
toggleBtn.addEventListener("touchstart", toggleMenu);

// Fechar menu ao clicar nos links
navLinks.forEach(link => {
  link.addEventListener("click", () => {
    mobileNav.classList.remove("active");
    navOverlay.classList.remove("active");
    toggleBtn.textContent = "☰";
  });

  link.addEventListener("touchstart", () => {
    mobileNav.classList.remove("active");
    navOverlay.classList.remove("active");
    toggleBtn.textContent = "☰";
  });
});

// Fechar menu ao clicar/tocar no fundo preto
navOverlay.addEventListener("click", () => {
  mobileNav.classList.remove("active");
  navOverlay.classList.remove("active");
  toggleBtn.textContent = "☰";
});

navOverlay.addEventListener("touchstart", () => {
  mobileNav.classList.remove("active");
  navOverlay.classList.remove("active");
  toggleBtn.textContent = "☰";
});
