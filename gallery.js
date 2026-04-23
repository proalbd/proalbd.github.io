// ছবির ডেটাবেস
const rawGalleryData = [
    { id: 1, src: "./assets/fb-posts/1.jpg" },
    { id: 2, src: "./assets/fb-posts/2.jpg" },
    { id: 3, src: "./assets/fb-posts/3.jpg" },
    { id: 4, src: "./assets/fb-posts/4.jpg" },
    { id: 5, src: "./assets/fb-posts/5.jpg" },
    { id: 6, src: "./assets/fb-posts/6.jpg" },
    { id: 7, src: "./assets/fb-posts/7.jpg" },
    { id: 8, src: "./assets/fb-posts/8.jpg" },
    { id: 9, src: "./assets/fb-posts/9.jpg" },
    { id: 10, src: "./assets/fb-posts/10.jpg" },
    { id: 11, src: "./assets/fb-posts/11.jpg" },
    { id: 12, src: "./assets/fb-posts/12.jpg" },
    { id: 13, src: "./assets/fb-posts/13.jpg" },
    { id: 14, src: "./assets/fb-posts/14.jpg" },
    { id: 15, src: "./assets/fb-posts/15.jpg" },
    { id: 16, src: "./assets/fb-posts/16.jpg" },
    { id: 17, src: "./assets/fb-posts/17.jpg" },
    { id: 18, src: "./assets/fb-posts/18.jpg" },
    { id: 19, src: "./assets/fb-posts/19.jpg" },
    { id: 20, src: "./assets/fb-posts/20.jpg" },
    { id: 21, src: "./assets/fb-posts/21.jpg" },
    { id: 22, src: "./assets/fb-posts/22.jpg" },
    { id: 23, src: "./assets/fb-posts/23.jpg" },
    { id: 24, src: "./assets/fb-posts/24.jpg" },
    { id: 25, src: "./assets/fb-posts/25.jpg" },
    { id: 26, src: "./assets/fb-posts/26.jpg" },
    { id: 27, src: "./assets/fb-posts/27.jpg" },
    { id: 28, src: "./assets/fb-posts/28.jpg" },
    { id: 29, src: "./assets/fb-posts/29.jpg" },
    { id: 30, src: "./assets/fb-posts/30.jpg" },
    { id: 31, src: "./assets/fb-posts/31.jpg" },
    { id: 32, src: "./assets/fb-posts/32.jpg" },
    { id: 33, src: "./assets/fb-posts/33.jpg" },
    { id: 34, src: "./assets/fb-posts/34.jpg" },
    { id: 35, src: "./assets/fb-posts/35.jpg" },
    { id: 36, src: "./assets/fb-posts/36.jpg" },
    { id: 37, src: "./assets/fb-posts/37.jpg" },
    { id: 38, src: "./assets/fb-posts/38.jpg" },
    { id: 39, src: "./assets/fb-posts/39.jpg" },
    { id: 40, src: "./assets/fb-posts/40.jpg" },
    { id: 41, src: "./assets/fb-posts/41.jpg" },
    { id: 42, src: "./assets/fb-posts/42.jpg" },
    { id: 43, src: "./assets/fb-posts/43.jpg" },
    { id: 44, src: "./assets/fb-posts/44.jpg" },
    { id: 45, src: "./assets/fb-posts/45.jpg" },
    { id: 46, src: "./assets/fb-posts/46.jpg" },
    { id: 47, src: "./assets/fb-posts/47.jpg" },
    { id: 48, src: "./assets/fb-posts/48.jpg" },
    { id: 49, src: "./assets/fb-posts/49.jpg" },
    { id: 50, src: "./assets/fb-posts/50.jpg" },
    { id: 51, src: "./assets/fb-posts/51.jpg" },
    { id: 52, src: "./assets/fb-posts/52.jpg" }
];

const galleryData = [...rawGalleryData].reverse();

let slideIndex = 0;
let slideInterval;
let isGridView = false;

// init
function initGallery() {
    renderSlide();
    renderGrid();
    startSlideshow();
}

