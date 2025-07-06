// ==== Canvas Setup ====
const canvas = document.getElementById("video-frame");
const ctx = canvas.getContext("2d");

const isHeroMobile = window.innerWidth < 1024;

const setCanvasSize = () => {
    const baseWidth = window.innerWidth;
    const baseHeight = isHeroMobile ? Math.round(baseWidth * 1600 / 720) : Math.round(baseWidth * 9 / 16);

    console.log('baseWidth', baseWidth)
    console.log('baseHeight', baseHeight)

    canvas.width = baseWidth;
    canvas.height = baseHeight;

    canvas.style.width = baseWidth + 'px';
    canvas.style.height = baseHeight + 'px';

    ctx.setTransform(1, 0, 0, 1, 0, 0);
};

// ==== Utils ====
const frameSlider = document.getElementById("frame-slider");
const currentFrameDisplay = document.getElementById("current-frame");

const DURATION_SPEED = 0.2;

// utils для оборачивания в span class="line"
function wrapLines(spanLines) {
    if (isHeroMobile) return;

    spanLines.forEach(container => {
        const lines = container.innerHTML.split("<br>");

        container.innerHTML = "";

        lines.forEach(line => {
            const spanMask = document.createElement("span");
            spanMask.className = "mask";
            const span = document.createElement("span");
            span.className = "line";
            span.innerHTML = line.trim();
            container.appendChild(spanMask);
            spanMask.appendChild(span);
        });
    })
}

// block reveal
function revealBlock(timeline, blockElement, spanElements, stagger = 0.2) {
    timeline.to(blockElement, {
        opacity: 1,
        duration: DURATION_SPEED
    })

    timeline.to(spanElements, {
        opacity: 1,
        yPercent: 0,
        stagger: stagger,
        duration: DURATION_SPEED
    }, ">");
}

// ==== ANIMATIONS====
// main-block
const mainBlock = document.querySelector('.main-content');

// uv-block-animation
const uvBlock = document.querySelector('.uv-protection');
const uvBlockTextContainer = uvBlock.querySelectorAll('span');
wrapLines(uvBlockTextContainer)
const uvBlockTexts = uvBlock.querySelectorAll(".line");

gsap.set(uvBlockTexts, { yPercent: 100, });
function uvProtectionBlockAnimate() {
    const enterTl = gsap.timeline({ paused: true });
    const leaveTl = gsap.timeline({ paused: true });

    enterTl.to(mainBlock, {
        opacity: 0,
        duration: 0.7
    });

    revealBlock(enterTl, uvBlock, uvBlockTexts, 0);

    leaveTl.to(uvBlock, {
        opacity: 0,
        duration: DURATION_SPEED
    })


    return {
        onEnter: () => enterTl.restart(),
        onLeave: () => leaveTl.restart(),
    }
}

function mainBlockAnimate() {
    const enterTl = gsap.timeline({ paused: true });

    enterTl.to(mainBlock, {
        opacity: 1,
        duration: 0.7
    });

    enterTl.to(uvBlock, {
        opacity: 0,
        duration: DURATION_SPEED
    }, "=")

    return {
        onEnter: () => enterTl.restart()
    }
}

// description-block-animation
const avatars = document.querySelector('.avatars');
const avatarPeople = avatars.querySelectorAll('.avatars__people');

const avatarDescription = document.querySelector('.description');
const avatarDescriptionContainer = avatarDescription.querySelectorAll('[data-wrapper]');
const avatarDescriptionButton = avatarDescription.querySelector('button');

wrapLines(avatarDescriptionContainer)
const avatarDescriptionTexts = avatarDescription.querySelectorAll(".line")

gsap.set(avatarDescriptionTexts, { yPercent: 110, });
gsap.set(avatarDescriptionButton, { opacity: 0 });
function descriptionBlockAnimate() {
    const enterTl = gsap.timeline({ paused: true });
    const leaveTl = gsap.timeline({ paused: true });

    // enter animation
    enterTl.to(avatars, {
        opacity: 1,
        duration: DURATION_SPEED
    });

    revealBlock(enterTl, avatarDescription, avatarDescriptionTexts, 0);

    enterTl.to(avatarDescriptionButton, {
        opacity: 1,
        duration: DURATION_SPEED
    }, ">");

    // leave animation
    leaveTl.to(avatars, {
        opacity: 0,
        duration: DURATION_SPEED
    }, "=");

    leaveTl.to(avatarDescription, {
        opacity: 0,
        duration: DURATION_SPEED
    });

    return {
        onEnter: () => enterTl.restart(),
        onLeave: () => leaveTl.restart()
    };
}

