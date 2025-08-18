const bottleContainer = document.querySelector('.fixed-bottle');
const bottleImage = bottleContainer.querySelector('.bottle-image');

const bottleTag = bottleContainer.querySelector('.bottle-tag');
const bottleVolume = bottleContainer.querySelector('.volume');
const bottleVolumeItems = bottleVolume.querySelectorAll('.volume__item');
const bottleButton = bottleContainer.querySelector('.bottle-button');

// gsap animation open
function initAnimation() {
    const tl = gsap.timeline();

    tl.to(bottleTag, {
        alpha: 0,
        duration: 0.1,
    }, '=')

    tl.to([bottleVolume, bottleButton], {
        alpha: 0,
        height: 0,
        display: 'none',
        duration: 0.1,
    })

    tl.to(bottleImage, {
        width: 134,
        paddingTop: '24px',
    })

    tl.to(bottleContainer, {
        gap: 16,
    }, '=')

    return tl.pause();
}

const tl = initAnimation();
let isAnimationPlayed = false;
bottleContainer.addEventListener('mouseover', () => {
    if (isAnimationPlayed) {
        tl.reverse();
        console.log('tl.reversed()')
        isAnimationPlayed = false;
    }
});
window.addEventListener('scroll', () => {
    if (!isAnimationPlayed) {
        tl.play();
        isAnimationPlayed = true;
    }
})

// toggle bottle volume
bottleVolumeItems.forEach(item => {
    item.addEventListener('click', () => {
        bottleVolumeItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');
    });
});