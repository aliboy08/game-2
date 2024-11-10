import Stage from './stage/stage';
import Spiderman from 'characters/spiderman/spiderman';

const frame_time = {
    previous: 0,
    seconds_passed: 0,
}

let canvas;
let ctx;
let stage;

function init(){
    init_canvas();
    init_game();
    requestAnimationFrame(frame);
}
window.addEventListener('load', init);

function init_game(){
    stage = new Stage(ctx);
    stage.add_player(new Spiderman(), {pid:'P1'});
}

function update(time){
    stage.update(time);
}

function draw(ctx){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stage.draw(ctx);
}

function init_canvas(){
    canvas = document.querySelector('canvas');
    canvas.width = 1000;
    canvas.height = 500;
    
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