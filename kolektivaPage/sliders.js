
// age silder
function initSlider(parentContainer, navigationContainer) {
    const navBlock = document.querySelector(navigationContainer);
    const prevBtn = navBlock.querySelector('.prev');
    const nextBtn = navBlock.querySelector('.next');
    const currentEl = navBlock.querySelector('.current');
    const totalEl = navBlock.querySelector('.total');

    new Swiper(parentContainer, {
        slidesPerView: 1.1,
        spaceBetween: 8,
        slidesOffsetBefore: 24,
        slidesOffsetAfter: 24,
        breakpoints: {
            768: {
                slidesPerView: 1.5,
            },
            1199: {
                slidesPerView: 'auto',
                spaceBetween: 16,
            },
        },
        navigation: {
            prevEl: prevBtn,
            nextEl: nextBtn
        },
        on: {
            init: self => updateCounter(self, { currentEl, totalEl }),
            slideChange: self => updateCounter(self, { currentEl, totalEl }),
        }
    });
}

initSlider('.js-age-slider', '.js-age-slide-counter');
initSlider('.js-family-history-slider', '.js-history-slide-counter');

function updateCounter(swiper, { currentEl, totalEl }) {
    const current = swiper.realIndex + 1;

    const total = Array.from(swiper.slides).filter(
        s => !s.classList.contains('swiper-slide-duplicate')
    ).length;

    currentEl.textContent = String(current);
    totalEl.textContent = String(total);
}

