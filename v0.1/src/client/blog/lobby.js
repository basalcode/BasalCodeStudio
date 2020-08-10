import elementPostion from '../common/library/elementPosition.js';
import parser from '../common/library/parser.js';

window.onload = function () {
    console.log(`[Open] 'lobby.js' has been opend.`);
    document.body.style.border = '1px solid blue';

    let html = document.documentElement;
    let body = document.body;
    let lobby = document.querySelector('#lobby');
    let image = document.querySelector('#image');
    let circle = document.querySelector('#circle');
    let sqaure = document.querySelector('#sqaure');
    let title = document.querySelector('#title');
    let titleText = document.querySelectorAll('.title__text');
    let text1 = document.querySelector('#text1');
    let text2 = document.querySelector('#text2');
    let firstLayer = document.querySelector('#first-layer');
    let secondLayer = document.querySelector('#second-layer');
    let thirdLayer = document.querySelector('#third-layer');

    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;

    html.style.width = windowWidth + 'px';
    html.style.height = windowHeight + 'px';
    // html.style.border = '1px solid blue';
    html.style.overflow = 'hidden';

    body.style.width = windowWidth + 'px';
    body.style.height = windowHeight + 'px';
    // body.style.border = '1px solid red';
    body.style.backgroundColor = '#F1E3D2';

    const lobbyWidth = 1600;

    lobby.style.position = 'relative';
    lobby.style.width = lobbyWidth + 'px';
    lobby.style.height = windowHeight + 'px';
    // lobby.style.border = '1px solid green';
    elementPostion.centerX(lobby, body);

    const imageWidth = 600; 
    const imageHeight = 1000;
    const imageMoveTop = 0;
    const imageMoveLeft = 0;

    const imageSource = 'https://images.unsplash.com/photo-1564078516393-cf04bd966897?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'

    image.style.position = 'relative';
    image.style.width = imageWidth + 'px';
    image.style.height = imageHeight + 'px';
    elementPostion.center(image, lobby);
    image.style.top = parser.removePixel(image.style.top) + imageMoveTop + 'px';
    image.style.left = parser.removePixel(image.style.left) + imageMoveLeft + 'px';
    image.style.backgroundImage = `url(${imageSource})`;
    image.style.backgroundPosition = 'center';
    image.style.backgroundSize = 'cover';

    const circleDiameter = 750;
    let circleRadius = circleDiameter / 2;

    circle.style.position = 'absolute';
    circle.style.width = circleDiameter + 'px';
    circle.style.height = circleDiameter + 'px';
    circle.style.border = '1px solid white';
    circle.style.borderRadius = circleRadius + 'px';
    circle.style.mixBlendMode = 'difference'
    elementPostion.center(circle, lobby);

    const titleWidth = 600;
    const titleHeight = 150;

    title.style.position = 'absolute';
    title.style.width = titleWidth + 'px';
    title.style.height = titleHeight + 'px';
    elementPostion.center(title, lobby);
    // title.style.top = parser.percentToPixel(titleYPercent, windowHeight) + 'px';
    // title.style.left = parser.percentToPixel(titleXPercent, lobbyWidth) + 'px';
    
    // title.style.border = '1px solid purple';

    titleText.forEach(text => {
        // text.style.border = '1px solid pink';

        text.style.textAlign = 'center';
        text.style.fontSize = '72px';
        text.style.fontFamily = 'Playfair Display, serif';
        text.style.fontFamily = 'Lora, serif';
        text.style.color = 'white';
        text.style.bold = ''
        text.style.letterSpacing = '5px';
        text.style.mixBlendMode = 'difference';
    })
}

/* window.addEventListener('resize', function(event) {
    pageLoad();
})

function pageLoad() {
    
} */

/* if (0) {
    window.onload = function () {
        console.log('start');

        (async function () {
            for (let i = 0; i < 10; i++) {


                await (function () {
                    return new Promise(function (resolve, reject) {
                        window.setTimeout(function () {
                            console.log('timeout');
                            resolve();
                        }, 1000);
                    })
                })();

                console.log(i);

            }
        })();


        console.log('end');
    }


    (async function () {
        let frame = 144;
        for (let i = 0; i < frame; i++) {
            await animationTimeout(144);
            let centeredY = elementPostion.centeredYCordinate(lobby);
            // let lobbyHeight = stringParser.removePixel(lobby.style.width);
            // let destinationY = centeredY + lobbyHeight;

            let topYCordinate = stringParser.removePixel(lobby.style.top);

            let distance = 500;
            let speed = distance / frame;
            lobby.style.top = (topYCordinate + speed) + 'px';
            console.log(lobby.style.top);
        }
    })();

    function animationTimeout(fps) {
        const oneSecond = 1000;
        let framePerSecond = fps;
        let timeout = oneSecond / framePerSecond;
        return new Promise(function (resolve, reject) {
            window.setTimeout(async function () {
                resolve();
            }, timeout);
        });
    }
} */