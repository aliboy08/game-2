import { sprites_loader, sprites_draw, sprites_update } from 'components/sprites';

export default class Character {

    constructor(args) {
        this.sprites_data = sprites_loader(args.sprites_data);
        this.width = this.sprites_data.width;
        this.height = this.sprites_data.height;
        this.id = args.id ?? args.sprites_data.id ?? '';

        this.state = 'idle';
        this.animation_timer = 0;
        this.position = args.position ?? {
            x: 0,
            y: 0,
        }

        this.velocity = {
            x: 0,
            y: 0,
        }
    }

    update(time){
        sprites_update(this, time);
    }

    draw(ctx){
        sprites_draw(this, ctx);
    }

    get_sprite_state(){
        return this.sprites_data.states[this.state];
    }
}