// history-block-animation
const historyBlock = document.querySelector('.history');
const historyBlockContainer = historyBlock.querySelectorAll('span');
const historyTextContainer = historyBlock.querySelectorAll('span');
wrapLines(historyBlockContainer)
const historyBlockTexts = historyBlock.querySelectorAll(".line");
gsap.set(historyBlockTexts, { yPercent: 100 });
const mouseContainer = document.querySelector('.mouse-container--last');
function historyBlockAnimate() {
    const enterTl = gsap.timeline({ paused: true });
    const leaveTl = gsap.timeline({ paused: true });

    revealBlock(enterTl, historyBlock, historyBlockTexts, 0);

    leaveTl.to(historyBlock, {
        opacity: 0,
        duration: DURATION_SPEED
    })

    leaveTl.to(mouseContainer, {
        opacity: 1,
        duration: DURATION_SPEED
    })

    return {
        onEnter: () => enterTl.restart(),
        onLeave: () => leaveTl.restart()
    }
}

const fragments = [
    {
        start: 0,
        end: 0,
    },
    {
        start: 0,
        end: 49,
        animationEnter: uvProtectionBlockAnimate().onEnter,
        animationEnterBack: mainBlockAnimate().onEnter,
    },
    {
        start: 49,
        end: 89,
        avatarIndex: 0,
        text: 'Фермерская линейка масла — Voutaktakis.',
        link: 'https://greeklegend.ru/olive-oil/premium_voutaktakis/',
        animationEnter: descriptionBlockAnimate().onEnter,
        animationLeave: uvProtectionBlockAnimate().onLeave,
        animationEnterBack: uvProtectionBlockAnimate().onEnter,
        animationLeaveBack: descriptionBlockAnimate().onLeave,
    },
    {
        start: 89,
        end: 104,
        avatarIndex: 1,
        text: 'Фермерская линейка масла — Papadakis.',
        link: 'https://greeklegend.ru/olive-oil/premium_papadakis/'
    },
    {
        start: 104,
        end: 118,
        avatarIndex: 2,
        text: 'Фермерская линейка масла — Chatzigiorgis.',
        link: 'https://greeklegend.ru/olive-oil/premium_chatzigiorgis/'
    },
    {
        start: 118,
        end: 170,
        animationEnter: historyBlockAnimate().onEnter,
        animationLeave: descriptionBlockAnimate().onLeave,
        animationEnterBack: descriptionBlockAnimate().onEnter,
        animationLeaveBack: historyBlockAnimate().onLeave,
    },
    {
        start: 170,
        end: 240,
        animationLeave: historyBlockAnimate().onLeave,
        animationLeaveBack: historyBlockAnimate().onEnter,
    },
];

// ==== Bottle Block ====
let currentFrame = 0;
const initialFrame = 0;
const totalFrames = 241;

// const imagesSrcPath = isHeroMobile ? '../local/templates/greek/img/components/premium/heroMob' : '../local/templates/greek/img/components/premium/hero';
const imagesSrcPath = isHeroMobile ? 'heroMob' : 'hero1980';
let isPageLoad = false;
const frames = [];
let loaded = 0;

// загрузка картинок отличается в зависимости от устройства
if (isHeroMobile) {
    function loadImage() {
        for (let i = initialFrame; i < totalFrames; i++) {
            const img = new Image();
            img.src = `/${imagesSrcPath}/${String(i).padStart(4, 0)}.webp`;
            img.onload = () => {
                loaded++;
                if (loaded === totalFrames) updateFrame(0);
            };
            frames.push(img);
        }
        console.log("%cВсе кадры загружены", "color: green; font-weight: bold;");
        isPageLoad = true;
    }
    loadImage()
} else {
    async function preloadFrames(batchSize = 60) {
        lockScroll();
        try {
            for (let i = 0; i < totalFrames; i += batchSize) {
                const batch = [];

                for (let j = i; j < i + batchSize && j < totalFrames; j++) {
                    const path = `${imagesSrcPath}/${j.toString().padStart(4, "0")}.webp`;
                    const img = fetch(path)
                        .then(res => res.blob())
                        .then(blob => createImageBitmap(blob));
                    batch.push(img);
                }

                const loadedFrames = await Promise.all(batch);

                for (let j = 0; j < loadedFrames.length; j++) {
                    frames[i + j] = loadedFrames[j];
                }

                if (frames.length > batchSize && !isPageLoad) {
                    isPageLoad = true;
                    unlockScroll();
                    updateFrame(0);
                }
            }
        } catch (e) {
            console.error("Ошибка preloadFrames: " + e);
        }
    }
    preloadFrames()
}

