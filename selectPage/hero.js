// ==== Canvas Setup ====
const canvas = document.getElementById("video-frame");
const ctx = canvas.getContext("2d");

const isHeroMobile = window.innerWidth < 1024;

const setCanvasSize = () => {
	const baseWidth = window.innerWidth;
	const baseHeight = isHeroMobile ? Math.round(baseWidth * 1600 / 720) : Math.round(baseWidth * 9 / 16);

	// Use devicePixelRatio for sharper rendering while avoiding massive buffers
	const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
	canvas.width = Math.round(baseWidth * dpr);
	canvas.height = Math.round(baseHeight * dpr);

	canvas.style.width = baseWidth + 'px';
	canvas.style.height = baseHeight + 'px';

	ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
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

    enterTl.to(mainBlock, {
        opacity: 0,
        duration: 0.7
    });

    revealBlock(enterTl, uvBlock, uvBlockTexts, 0);

    enterTl.to({}, { duration: 0.5 });

    enterTl.to(uvBlock, {
        opacity: 0,
        duration: DURATION_SPEED
    })

    return enterTl
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

    return enterTl;
}

// description-block-animation
const avatarInfo = [
    {
        avatarIndex: 0,
        text: 'Фермерская линейка масла — Voutaktakis.',
        link: 'https://greeklegend.ru/olive-oil/select_voutaktakis/',
    },
    {
        avatarIndex: 1,
        text: 'Фермерская линейка масла — Papadakis.',
        link: 'https://greeklegend.ru/olive-oil/select_papadakis/'
    },
    {
        avatarIndex: 2,
        text: 'Фермерская линейка масла — Chatzigiorgis.',
        link: 'https://greeklegend.ru/olive-oil/select_chatzigiorgis/'
    }
]

const avatars = document.querySelector('.avatars');
const avatarPeople = avatars.querySelectorAll('.avatars__people');

const avatarDescription = document.querySelector('.description');
const avatarDescriptionContainer = avatarDescription.querySelectorAll('[data-wrapper]');
const avatarDescriptionButton = avatarDescription.querySelector('button');

const descriptionText = avatarDescription.querySelector(".description__text");
const descriptionStepLink = avatarDescription.querySelector(".description__link");


wrapLines(avatarDescriptionContainer)
const avatarDescriptionTexts = avatarDescription.querySelectorAll(".line");

const descriptionStepNumber = avatarDescription.querySelector(".description__step-numbers");
console.log('descriptionStepNumber', descriptionStepNumber)

gsap.set(avatarDescriptionTexts, { yPercent: 110, });
gsap.set(avatarDescriptionButton, { opacity: 0 });
function descriptionBlockAnimate() {
    const enterTl = gsap.timeline({ paused: true });

    enterTl.to(avatars, {
        opacity: 1,
        duration: DURATION_SPEED
    });

    revealBlock(enterTl, avatarDescription, avatarDescriptionTexts, 0);

    enterTl.to(avatarDescriptionButton, {
        opacity: 1,
        duration: DURATION_SPEED
    }, ">");

    enterTl.to({}, { duration: 0.5 });

    enterTl.add(() => {
        descriptionText.textContent = avatarInfo[0].text;
        descriptionStepLink.href = avatarInfo[0].link;
    });

    enterTl.to(descriptionStepNumber, {
        y: 0,
    });

    enterTl.set(avatarPeople[0], { className: "avatars__people" });
    enterTl.set(avatarPeople[1], { className: "avatars__people active" });
    enterTl.add(() => {
        descriptionText.textContent = avatarInfo[1].text;
        descriptionStepLink.href = avatarInfo[1].link;
    });

    enterTl.to(descriptionStepNumber, {
        y: 1 * -20,
    });

    enterTl.to({}, { duration: 0.5 });

    enterTl.set(avatarPeople[1], { className: "avatars__people" });
    enterTl.set(avatarPeople[2], { className: "avatars__people active" });
    enterTl.add(() => {
        descriptionText.textContent = avatarInfo[2].text;
        descriptionStepLink.href = avatarInfo[2].link;
    });

    enterTl.to(descriptionStepNumber, {
        y: 2 * -20,
    });

    enterTl.to({}, { duration: 0.5 });

    enterTl.to(avatars, {
        opacity: 0,
        duration: DURATION_SPEED
    });

    enterTl.to(avatarDescription, {
        opacity: 0,
        duration: DURATION_SPEED
    });

    return enterTl;
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

    revealBlock(enterTl, historyBlock, historyBlockTexts, 0);

    enterTl.to({}, { duration: 0.5 });

    enterTl.to(historyBlock, {
        opacity: 0,
        duration: DURATION_SPEED
    })

    enterTl.to(mouseContainer, {
        opacity: 1,
        duration: DURATION_SPEED
    })

    return enterTl;
}

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

