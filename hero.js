// ==== Canvas Setup ====
const canvas = document.getElementById("video-frame");
const ctx = canvas.getContext("2d");

const isHeroMobile = window.innerWidth < 1024;

const setCanvasSize = () => {
    const baseWidth = window.innerWidth;
    const baseHeight = isHeroMobile ? Math.round(baseWidth * 1600 / 720) : Math.round(baseWidth * 9 / 16);

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
        link: 'https://greeklegend.ru/olive-oil/premium_voutaktakis/',
    },
    {
        avatarIndex: 1,
        text: 'Фермерская линейка масла — Papadakis.',
        link: 'https://greeklegend.ru/olive-oil/premium_papadakis/'
    },
    {
        avatarIndex: 2,
        text: 'Фермерская линейка масла — Chatzigiorgis.',
        link: 'https://greeklegend.ru/olive-oil/premium_chatzigiorgis/'
    }
]

const avatars = document.querySelector('.avatars');
const avatarPeople = avatars.querySelectorAll('.avatars__people');

const avatarDescription = document.querySelector('.description');
const avatarDescriptionContainer = avatarDescription.querySelectorAll('[data-wrapper]');
const avatarDescriptionButton = avatarDescription.querySelector('button');

const descriptionText = avatarDescription.querySelector(".description__text");
const descriptionStepNumber = avatarDescription.querySelectorAll(".description__step-numbers");
const descriptionStepLink = avatarDescription.querySelector(".description__link")

wrapLines(avatarDescriptionContainer)
const avatarDescriptionTexts = avatarDescription.querySelectorAll(".line")

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
const imagesSrcPath = isHeroMobile ? 'heroMob' : 'hero1980';
let isPageLoad = false;
const frames = [];
let loaded = 0;

// Loader logic
const loaderEl = document.getElementById("site-loader");
function updateLoader() {
  loaded++;

  if (loaded === totalFrames) {
    onLoadingComplete();
  }
}
function onLoadingComplete() {
  console.log("Loading complete.");
  isPageLoad = true;
  updateFrame(0);

  const tl = gsap.timeline({
    onComplete: () => {
      loaderEl.style.display = "none";
      document.documentElement.classList.remove("stop-scrolling");
      document.body.classList.remove("stop-scrolling");
      ScrollTrigger.refresh();
    },
  });

  tl.to(".spinner", {
    opacity: 0,
    duration: 0.5,
    ease: "power2.inOut",
  });

  tl.to(
    loaderEl,
    {
      opacity: 0,
      duration: 1.2,
      ease: "power2.inOut",
    },
    "-=0.2",
  );
}

// загрузка картинок отличается в зависимости от устройства
if (isHeroMobile) {
  function loadImage() {
    for (let i = initialFrame; i < totalFrames; i++) {
      const img = new Image();
      img.src = `${imagesSrcPath}/${String(i).padStart(4, 0)}.webp`;
      img.onload = () => {
        frames[i] = img;
        updateLoader();
      };
      img.onerror = () => {
        console.log("error frame " + i);
        updateLoader();
      };
    }
  }
  loadImage();
} else {
  async function preloadFrames(batchSize = 60) {
    try {
      for (let i = 0; i < totalFrames; i += batchSize) {
        const batch = [];

        for (let j = i; j < i + batchSize && j < totalFrames; j++) {
          const path = `${imagesSrcPath}/${j.toString().padStart(4, "0")}.webp`;
          const img = fetch(path)
            .then((res) => res.blob())
            .then((blob) => createImageBitmap(blob))
            .then((bitmap) => {
              frames[j] = bitmap;
              updateLoader();
              return bitmap;
            });
          batch.push(img);
        }
        await Promise.all(batch);
      }
    } catch (e) {
      console.error("Ошибка preloadFrames: " + e);
      if (!isPageLoad) onLoadingComplete();
    }
  }
  preloadFrames();
}

function updateFrame(idx) {
    if (frames[idx] === undefined) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(frames[idx], 0, 0, canvas.width, canvas.height);
}

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.normalizeScroll(true);
ScrollTrigger.config({
  ignoreMobileResize: true,
});

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
    id: "hero-scroll",
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

        updateFrame(frameIndex);

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
});
