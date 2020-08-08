import elementPostion from '../common/library/elementPosition.js';
import stringParser from '../common/library/stringParser.js';

window.onload = function () {
    console.log(`[Open] 'lobby.js' has been opend.`);
    document.body.style.border = '1px solid blue';

    let html = document.documentElement;
    let body = document.body;
    let lobby = document.querySelector('#lobby');
    let circle = document.querySelector('#circle');
    let sqaure = document.querySelector('#sqaure');
    let image = document.querySelector('#image');
    let title = document.querySelector('#title');
    let text1 = document.querySelector('#text1');
    let text2 = document.querySelector('#text2');
    let firstLayer = document.querySelector('#first-layer');
    let secondLayer = document.querySelector('#second-layer');
    let thirdLayer = document.querySelector('#third-layer');

    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;

    html.style.width = windowWidth + 'px';
    html.style.height = windowHeight + 'px';
    html.style.border = '1px solid blue';
    html.style.overflow = 'hidden';

    body.style.width = windowWidth + 'px';
    body.style.height = windowHeight + 'px';
    body.style.border = '1px solid red';
    body.style.backgroundColor = '#F1E3D2';

    const lobbyWidth = 1600;

    lobby.style.position = 'relative';
    lobby.style.width = lobbyWidth + 'px';
    lobby.style.height = windowHeight + 'px';
    lobby.style.border = '1px solid green';
    elementPostion.centerX(lobby, body);

    const circleDiameter = 800;
    let circleRadius = circleDiameter / 2;

    circle.style.position = 'relative';
    circle.style.width = circleDiameter + 'px';
    circle.style.height = circleDiameter + 'px';
    circle.style.border = '1px solid white';
    circle.style.borderRadius = circleRadius + 'px';
    elementPostion.center(circle, lobby);

    

    // pageLoad();
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