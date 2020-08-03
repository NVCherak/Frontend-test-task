import "./styles/styles.scss"

document.addEventListener('DOMContentLoaded', () => {
  const SLIDETIME = 500; //ms

  const prevButton = document.querySelector('.slider__prev-btn');
  const nextButton = document.querySelector('.slider__next-btn');

  const sliderNavs = [...document.querySelectorAll('.slider__nav-item')];
  const allSlides = [...document.querySelectorAll('.slider__slide')];
  let clickable = true;
  let active = null;
  let newActive = null;

  function initSlider() {
    allSlides.forEach(slide =>
      slide.setAttribute(
        'style',
        `transition: transform ${SLIDETIME}ms ease;
                     animation-duration: ${SLIDETIME}ms`,
      ),
    );
  }

  function changeSlide(forward) {
    if (clickable) {
      clickable = false;
      active = document.querySelector('.active');
      const activeSlideIndex = allSlides.indexOf(active);
      sliderNavs[activeSlideIndex].classList.add('fade')

      if (forward) {
        newActive = allSlides[(activeSlideIndex + 1) % allSlides.length];
        active.classList.add('slideOutLeft');
        newActive.classList.add('slideInRight', 'active');
        sliderNavs[allSlides.indexOf(newActive)].classList.add('active')
      } else {
        newActive = allSlides[(activeSlideIndex - 1 + allSlides.length) % allSlides.length];
        active.classList.add('slideOutRight');
        newActive.classList.add('slideInLeft', 'active');
        sliderNavs[allSlides.indexOf(newActive)].classList.add('active')
      }
    }
  }

  allSlides.forEach((slide, id) => {
    slide.addEventListener('transitionend', () => {
      if (slide === active && !clickable) {
        clickable = true;
        active.className = 'slider__slide';
        sliderNavs[id].className = 'slider__nav-item'
      }
    });
  });

  nextButton.addEventListener('click', () => {
    changeSlide(true);
  });
  prevButton.addEventListener('click', () => {
    changeSlide(false);
  });

  initSlider();
});