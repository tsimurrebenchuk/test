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