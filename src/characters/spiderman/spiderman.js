import { sprites_loader, sprites_draw, sprites_update } from 'components/sprites'; 
import sprites_data from './spiderman.json';

class Spiderman {

    constructor() {
        this.sprites_data = sprites_loader(sprites_data);
        this.state = 'idle';
        this.animation_timer = 0;
        this.width = this.sprites_data.width;
        this.height = this.sprites_data.height;

        this.position = {
            x: 100,
            y: 100,
        }
    }

    update(time){
        sprites_update(this, time);
    }

    draw(ctx){
        sprites_draw(this, ctx);
        ctx.strokeRect(this.position.x, this.position.y, this.width, this.height)
    }

    get_sprite_state(){
        return this.sprites_data.states[this.state];
    }
}