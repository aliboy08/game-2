import Character from 'characters/character';
import spiderman from 'characters/spiderman/spiderman.json';
import { debug_draw } from 'components/debug';
import { apply_bounds } from 'components/bounds';
import { apply_gravity } from 'components/gravity';

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
    });

    p.velocity.x = 1;
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
    p.position.x += p.velocity.x;
    apply_bounds(p, canvas)
    apply_gravity(p, time);
}

function draw(ctx){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    p.draw(ctx);
    debug_draw(p, ctx)
}