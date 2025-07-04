let currentSlide = 3;
const totalSlides = 7;
const carouselWrapper = document.getElementById('carouselWrapper');
const cards = document.querySelectorAll('.carousel-card');
const indicators = document.querySelectorAll('.indicator');

function updateCarousel() {
    const cardWidth = 500;
    const containerWidth = carouselWrapper.parentElement.offsetWidth;
    const totalWidth = cardWidth * totalSlides;
    const maxTranslateX = 0;
    const minTranslateX = containerWidth - totalWidth; 
    let translateX = (containerWidth - cardWidth) / 2 - (currentSlide * cardWidth);

    if (translateX > maxTranslateX) translateX = maxTranslateX;
    if (translateX < minTranslateX) translateX = minTranslateX;

    carouselWrapper.style.transform = `translateX(${translateX}px)`;

    cards.forEach((card, index) => {
        card.classList.toggle('active', index === currentSlide);
    });

    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentSlide);
    });
}

function updateCarouselInstant() {
    carouselWrapper.style.transition = 'none'; 
    updateCarousel();
    requestAnimationFrame(() => {
        carouselWrapper.style.transition = ''; 
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

window.addEventListener('load', updateCarouselInstant);
window.addEventListener('resize', updateCarousel);

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
