/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 *
*/

const navbar__menu = document.getElementsByTagName('nav');
const navbar__list = document.getElementById('navbar__list');
const sections = document.querySelectorAll('section');
const toTop__arrow = document.getElementById('toTop__arrow');

/**
 * End Global Variables
 * Start Helper Functions
 *
*/

// build the nav
// Scroll to anchor ID using scrollTO event

function createNavList() {
    for (section of sections) {
        const currentSectionId = section.getAttribute('id');
        // build the navigation bar
        if (section.attributes['data-nav']) {
            const currentSectionName = section.getAttribute('data-nav');
            let link = document.createElement('a');
            let navbar__item = document.createElement('li');
            link.textContent = currentSectionName;
            link.classList.add('menu__link');
            link.setAttribute('id', `${currentSectionId}__link`);
            link.setAttribute('href', `#${currentSectionId}`);
            navbar__item.setAttribute('class', 'navbar__item');
            navbar__item.onclick = function(e) {
                e.preventDefault();
                // Scroll to anchor ID using scrollTO event
                document.querySelector(`#${currentSectionId}`).scrollIntoView({
                    behavior: 'smooth'
                });
            }
            navbar__item.appendChild(link);
            navbar__list.append(navbar__item);
        }
    }
}

// Add class 'active' to section when near top of viewport
function showTheActiveSection() {
    let navbar__list__links = document.querySelectorAll('nav ul li a');
    for (link of navbar__list__links) {
        let section = document.querySelector(link.hash);
        let rect = section.getBoundingClientRect();

        // store true if the element is near the top of the viewport, false otherwise
        let isElementInViewPort = rect.top >= 0 &&    rect.top <=
            0.4 * (window.innerHeight || document.documentElement.clientHeight);

        // if the section is in the viewport -- add 'active' class to section and link
        if (isElementInViewPort){
            section.classList.add('active');
            link.classList.add('active');
        }
        // otherwise -- remove 'active' class to section and link
        else{
            section.classList.remove('active');
            link.classList.remove('active');
        }
   }
}

function scrollToTop() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        toTop__arrow.style.display = "block";
    }
    else {
        toTop__arrow.style.display = "none";
    }
}

function toTop() {
    window.scrollTo({top: 0, behavior: 'smooth'});
}

/**
 * End Helper Functions
 * Begin Main Functions
 *
*/

function init() {
    createNavList();
    toTop__arrow.addEventListener("click", toTop);
}

function onScroll() {
    showTheActiveSection();
    scrollToTop();
}

/**
 * End Main Functions
 * Begin Events
 *
*/

document.addEventListener('DOMContentLoaded', init);
window.addEventListener('scroll', onScroll);
window.onbeforeunload = function() {
    window.scrollTo(0, 0);
}