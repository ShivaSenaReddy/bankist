'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('nav');
const dotsContainer = document.querySelector('.dots');
const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//Page Navigation

btnScrollTo.addEventListener('click', e => {
  // const s1Cords = section1.getBoundingClientRect();
  // console.log(s1Cords);
  // console.log(window.scrollX, window.scrollY);
  // window.scrollTo(s1Cords.x + window.scrollX, s1Cords.y + window.scrollY);
  section1.scrollIntoView({ behavior: 'smooth' });
});

// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = el.getAttribute('href');
//     console.log(id);
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });
document.querySelector('.nav__links').addEventListener('click', function (e) {
  // /console.log('link');
  console.log(e.target);
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    // `console.log('yo');
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});
//tabbed component

// tabs.forEach(e => e.addEventListener('click', () => console.log('tab')));

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  // console.log(clicked);
  // console.log(e.target);
  if (!clicked) return;
  if (clicked.classList.contains('operations__tab')) {
    console.log(clicked.dataset.tab);
  }
  tabsContent.forEach(t => t.classList.remove('operations__content--active'));
  tabs.forEach(c => c.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

function handleMouseOver(e, opacity) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    // console.log(link);
    const siblings = link.closest('nav').querySelectorAll('.nav__link');
    const logo = link.closest('nav').querySelector('img');
    logo.style.opacity = opacity;
    // console.log(siblings);
    siblings.forEach(el => {
      if (el != link) el.style.opacity = opacity;
    });
  }
}
nav.addEventListener('mouseover', function (e) {
  handleMouseOver(e, 0.5);
});

nav.addEventListener('mouseout', function (e) {
  handleMouseOver(e, 1);
});

// sticky navigation

// const initialCoords = section1.getBoundingClientRect();
// console.log(initialCoords);
// window.addEventListener('scroll', function () {
//   // console.log(this.window.scrollY);
//   if (this.window.scrollY > initialCoords.top) nav.classList.add('sticky');
//   else {
//     nav.classList.remove('sticky');
//   }
// });

function obsCallback(entries, observer) {
  // entries.forEach(entry => console.log(entry));
}
const obsOptions = {
  root: null,
  threshold: 0.1,
};
const observer = new IntersectionObserver(obsCallback, obsOptions);
observer.observe(section1);