const fragments = [
    // uvProtectionBlockAnimate
    {
        start: 0,
        end: 89,
    },
    // descriptionBlockAnimate
    {
        start: 89,
        end: 118,
    },
    // historyBlockAnimate
    {
        start: 118,
        end: 170,
    },
    // empty block
    {
        start: 170,
        end: 240,
    },
];

// ==== Bottle Block ====
let currentFrame = 0;
const initialFrame = 0;
const totalFrames = 241;

// const imagesSrcPath = isHeroMobile ? '../local/templates/greek/img/components/premium/heroMob' : '../local/templates/greek/img/components/premium/hero';
const imagesSrcPath = isHeroMobile ? 'selectPage/heroMob' : 'hero1980';
let isPageLoad = false;

// Optimized frame loader with prioritization and limited concurrency
const frames = new Array(totalFrames);
const inFlight = new Map(); // idx -> Promise
const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
const MAX_CONCURRENCY = (() => {
	if (!connection) return 6;
	const type = connection.effectiveType || '';
	if (type.includes('2g')) return 2;
	if (type.includes('3g')) return 4;
	return 8;
})();
let activeLoads = 0;
const queue = [];

function getFramePath(i) {
	return `${imagesSrcPath}/${String(i).padStart(4, '0')}.webp`;
}

function enqueue(index, priority = false) {
	if (index < 0 || index >= totalFrames) return;
	if (frames[index]) return;
	if (inFlight.has(index)) return;
	if (priority) {
		queue.unshift(index);
	} else {
		queue.push(index);
	}
	processQueue();
}

async function fetchAsBitmap(path) {
	const res = await fetch(path, { credentials: 'same-origin' });
	const blob = await res.blob();
	if ("createImageBitmap" in window) {
		return await createImageBitmap(blob);
	}
	return await new Promise((resolve, reject) => {
		const img = new Image();
		img.onload = () => resolve(img);
		img.onerror = reject;
		img.src = URL.createObjectURL(blob);
	});
}

function loadFrame(index) {
	if (frames[index]) return Promise.resolve(frames[index]);
	if (inFlight.has(index)) return inFlight.get(index);
	const path = getFramePath(index);
	const p = fetchAsBitmap(path)
		.then(image => {
			frames[index] = image;
			inFlight.delete(index);
			return image;
		})
		.catch(err => {
			inFlight.delete(index);
			throw err;
		});
	inFlight.set(index, p);
	return p;
}

function processQueue() {
	while (activeLoads < MAX_CONCURRENCY && queue.length > 0) {
		const idx = queue.shift();
		if (frames[idx] || inFlight.has(idx)) continue;
		activeLoads++;
		loadFrame(idx)
			.catch(() => {})
			.finally(() => {
				activeLoads--;
				if ('requestIdleCallback' in window) {
					requestIdleCallback(() => processQueue());
				} else {
					setTimeout(processQueue, 0);
				}
			});
	}
}

function primeInitialFrames() {
	lockScroll();
	// Paint first frame ASAP
	loadFrame(0)
		.then(() => {
			updateFrame(0);
			if (!isPageLoad) {
				isPageLoad = true;
				unlockScroll();
			}
		})
		.finally(() => {
			// Warm up the next frames sequentially by proximity
			const order = [];
			for (let i = 1; i < totalFrames; i++) order.push(i);
			order.forEach(i => enqueue(i));
		});
}

