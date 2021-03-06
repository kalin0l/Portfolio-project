
// smooth scrolling
const parentElOfLinks = document.querySelector('.nav-links');


parentElOfLinks.addEventListener('click', function (e) {

    e.preventDefault();

    if (e.target.classList.contains('nav__header-link')) {
        const id = e.target.getAttribute('href');
        document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
    }
})

// reveal sections

const reveal = function (entries, observer) {
    const [entry] = entries;

    if (!entry.isIntersecting) return;
    entry.target.classList.remove('hidden');

    observer.unobserve(entry.target);


}

const allSections = document.querySelectorAll('.section');


const sectionObs = new IntersectionObserver(reveal, {
    root: null,
    threshold: 0.1,

})

allSections.forEach(section => {
    sectionObs.observe(section);
    section.classList.add('hidden');
})

// reveal imgs
const revealImg = function (entries, obs) {
    const [entry] = entries;
    console.log(entry);

    if (entry.isIntersecting) {
        entry.target.style.filter = 'blur(0)';
        obs.unobserve(entry.target);
    }
}

const imgsObs = new IntersectionObserver(revealImg, {
    root: null,
    threshold: 0.2,
    rootMargin: '-200px',
})

const allImgs = document.querySelectorAll('img');
allImgs.forEach(img => {
    imgsObs.observe(img);
})

// fixed header 
const header = document.querySelector('.header');
const section = document.querySelector('#welcome-section');
const headerNav = header.getBoundingClientRect();
console.log(headerNav)

const fixedHeader = function (entries, obs) {
    const [entry] = entries;


    if (!entry.isIntersecting) {
        header.classList.add('fixed');
    } else {
        header.classList.remove('fixed');
    }

}

const headerObs = new IntersectionObserver(fixedHeader, {
    root: null,
    threshold: 0,
    rootMargin: `-${headerNav.height}px`
})

headerObs.observe(section);

// Slider functionality

const slides = document.querySelectorAll('.slide');
const btnRight = document.querySelector('.slider__btn--right');
const btnLeft = document.querySelector('.slider__btn--left');
const dots = document.querySelectorAll('.dots__dot');
const dotsContainer = document.querySelector('.dots');

let currentSlide = 0;
let maxSlider = slides.length - 1;

const activeDot = function(slide){
    dots.forEach(dot => {
        dot.classList.remove('active');
    })
    document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('active');

}

const goToSlide = function (slide) {
    slides.forEach((s, i) => {
        s.style.transform = `translateX(${200 * (i - slide)}%)`
    })

}
goToSlide(currentSlide);

const next = function () {
    if (currentSlide === maxSlider) {
        currentSlide = 0;
    } else {
        currentSlide++;
    }

    goToSlide(currentSlide);
    activeDot(currentSlide);
}
const prev = function () {
    if (currentSlide === 0) {
        currentSlide = maxSlider;
    } else {
        currentSlide--;
    }
    goToSlide(currentSlide);
    activeDot(currentSlide);
}

// event listeners
btnRight.addEventListener('click', next)

btnLeft.addEventListener('click', prev)

document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') next();
    e.key === 'ArrowLeft' && prev();

})

dotsContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
        const slide = e.target.dataset.slide;
        // e.target.classList.toggle('active');
        goToSlide(slide);
        activeDot(slide);
    }
})


