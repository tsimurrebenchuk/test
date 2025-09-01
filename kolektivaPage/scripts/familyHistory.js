const swiperContainer = document.querySelector('.js-family-history-slider .swiper-wrapper');
const swiperFamilySlide = swiperContainer.querySelectorAll('.swiper-slide');

class VideoPlayer {
    constructor(parentNode) {
        this.parentNode = parentNode;
        this.videoNode = parentNode.querySelector('video');

        this.controls = {
            doubleSpeed: parentNode.querySelector('[data-double-speed]'),
            play: parentNode.querySelector('[data-play]'),
            mute: parentNode.querySelector('[data-mute]'),
        }

        this.init();
    }

    init() {
        this._doubleSpeed();
        this._play();
        this._mute();
    }

    _doubleSpeed() {
        this.controls.doubleSpeed.addEventListener('click', () => {
            this.videoNode.playbackRate === 1 ? this.videoNode.playbackRate = 2 : this.videoNode.playbackRate = 1;
            this.controls.doubleSpeed.classList.toggle('active');
        })
    }

    _play() {
        this.controls.play.addEventListener('click', () => {
            this.videoNode.paused ? this.videoNode.play() : this.videoNode.pause();
            this.controls.play.classList.toggle('active');
        })
    }

    _mute() {
        this.controls.mute.addEventListener('click', () => {
            this.videoNode.muted ? this.videoNode.muted = false : this.videoNode.muted = true;
            this.controls.mute.classList.toggle('active');
        })
    }
}

swiperFamilySlide.forEach(node => new VideoPlayer(node));