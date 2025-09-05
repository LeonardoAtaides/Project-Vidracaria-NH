const carouselWrapper = document.getElementById('carouselWrapper');
const cards = Array.from(document.querySelectorAll('.carousel-card'));
const indicators = document.querySelectorAll('.indicator');

const totalSlides = cards.length;

carouselWrapper.innerHTML = '';
const loopMultiplier = 100;
let slidesLoop = [];
for (let i = 0; i < loopMultiplier; i++) {
    slidesLoop = slidesLoop.concat(cards.map(card => card.cloneNode(true)));
}
slidesLoop.forEach(card => carouselWrapper.appendChild(card));

const allSlides = carouselWrapper.querySelectorAll('.carousel-card');

let currentSlide = totalSlides * Math.floor(loopMultiplier / 2);

function getCardWidth() {
    return window.innerWidth < 768 ? 360 : 500;
}

function updateCarousel(instant = false) {
    const cardWidth = getCardWidth();
    const containerWidth = carouselWrapper.parentElement.offsetWidth;

    // Centraliza o slide atual
    const translateX = (containerWidth / 2 - cardWidth / 2) - (currentSlide * cardWidth);
    carouselWrapper.style.transition = instant ? 'none' : 'transform 0.4s ease';
    carouselWrapper.style.transform = `translateX(${translateX}px)`;

    // Destacar slide central e vizinhos
    allSlides.forEach((slide, index) => {
        slide.style.transition = instant ? 'none' : 'transform 0.4s ease, opacity 0.4s ease';
        if (index === currentSlide) {
            slide.style.transform = 'scale(1)';
            slide.style.opacity = '1';
        } else if (index === currentSlide - 1 || index === currentSlide + 1) {
            slide.style.transform = 'scale(0.85)';
            slide.style.opacity = '0.6';
        } else {
            slide.style.transform = 'scale(0.7)';
            slide.style.opacity = '0.3';
        }
    });

    const activeIndex = currentSlide % totalSlides;
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === activeIndex);
    });
}

function nextSlide() {
    currentSlide++;
    updateCarousel();
}

function prevSlide() {
    currentSlide--;
    updateCarousel();
}

let startX = 0;
let isDragging = false;

carouselWrapper.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
    isDragging = true;
});

carouselWrapper.addEventListener('touchmove', e => {
    if (!isDragging) return;
    e.preventDefault();
});

carouselWrapper.addEventListener('touchend', e => {
    if (!isDragging) return;
    const endX = e.changedTouches[0].clientX;
    const diffX = startX - endX;

    if (Math.abs(diffX) > 50) {
        if (diffX > 0) nextSlide();
        else prevSlide();
    }
    isDragging = false;
});

document.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') prevSlide();
    else if (e.key === 'ArrowRight') nextSlide();
});

window.addEventListener('load', () => updateCarousel(true));
window.addEventListener('resize', () => updateCarousel(true));