function prefetchAround(index, radius = isHeroMobile ? 6 : 12) {
	for (let r = 1; r <= radius; r++) {
		enqueue(index + r, true);
		enqueue(index - r, true);
	}
}

primeInitialFrames();

function updateFrame(idx) {
	if (idx < 0 || idx >= totalFrames) return;
	const frame = frames[idx];
	if (!frame) return; // not ready yet
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.drawImage(frame, 0, 0, canvas.width, canvas.height);
}

gsap.registerPlugin(ScrollTrigger);

const sections = document.querySelectorAll('.section');
const blockTls = [
    { animation: uvProtectionBlockAnimate },
    { animation: descriptionBlockAnimate },
    { animation: historyBlockAnimate },
    { animation: null }
]

// Для каждой секции готовим таймлайн-анимацию (paused!)
const sectionTLS = Array.from(sections).map((section, i) => {
    const fragment = fragments[i];

    if (blockTls[i]?.animation) {
        return blockTls[i]?.animation();
    }

    return gsap.timeline({ paused: true })
});

let isAnimationPlay = false;
ScrollTrigger.create({
    trigger: ".video-wrapper",
    start: "top top",
    end: `+=${fragments.length * (isHeroMobile ? 130 : 80)}%`,
    pin: true,
    scrub: true,
    pinSpacing: true,
    onUpdate: async self => {
        const progress = self.progress;
        const frameIndex = Math.min(
            totalFrames - 1,
            Math.floor(self.progress * totalFrames)
        );

		// Draw if ready, otherwise ensure it's loading and try nearest previous cached frame
		if (frames[frameIndex]) {
			updateFrame(frameIndex);
		} else {
			enqueue(frameIndex, true);
			for (let i = frameIndex - 1; i >= 0; i--) {
				if (frames[i]) { updateFrame(i); break; }
			}
		}
		prefetchAround(frameIndex);

        // 1. Находим активный фрагмент по frameIndex
        let sectionIndex = fragments.findIndex(
            f => frameIndex >= f.start && frameIndex <= f.end
        );
        if (sectionIndex === -1) return; // вне диапазонов

        const fragment = fragments[sectionIndex];
        // 2. Считаем локальный прогресс в секции:
        const sectionProgress = (frameIndex - fragment.start) / (fragment.end - fragment.start || 1); // деление на 0 не прокатит

        // 4. Ходим по всем таймлайнам секций (sectionTLS на том же индексе что и fragment)
        sectionTLS.forEach((tl, i) => {
            tl.pause();
            if (i < sectionIndex) {
                tl.progress(1);       // проиграно полностью, если нужно
            } else if (i === sectionIndex) {
                tl.progress(sectionProgress); // синхронно со скроллом
            } else {
                tl.progress(0);      // ещё не началось
            }
        });
    },
});

const progressNames = {
    progress: 'Прогресс: ',
    frameIndex: 'Индекс фрейма: ',
    sectionIndex: 'Section Index:',
    sectionProgress: 'Section Progress',
    fragmentIndex: 'Индекс фрагмента: ',
    currentIndex: 'Текущий индекс фрагмента: ',
    direction: 'Направление: '
}
const progressEl = document.getElementById('progress-value');
function progressBlockValues(values) {
    progressEl.textContent = Object.entries(values)
        .map(([key, value]) => `${progressNames[key]}: ${value}`)
        .join(';\n');
}

// EventListener
document.addEventListener("DOMContentLoaded", () => {
    setCanvasSize();
}, { once: true });

window.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") {
        ScrollTrigger.refresh(true); // true - форсить пересчёт размеров/пинов
        ScrollTrigger.update();
    }
});

window.addEventListener('resize', () => {
    ScrollTrigger.refresh();
    ScrollTrigger.update();
});

// ==== Scroll Lock ====
function lockScroll() {
    bodyScrollLock.disableBodyScroll(document.body);
}

function unlockScroll() {
    bodyScrollLock.enableBodyScroll(document.body);
    document.body.style.overflowX = 'hidden';
}
