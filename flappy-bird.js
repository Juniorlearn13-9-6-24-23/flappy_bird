const canvasEl = document.getElementById('canvas');
const ctx = canvasEl.getContext('2d');

let pipes = [
    {
        x: 290,
        h: 150,
        d: 70,
    },
];

// 52 laf chiều rộng ống
function addRandomPipe() {
    let x =
        pipes[pipes.length - 1].x + 52 + Math.floor(Math.random() * 30 + 40);
    let d = Math.floor(Math.random() * 25 + 35);
    let maxh = 400 - d - 30;
    let h = Math.floor(Math.random() * (maxh - 30) + 30);
}

for (let i = 0; i < 4; i++) {
    addRandomPipe();
}
pipe = {
    x: 130,
    h: 150,
    d: 70,
};

const bird = {
    x: 3,
    y: 491,
    id: 0,
    id: 100,
};

let lastTimeUpdate = 0;
let pageFlipV = 20;
let landShift = 0;
let backGround = 0;

const img = new Image();
img.src = 'flappybird.png';

function clearScreen() {
    ctx.clearRect(0, 0, 288, 512);
}

function drawStartScreen() {
    // Bg
    ctx.save();
    ctx.translate(-backGround, 0);
    ctx.drawImage(img, 0, 0, 144, 256, 0, 0, 288, 512);
    ctx.drawImage(img, 0, 0, 144, 256, 235, 0, 288, 512);
    ctx.restore();
    // ctx.drawImage(img, xs, ys, ws, hs, xd, yd, wd, hd);
    // s là gốc
    // h là đích
    // Bird
    ctx.drawImage(img, bird.x, bird.y, 17, 12, 144 - 17, 150, 34, 24);

    // Land
    ctx.save();
    ctx.translate(-landShift, 0);

    ctx.drawImage(img, 292, 0, 168, 56, 0, 400, 236, 112);
    ctx.drawImage(img, 292, 0, 168, 56, 235, 400, 236, 112);

    ctx.restore();

    // Start
    ctx.drawImage(img, 354, 118, 52, 29, 20, 342, 104, 58);
    // Rank
    ctx.drawImage(img, 414, 118, 52, 29, 160, 342, 104, 58);
    // Rate
    ctx.drawImage(img, 465, 1, 31, 18, 110, 240, 62, 36);
    // Flappy Bird
    ctx.drawImage(img, 351, 91, 89, 24, 60, 80, 168, 48);

    // // Draw pipe
    // ctx.drawImage(img, 56, 323, 26, 160, pipe.x, 0, 52, pipe.h);
    // ctx.drawImage(
    //     img,
    //     84,
    //     323,
    //     26,
    //     160,
    //     pipe.x,
    //     pipe.h + pipe.d,
    //     52,
    //     400 - pipe.h - pipe.d
    // );
}

function updateStartScreen() {
    if (lastTimeUpdate === 0) lastTimeUpdate = Date.now();
    if (Date.now() - lastTimeUpdate >= 1000 / pageFlipV) {
        bird.id = (bird.id + 1) % 3;
        switch (bird.id) {
            case 0:
                bird.x = 87;
                bird.y = 491;
                break;
            case 1:
                bird.x = 115;
                bird.y = 329;
                break;
            case 2:
                bird.x = 115;
                bird.y = 355;
                break;
        }
        lastTimeUpdate = Date.now();
    }

    landShift = (landShift + 1) % 184;
    backGround = (backGround + 1) % 184;
}

// Màn hình bắt đầu
function drawPlayingScreen() {
    // Bg
    ctx.save();
    ctx.translate(-backGround, 0);
    ctx.drawImage(img, 0, 0, 144, 256, 0, 0, 288, 512);
    ctx.drawImage(img, 0, 0, 144, 256, 235, 0, 288, 512);
    ctx.restore();
    // ctx.drawImage(img, xs, ys, ws, hs, xd, yd, wd, hd);
    // s là gốc
    // h là đích
    // Bird
    ctx.drawImage(img, bird.x, bird.y, 17, 12, 60, 180, 34, 24);

    // Land
    ctx.save();
    ctx.translate(-landShift, 0);

    ctx.drawImage(img, 292, 0, 168, 56, 0, 400, 236, 112);
    ctx.drawImage(img, 292, 0, 168, 56, 235, 400, 236, 112);

    ctx.restore();

    // Draw pipe
    ctx.drawImage(img, 56, 323, 26, 160, pipe.x, 0, 52, pipe.h);
    ctx.drawImage(
        img,
        84,
        323,
        26,
        160,
        pipe.x,
        pipe.h + pipe.d,
        52,
        400 - pipe.h - pipe.d
    );
}

function updatePlayingScreen() {
    if (lastTimeUpdate === 0) lastTimeUpdate = Date.now();
    if (Date.now() - lastTimeUpdate >= 1000 / pageFlipV) {
        bird.id = (bird.id + 1) % 3;
        switch (bird.id) {
            case 0:
                bird.x = 87;
                bird.y = 491;
                break;
            case 1:
                bird.x = 115;
                bird.y = 329;
                break;
            case 2:
                bird.x = 115;
                bird.y = 355;
                break;
        }
        lastTimeUpdate = Date.now();
    }

    landShift = (landShift + 1) % 184;
    backGround = (backGround + 1) % 184;
}

function animation() {
    clearScreen();
    // drawStartScreen();
    // updateStartScreen();
    drawPlayingScreen();
    updatePlayingScreen();

    requestAnimationFrame(animation);
}

img.onload = () => {
    animation();
};
