// gsap.registerPlugin(ScrollTrigger);

// const oilSection = document.querySelector('.oil-create');

// const typeListItems = document.querySelectorAll('.texts__list p');
// const typeListItemsLength = typeListItems.length;

// const oilImages = oilSection.querySelectorAll('.main-image img');
// gsap.set(oilImages[0], { clipPath: 'inset(0 0 0 0)' });

// let oilLastIndex = 0;
// ScrollTrigger.create({
//     trigger: oilSection,
//     start: "top top",
//     end: `+=${typeListItemsLength * 100}%`,
//     pin: true,
//     scrub: true,
//     onUpdate: self => {
//         const idx = Math.min(typeListItemsLength - 1, Math.floor(self.progress * typeListItemsLength));

//         if (idx !== oilLastIndex) {
//             typeListItems.forEach((el, i) => el.classList.toggle('active', i === idx));

//             if (idx > oilLastIndex) {
//                 gsap.to(oilImages[idx], {
//                     clipPath: 'inset(0 0 0 0)',
//                     duration: 0.5,
//                     ease: 'power2.out'
//                 });
//             } else {
//                 gsap.to(oilImages[oilLastIndex], {
//                     clipPath: 'inset(100% 0 0 0)',
//                     duration: 0.5,
//                     ease: 'power2.in'
//                 });
//             }

//             oilLastIndex = idx;
//         }
//     }
// });

// ==== Mobile ====
const oilSection = document.querySelector('.oil-create');
const textSections = oilSection.querySelectorAll('.texts__list-section');
const textSectionTitle = oilSection.querySelectorAll('.texts__list-text');

textSections.forEach((section, index) => {
    section.addEventListener('click', () => {
        textSections.forEach(el => el.classList.remove('show'));
        textSectionTitle.forEach(el => el.classList.remove('active'));

        section.classList.add('show');
        textSectionTitle[index].classList.add('active');
    })
});