function updateFrame(idx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(frames[idx], 0, 0, canvas.width, canvas.height);
}

gsap.registerPlugin(ScrollTrigger);
let currentIndex = 0;

let isAnimationPlay = false;
ScrollTrigger.create({
    trigger: ".video-wrapper",
    start: "top top",
    end: `+=${fragments.length * (isHeroMobile ? 130 : 80)}%`,
    pin: true,
    scrub: true,
    pinSpacing: true,
    onUpdate: async self => {
        if (!isPageLoad) return;

        const idx = Math.floor(self.progress * fragments.length);

        if (currentIndex !== idx && !isAnimationPlay) {
            currentIndex = idx;

            await playFrames(currentIndex, self.direction);

            unlockScroll();
            isAnimationPlay = false;
        }
    },
});

let animationFrameId;
async function playFrames(index, direction) {
    if (!(fragments.length - 1 === index)) {
        lockScroll();
        isAnimationPlay = true;
        const scrollY = window.scrollY || window.pageYOffset;
        document.body.dataset.scrollY = scrollY;
    }

    const playForward = direction === 1;
    const playReverse = direction === -1;

    const enterBackFrameOffset = index === fragments.length ? index : index + 1;
    let startFrame, endFrame;

    if (playForward) {
        if (!fragments[index]) {
            return
        };

        startFrame = fragments[index].start;
        endFrame = fragments[index].end;
    }

    if (playReverse) {
        if (!fragments[enterBackFrameOffset]) {
            return
        };

        endFrame = fragments[enterBackFrameOffset].start;
        startFrame = fragments[enterBackFrameOffset].end;
    }

    let frameIndex = startFrame;
    const stopFrame = endFrame;

    animate();
    function animate(timestamp) {
        direction === 1 ? frameIndex++ : frameIndex--;
        window.scrollTo(0, scrollY);
        updateFrame(frameIndex);

        if (frameIndex === stopFrame) {
            cancelAnimationFrame(animationFrameId);
            return;
        }

        animationFrameId = requestAnimationFrame(animate);
    }

    if (playForward) {
        changeActiveAvatar(fragments[index]);

        if (fragments[index]?.animationLeave) await fragments[index].animationLeave();
        if (fragments[index]?.animationEnter) await fragments[index].animationEnter();
    }

    if (playReverse) {
        changeActiveAvatar(fragments[index]);

        if (fragments[enterBackFrameOffset]?.animationLeaveBack) await fragments[enterBackFrameOffset].animationLeaveBack();
        if (fragments[enterBackFrameOffset]?.animationEnterBack) await fragments[enterBackFrameOffset].animationEnterBack();
    }

}

const descriptionText = avatarDescription.querySelector(".description__text");
const descriptionStepNumber = avatarDescription.querySelectorAll(".description__step-numbers");
const descriptionStepLink = avatarDescription.querySelector(".description__link")
function changeActiveAvatar(fragment) {
    if (fragment?.avatarIndex === undefined) return;

    avatarPeople.forEach(avatar => avatar.classList.remove('active'));
    avatarPeople[fragment.avatarIndex].classList.add('active');

    descriptionText.textContent = fragment.text;
    descriptionStepLink.href = fragment.link;

    gsap.to(descriptionStepNumber, {
        y: fragment.avatarIndex * -20,
    })
}

document.addEventListener("DOMContentLoaded", () => {
    setCanvasSize();
}, { once: true });

// ==== Scroll Lock ====
function lockScroll() {
    bodyScrollLock.disableBodyScroll(document.body);
}

function unlockScroll() {
    bodyScrollLock.enableBodyScroll(document.body);
    document.body.style.overflowX = 'hidden';
}
