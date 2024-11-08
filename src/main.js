import Character from 'characters/character';
import spiderman from 'characters/spiderman/spiderman.json';
import { debug_draw } from 'components/debug';
import { apply_bounds } from 'components/bounds';
import { apply_gravity } from 'components/gravity';
import Controls from 'components/controls';

const frame_time = {
    previous: 0,
    seconds_passed: 0,
}

let canvas;
let ctx;
let p1;

function init(){
    init_canvas();
    init_game();
    requestAnimationFrame(frame);
}
window.addEventListener('load', init);

function init_game(){
    p1 = new Character({
        id: 'P1',
        sprites_data: spiderman,
    });

    new Controls(p1)
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
    p1.update(time);
    p1.position.x += p1.velocity.x;
    apply_bounds(p1, canvas)
    apply_gravity(p1, time);
}

function draw(ctx){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    p1.draw(ctx);
    debug_draw(p1, ctx)
}