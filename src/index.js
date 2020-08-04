import "./styles/styles.scss"
import Slider from "./slider"

document.addEventListener('DOMContentLoaded', Slider)

let isScrolling = false;

window.addEventListener("scroll", throttleScroll, false);

function throttleScroll (e) {
  if (isScrolling == false) {
    window.requestAnimationFrame(function () {
      scrolling(e);
      isScrolling = false;
    });
  }
  isScrolling = true;
}

document.addEventListener("DOMContentLoaded", scrolling, false);

let animItems = document.querySelectorAll(".bordered-on-scroll");

function scrolling () {
  for (let i = 0; i < animItems.length; i++) {
    let animItem = animItems[i];

    if (isFullyVisible(animItem)) {
      animItem.classList.add("active");
    } else {
      animItem.classList.remove("active");
    }
  }
}

const isFullyVisible = (el) => {
  let elementBoundary = el.getBoundingClientRect();

  let top = elementBoundary.top;
  let bottom = elementBoundary.bottom;

  return ((top >= 0) && (bottom <= window.innerHeight));
}