// Intersection Observer API
const navHeight = nav.getBoundingClientRect();
const headerObsOptions = {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight.height}px`,
};
function headerObserverCallback(entries) {
  // console.log(entries);
  // entries.forEach(entry => console.log(entry));
  const [entry] = entries;
  // console.log(entry);
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
}
const headerObserver = new IntersectionObserver(
  headerObserverCallback,
  headerObsOptions
);
const header = document.querySelector('header');
headerObserver.observe(header);
// scroll revealing

const sections = document.querySelectorAll('.section');
const sectionObserverOptions = {
  root: null,
  threshold: 0.15,
};
const revealSection = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);
  if (entry.isIntersecting) {
    entry.target.classList.remove('section--hidden');
    observer.unobserve(entry.target);
  }
};
const sectionObserver = new IntersectionObserver(
  revealSection,
  sectionObserverOptions
);
sections.forEach(sec => {
  sectionObserver.observe(sec);
  // sec.classList.add('section--hidden');
});

//lazy loading images

const lazyImages = document.querySelectorAll('img[data-src]');
console.log(lazyImages);
const lazyImageCallBack = function (entries, observer) {
  const [entry] = entries;
  console.log(entry);
  if (entry.isIntersecting) {
    console.log(entry.target.dataset);
    // entry.target.currentSrc = entry.target.dataset;
    entry.target.src = entry.target.dataset.src;
    entry.target.addEventListener('load', function () {
      entry.target.classList.remove('lazy-img');
    });
    observer.unobserve(entry);
  }
};
const lazyOptions = {
  root: null,
  threshold: 0,
};
const lazyObserver = new IntersectionObserver(lazyImageCallBack, lazyOptions);
lazyImages.forEach(img => lazyObserver.observe(img));

//slider component

const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
const btnRight = document.querySelector('.slider__btn--right');
const btnLeft = document.querySelector('.slider__btn--left');
let currentSlide = 0;
let maxSlides = slides.length;
// slider.style.overflow = 'visible';
// slider.style.transform = `scale(0.4) translateX(-1000px)`;

slides.forEach((s, i) => {
  s.style.transform = `translateX(${i * 100}%)`;
});
function moveRight() {
  // alert('y');

  if (currentSlide === maxSlides - 1) {
    currentSlide = 0;
  } else {
    currentSlide++;
  }

  console.log(currentSlide);
  slides.forEach((s, i) => {
    s.style.transform = `translateX(${(i - currentSlide) * 100}%)`;
    console.log(i + currentSlide, `translateX(${(i - currentSlide) * 100}%)`);
  });
  activateDots(currentSlide);
}
function moveLeft() {
  // alert('y');

  if (currentSlide === 0) {
    currentSlide = maxSlides - 1;
  } else {
    currentSlide--;
  }

  console.log(currentSlide);
  slides.forEach((s, i) => {
    s.style.transform = `translateX(${(i - currentSlide) * 100}%)`;
    console.log(i + currentSlide, `translateX(${(i - currentSlide) * 100}%)`);
  });
  activateDots(currentSlide);
}
btnRight.addEventListener('click', moveRight);

btnLeft.addEventListener('click', moveLeft);
//keys

document.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowRight') moveRight();
  e.key === 'ArrowLeft' && moveLeft();
});

slides.forEach(function (_, i) {
  dotsContainer.insertAdjacentHTML(
    'beforeend',
    `<button class='dots__dot' data-slide="${i}"></button>`
  );
});
const activateDots = function (slide) {
  const allDots = document.querySelectorAll('.dots__dot');
  console.log(allDots);
  /**my method 
  allDots.forEach(dot => {
    if (dot.classList.contains('dots__dot--active'))
      dot.classList.remove('dots__dot--active');
    if (dot.dataset.slide === slide) {
      dot.classList.add('dots__dot--active');
    }
  });*/
  allDots.forEach(dot => {
    if (dot.classList.contains('dots__dot--active'))
      dot.classList.remove('dots__dot--active');
  });
  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add('dots__dot--active');
};
dotsContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('dots__dot')) {
    console.log(e.target.dataset);
    currentSlide = e.target.dataset.slide;
    slides.forEach((s, i) => {
      s.style.transform = `translateX(${(i - currentSlide) * 100}%)`;
      console.log(i + currentSlide, `translateX(${(i - currentSlide) * 100}%)`);
    });
    activateDots(currentSlide);
  }
});

const init = function () {
  activateDots(0);
};
init();
// dom traversing
/*
const h1 = document.querySelector('h1');
// children
console.log(h1.children);
console.log(h1.childNodes);
h1.firstElementChild.style.color = 'red';
h1.lastElementChild.style.color = 'yellow';

console.log(h1.parentNode);
console.log(h1.parentElement);
console.log(h1.closest('header'));
h1.closest('header').style.background = `var(--gradient-secondary)`;
//
console.log(h1.previousSibling);
console.log(h1.nextElementSibling);

console.log(h1.parentElement.children);
[...h1.parentElement.children].forEach(function (el) {
  if (el != h1) {
    el.style.transform = 'scale(0.5)';
  }
});
*/
/*
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

const header = document.querySelector('.header');
const message = document.createElement('div');
message.innerHTML = `We use cookies for improved functionality
<button class='btn btn--close--cookie'>Got it</button>`;
header.prepend(message);
header.append(message);
document.querySelector('.btn--close--cookie').addEventListener('click', () => {
  message.remove();
});

message.style.backgroundColor = 'black';
message.style.width = '120%';
message.style.color = 'white';
message.style.textAlign = 'center';
console.log(getComputedStyle(message).height);
document.documentElement.style.setProperty('--color-primary', 'orange');
const logo = document.querySelector('.nav__logo');
console.log(logo.alt);
logo.alt = 'Banklist logo here';

logo.setAttribute('company', 'Bankist');
console.log(logo.getAttribute('company'));
console.log(logo.dataset.versionNumber);

logo.classList.add('add');
logo.classList.remove('add');
logo.classList.toggle('toggle');
logo.classList.contains('add');
*/

/*
const h1 = document.querySelector('h1');
function alertH1() {
  alert('you are reading h1');
}
h1.addEventListener('mouseenter', alertH1);
// h1.onmouseenter = function (e) {
//   alert('yo h1');
// };

setTimeout(() => {
  h1.removeEventListener('mouseenter', alertH1);
}, 3000);
*/

// Event Capturing

/* Event Capturing

const randomNumberGenerator = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
console.log(randomNumberGenerator(0, 255));
const randomColor = function () {
  return `rgb(
    ${randomNumberGenerator(0, 255)},
    ${randomNumberGenerator(0, 255)},
     ${randomNumberGenerator(0, 255)}
  )`;
};
console.log(randomColor());


document.querySelector('.nav__link').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('link', e.target, e.currentTarget);
  //stop propagation
  // e.stopPropagation();
});

document.querySelector('.nav__links').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('container', e.target, e.currentTarget);
});
document.querySelector('nav').addEventListener(
  'click',
  function (e) {
    this.style.backgroundColor = randomColor();
    console.log('nav', e.target, e.currentTarget);
  },
  false
);
*/
