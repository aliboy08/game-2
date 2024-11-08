import Character from 'characters/character';
import spiderman from 'characters/spiderman/spiderman.json';

const frame_time = {
    previous: 0,
    seconds_passed: 0,
}

let canvas;
let ctx;
let p;

function init(){
    init_canvas();
    init_game();
    requestAnimationFrame(frame);
}
window.addEventListener('load', init);

function init_game(){
    p = new Character({
        sprites_data: spiderman,
        position: {
            x: 100,
            y: 100
        }
    });
}

function init_canvas(){
    canvas = document.querySelector('canvas');
    canvas.width = 1200;
    canvas.height = 600;
    
    ctx = canvas.getContext('2d');
    
    ctx.strokeStyle = "green";
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
}

function frame(time){
    // for consistent fps on different refresh rates
    frame_time.seconds_passed = (time - frame_time.previous) / 1000;
    frame_time.previous = time;
    requestAnimationFrame(frame);
    update(frame_time);
    draw(ctx);
}

function update(time){
    p.update(time);
}

function draw(ctx){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    p.draw(ctx);
}