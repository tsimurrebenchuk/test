const SIZES = {
    // 134 × 134 — size-xs — .size--xs
    // 178 × 178 — size-sm — .size--sm
    // 213 × 213 — size-md — .size--md
    // 292 × 292 — size-lg — .size--lg
    // 371 × 371 — size-xl — .size--xl
    // 450 × 450 — size-xxl — .size--xxl
}

const VITAMINS = [
    { hoverText: 'Антивозрастной<br> антиоксидант', name: 'Лигстразид', value: '', size: 'sm', top: -370, left: 461, depth: 1 },
    { hoverText: 'Антивозрастной<br> антиоксидант', name: 'Витамин А', value: '', size: 'md', top: -236, left: 311, depth: 2 },
    { hoverText: 'Антивозрастной<br> антиоксидант', name: 'Витамин K', value: '', size: 'md', top: -216, left: -307, depth: 1 },
    { hoverText: 'Антивозрастной', name: 'Витамин P', value: '', size: 'md', top: -354, left: -436, depth: 2 },
    { hoverText: 'Антивозрастной', name: 'Гидрокситирозол', value: '', size: 'xl', top: -34, left: -750, depth: 1 },
    { hoverText: 'Антивозрастной', name: 'тирозол', value: '', size: 'xs', left: 632, top: 133, depth: 1 },
    { hoverText: 'Антивозрастной', name: 'Витамин Е', value: '', size: 'lg', top: -41, left: 474, depth: 4 },
    { hoverText: 'Антивозрастной', name: 'Олеуропеин', value: '', size: 'lg', top: -137, left: 710, depth: 3 },
    { hoverText: 'Антивозрастной', name: 'Витамины группы B<br> (B1, B2, B6)', value: '', size: 'xxl', top: 320, left: -631, depth: 2 },
    { hoverText: 'Антивозрастной', name: 'Витамин C', value: '', size: 'md', top: 286, left: 830, depth: 2 },
    { hoverText: 'Антивозрастной', name: 'Витамин D', value: '', size: 'md', top: 458, left: 435, depth: 2 },
];

const DEFAULT_DURATION = .2;

const vitaminsContainer = document.querySelector('.vitamins__container');
VITAMINS.forEach(vitamin => {
    const node = document.createElement('div');

    node.classList.add('parallax-item');

    node.classList.add('bottle__vitamins');
    node.classList.add(`bottle__vitamins--${vitamin.size}`);

    const textNode = document.createElement('p');
    textNode.innerHTML = vitamin.name;
    node.appendChild(textNode);

    node.dataset.depth = vitamin.depth;

    node.style.top = `${vitamin.top}px`;
    node.style.left = `${vitamin.left}px`;

    const tl = gsap.timeline();
    node.addEventListener('mouseenter', () => {
        tl.clear();
        tl.to(textNode, { opacity: 0, duration: DEFAULT_DURATION, })
            .add(() => { textNode.innerHTML = vitamin.hoverText; })
            .to(textNode, { opacity: 1, duration: DEFAULT_DURATION, });
        tl.play();
    });

    node.addEventListener('mouseleave', () => {
        tl.clear();
        tl.to(textNode, { opacity: 0, duration: DEFAULT_DURATION, })
            .add(() => { textNode.innerHTML = vitamin.name; })
            .to(textNode, { opacity: 1, duration: DEFAULT_DURATION, });
        tl.play();
    });

    vitaminsContainer.appendChild(node);
})

const area = document.querySelector('.parallax-area');
const items = gsap.utils.toArray('.parallax-item');
const MAX = 40;

area.addEventListener('mousemove', e => {
    const rect = area.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    items.forEach(item => {
        const depth = item.dataset.depth;
        const tx = x * MAX * depth * -1;
        const ty = y * MAX * depth * -1;
        // плавное сглаживание
        gsap.to(item, { x: tx, y: ty, duration: 0.7, ease: 'power3.out', overwrite: true });
    });
});

area.addEventListener('mouseleave', () => {
    items.forEach(item => gsap.to(item, { x: 0, y: 0, duration: 0.6, ease: 'power3.out', overwrite: true }));
});