// // utils для оборачивания в span class="line"
// function wrapLines(spanLines) {
//     // if (isHeroMobile) return;

//     spanLines.forEach(container => {
//         const lines = container.innerHTML.split("<br>");

//         container.innerHTML = "";

//         lines.forEach(line => {
//             const spanMask = document.createElement("span");
//             spanMask.className = "mask";
//             const span = document.createElement("span");
//             span.className = "line";
//             span.innerHTML = line.trim();
//             container.appendChild(spanMask);
//             spanMask.appendChild(span);
//         });
//     })
// }

// gsap.registerPlugin(ScrollTrigger);

// bottle-cap-description-animation
const bottleCapDescriptionBlock = document.querySelector('.bottle-cap-description');
const bottleCapTextContainer = bottleCapDescriptionBlock.querySelectorAll('span');
wrapLines(bottleCapTextContainer);

const bottleCapTexts = bottleCapDescriptionBlock.querySelectorAll(".line");
gsap.set(bottleCapTexts, { yPercent: 100, });

const bottleCapVideo = document.querySelector('.premium__bottle-cap video');
console.log('bottleCapVideo', bottleCapVideo)

gsap.to(bottleCapTexts, {
    scrollTrigger: {
        trigger: bottleCapDescriptionBlock,
        start: '80% bottom',
        toggleActions: 'play none none none'
    },
    yPercent: 0,
    duration: 0.5,
    stagger: 0.2,
}, ">");

let playedVideo = false;
ScrollTrigger.create({
    trigger: bottleCapVideo,
    start: '80% bottom',
    onEnter: () => {
        if (!playedVideo) bottleCapVideo.play();
        playedVideo = true;
    },
});