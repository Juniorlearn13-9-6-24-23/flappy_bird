const canvasEl = document.getElementById('canvas');
const ctx = canvasEl.getContext('2d');

const img = new Image();
img.src = 'flappybird.png';
let pageFlipV = 20;
let sceneIdx = 0;
let score, gameOver, lastTimeUpdate, landShift, backGround, pipes, bird;
function init() {
    pipes = [
        {
            x: 290,
            h: 150,
            d: 70,
            scored: false,
        },
    ];
    console.log(pipes);
    for (let i = 0; i < 4; i++) {
        addRandomPipe();
    }

    bird = {
        x: 3,
        y: 491,
        id: 0,
        yd: 100,
        xd: 50,
        dir: 1,
    };

    score = 0;
    gameOver = false;
    lastTimeUpdate = 0;
    landShift = 0;
    backGround = 0;
}

// 52 laf chiều rộng ống
function addRandomPipe() {
    let x =
        pipes[pipes.length - 1].x + 52 + Math.floor(Math.random() * 30 + 90);
    let d = Math.floor(Math.random() * 25 + 60);
    let shiftD = Math.random() * 20 + 10;
    let shiftDir = Math.random() > 0.5 ? 1 : -1;
    let h = pipes[pipes.length - 1].h + shiftD * shiftDir;
    if (h < 30 || h + d > 470) {
        h = pipes[pipes.length - 1].h + shiftD * shiftDir * -1;
    }
    // let maxh = 400 - d - 30;
    // let h = Math.floor(Math.random() * (maxh - 30) + 30);
    pipes.push({
        x,
        d,
        h,
        scored: false,
    });
}

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
    ctx.drawImage(img, bird.x, bird.y, 17, 12, bird.xd, bird.yd, 34, 24);

    // Land
    ctx.save();
    ctx.translate(-landShift, 0);

    ctx.drawImage(img, 292, 0, 168, 56, 0, 400, 236, 112);
    ctx.drawImage(img, 292, 0, 168, 56, 235, 400, 236, 112);

    ctx.restore();

    // Draw pipe
    pipes.forEach((pipe) => {
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
    });

    if (gameOver) {
        ctx.drawImage(img, 3, 259, 113, 57, 144 - 113, 200 - 57, 226, 114);
        ctx.drawImage(img, 121, 282, 22, 22, 64 - 8, 191 - 3, 44, 44);
        ctx.font = '18px serif';
        ctx.fillText(score, 210, 190);
        //draw score
    }
}

function updatePlayingScreen() {
    if (!gameOver) {
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
        // Muốn rơi nhanh thì tăng số 1
        bird.yd = bird.yd + bird.dir * 2;

        landShift = (landShift + 1) % 184;
        backGround = (backGround + 1) % 184;

        pipes.forEach((pipe) => {
            pipe.x = pipe.x - 1;
        });

        //remove passed pipes and add new pipes
        if (pipes[0].x + 52 < 0) {
            pipes.shift();
            addRandomPipe();
        }
    }
}

function checkGameOver() {
    if (bird.yd + 24 >= 400) gameOver = true;
    for (let i = 0; i < pipes.length; i++) {
        let pipe = pipes[i];
        if (
            bird.xd + 34 >= pipe.x &&
            bird.xd <= pipe.x + 52 &&
            (bird.yd <= pipe.h || bird.yd + 24 >= pipe.h + pipe.d)
        )
            gameOver = true;
        break;
    }
}

function updateScore() {
    pipes.forEach((pipe) => {
        if (pipe.x + 52 < bird.xd && !pipe.scored) {
            console.log('new score');
            score++;
            pipe.scored = true;
        }
    });
}

function animation() {
    clearScreen();
    if (sceneIdx == 0) {
        drawStartScreen();
        updateStartScreen();
    } else {
        updateScore();
        // if (gameOver) console.log(score);
        drawPlayingScreen();
        updatePlayingScreen();
        checkGameOver();
    }

    requestAnimationFrame(animation);
}

init();
img.onload = () => {
    animation();
};

document.onkeydown = (evt) => {
    if (evt.key === ' ') {
        console.log(evt.key);
        bird.dir = -1;
        if (sceneIdx === 0) sceneIdx = 1;
        if (gameOver) init();
    }
};

document.onkeyup = (evt) => {
    if (evt.key === ' ') {
        bird.dir = 1;
    }
};