// slideshow render
function renderSlide() {
    const wrapper = document.getElementById('slide-image-wrapper');
    const currentImg = galleryData[slideIndex];

    wrapper.innerHTML = `
        <img src="${currentImg.src}" 
        class="w-full h-full object-cover cursor-pointer"
        onclick="openFullscreen(${slideIndex})">
    `;

    const dotsContainer = document.getElementById('slide-indicators');
    dotsContainer.innerHTML = '';

    galleryData.forEach((_, idx) => {
        const dot = document.createElement('div');
        dot.className = `w-3 h-3 rounded-full cursor-pointer ${idx === slideIndex ? 'bg-albd-red w-6' : 'bg-white/50'}`;
        dot.onclick = () => goToSlide(idx);
        dotsContainer.appendChild(dot);
    });
}

// slide control
function changeSlide(n) {
    slideIndex = (slideIndex + n + galleryData.length) % galleryData.length;
    renderSlide();
    resetSlideshowTimer();
}

function goToSlide(n) {
    slideIndex = n;
    renderSlide();
    resetSlideshowTimer();
}

// slideshow auto
function startSlideshow() {
    slideInterval = setInterval(() => changeSlide(1), 3000);
}

function resetSlideshowTimer() {
    clearInterval(slideInterval);
    if (!isGridView) startSlideshow();
}

// grid
function renderGrid() {
    const gridContainer = document.getElementById('all-images-grid');
    gridContainer.innerHTML = '';

    galleryData.forEach((img, index) => {
        gridContainer.innerHTML += `
            <div class="rounded-lg overflow-hidden shadow-lg cursor-pointer">
                <img src="${img.src}" 
                class="w-full h-64 object-cover"
                onclick="openFullscreen(${index})">
            </div>
        `;
    });
}

// toggle
function toggleGallery() {
    isGridView = !isGridView;

    const slideshow = document.getElementById('slideshow-container');
    const grid = document.getElementById('all-images-grid');
    const btn = document.getElementById('toggle-gallery-btn');

    if (isGridView) {
        slideshow.classList.add('hidden');
        grid.classList.remove('hidden');
        btn.innerText = 'স্লাইডশো দেখুন';
        clearInterval(slideInterval);
    } else {
        slideshow.classList.remove('hidden');
        grid.classList.add('hidden');
        btn.innerText = 'সবগুলো দেখুন';
        startSlideshow();
    }
}

// fullscreen
let currentFullIndex = 0;

function openFullscreen(index) {
    currentFullIndex = index;

    const viewer = document.getElementById('fullscreen-viewer');
    const img = document.getElementById('fullscreen-img');

    img.src = galleryData[index].src;
    viewer.classList.remove('hidden');
    viewer.classList.add('flex');
}

function closeFullscreen() {
    const viewer = document.getElementById('fullscreen-viewer');
    viewer.classList.add('hidden');
    viewer.classList.remove('flex');
}

// next prev in fullscreen
function nextFullscreen(n) {
    currentFullIndex = (currentFullIndex + n + galleryData.length) % galleryData.length;
    document.getElementById('fullscreen-img').src = galleryData[currentFullIndex].src;
}

// swipe support
let startX = 0;

document.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
});

document.addEventListener('touchend', e => {
    let endX = e.changedTouches[0].clientX;
    let diff = startX - endX;

    if (Math.abs(diff) > 50) {
        if (diff > 0) nextFullscreen(1);
        else nextFullscreen(-1);
    }
});

// click events
window.onload = () => {
    initGallery();

    document.getElementById('close-fullscreen').onclick = closeFullscreen;

    document.getElementById('fullscreen-viewer').onclick = (e) => {
        if (e.target.id === 'fullscreen-viewer') closeFullscreen();
    };
};


// button controls
document.getElementById('prev-fullscreen').onclick = (e) => {
    e.stopPropagation();
    nextFullscreen(-1);
};

document.getElementById('next-fullscreen').onclick = (e) => {
    e.stopPropagation();
    nextFullscreen(1);
};

// keyboard control
document.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') nextFullscreen(1);
    if (e.key === 'ArrowLeft') nextFullscreen(-1);
    if (e.key === 'Escape') closeFullscreen();
});