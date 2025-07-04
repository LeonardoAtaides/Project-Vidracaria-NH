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


let currentSlide = 0;
        const totalSlides = 4;
        const carouselWrapper = document.getElementById('carouselWrapper');
        const cards = document.querySelectorAll('.carousel-card');
        const indicators = document.querySelectorAll('.indicator');

        function updateCarousel() {
            // Calcular a posição central
            const cardWidth = 320; // 300px + 20px gap
            const containerWidth = carouselWrapper.parentElement.offsetWidth;
            const centerOffset = (containerWidth - cardWidth) / 2;
            const translateX = centerOffset - (currentSlide * cardWidth);
            
            carouselWrapper.style.transform = `translateX(${translateX}px)`;
            
            // Atualizar classes ativas
            cards.forEach((card, index) => {
                card.classList.toggle('active', index === currentSlide);
            });
            
            indicators.forEach((indicator, index) => {
                indicator.classList.toggle('active', index === currentSlide);
            });
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % totalSlides;
            updateCarousel();
        }

        function prevSlide() {
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            updateCarousel();
        }

        function goToSlide(index) {
            currentSlide = index;
            updateCarousel();
        }

        // Auto-play (opcional)
        setInterval(nextSlide, 5000);

        // Inicializar carrossel
        window.addEventListener('load', updateCarousel);
        window.addEventListener('resize', updateCarousel);

        // Suporte para touch/swipe em dispositivos móveis
        let startX = 0;
        let isDragging = false;

        carouselWrapper.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isDragging = true;
        });

        carouselWrapper.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            e.preventDefault();
        });

        carouselWrapper.addEventListener('touchend', (e) => {
            if (!isDragging) return;
            
            const endX = e.changedTouches[0].clientX;
            const diffX = startX - endX;
            
            if (Math.abs(diffX) > 50) {
                if (diffX > 0) {
                    nextSlide();
                } else {
                    prevSlide();
                }
            }
            
            isDragging = false;
        });

        // Navegação por teclado
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                prevSlide();
            } else if (e.key === 'ArrowRight') {
                nextSlide();
            }
        });