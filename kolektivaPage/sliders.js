
// age silder
function initSlider(parentContainer, navigationContainer, swiperPagination) {
    const navBlock = document.querySelector(navigationContainer);
    const prevBtn = navBlock.querySelector('.prev');
    const nextBtn = navBlock.querySelector('.next');
    const currentEl = navBlock.querySelector('.current');
    const totalEl = navBlock.querySelector('.total');

    new Swiper(parentContainer, {
        centeredSlides: true,
        slidesPerView: 1,
        spaceBetween: 8,
        breakpoints: {
            768: {
                slidesOffsetAfter: 24,
                slidesOffsetBefore: 24,
                slidesPerView: 1.5,
            },
            1199: {
                centeredSlides: false,
                slidesOffsetAfter: 24,
                slidesOffsetBefore: 24,
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
        },
        pagination: {
            el: swiperPagination,
        }
    });
}

function updateCounter(swiper, { currentEl, totalEl }) {
    const current = swiper.realIndex + 1;

    const total = Array.from(swiper.slides).filter(
        s => !s.classList.contains('swiper-slide-duplicate')
    ).length;

    currentEl.textContent = String(current);
    totalEl.textContent = String(total);
}

initSlider('.js-age-slider', '.js-age-slide-counter', '.js-age-pagination');
initSlider('.js-family-history-slider', '.js-history-slide-counter');


// recepi slider
new Swiper('.js-premium-recipes-swiper', {
    slidesPerView: 1.1,
    spaceBetween: 8,
    slidesOffsetBefore: 16,
    slidesOffsetAfter: 16,
    breakpoints: {
        768: {
            slidesPerView: 1.5,
        },
        1199: {
            slidesPerView: 2.3,
            spaceBetween: 16,
            slidesOffsetBefore: 24,
            slidesOffsetAfter: 24,
        },
        1440: {
            slidesPerView: 2.7,
            spaceBetween: 16,
            slidesOffsetBefore: 24,
            slidesOffsetAfter: 24,
        },
        1660: {
            slidesPerView: 'auto',
            spaceBetween: 16,
            slidesOffsetBefore: 24,
            slidesOffsetAfter: 24,
        },
    },
    scrollbar: {
        el: '.swiper-scrollbar',
        draggable: true,
    },
});
