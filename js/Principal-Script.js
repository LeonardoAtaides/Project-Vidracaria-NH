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

toggleBtn.addEventListener("click", () => {
  mobileNav.classList.toggle("active");
  navOverlay.classList.toggle("active"); // ativa o fundo

  if (mobileNav.classList.contains("active")) {
    toggleBtn.textContent = "✖";
  } else {
    toggleBtn.textContent = "☰"; 
  }

  toggleBtn.style.setProperty("color", "white", "important");
});

// Fechar menu ao clicar nos links
navLinks.forEach(link => {
  link.addEventListener("click", () => {
    mobileNav.classList.remove("active");
    navOverlay.classList.remove("active"); 
    toggleBtn.textContent = "☰";
    toggleBtn.style.setProperty("color", "white", "important");
  });
});

// Fechar menu ao clicar no fundo preto
navOverlay.addEventListener("click", () => {
  mobileNav.classList.remove("active");
  navOverlay.classList.remove("active");
  toggleBtn.textContent = "☰";
  toggleBtn.style.setProperty("color", "white", "important");
});


