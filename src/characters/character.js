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
    }

    update(time){
        if( !this.sprites_data ) return;
        sprites_update(this, time);

        // this.position.x += 1;
    }

    draw(ctx){
        if( !this.sprites_data ) return;
        sprites_draw(this, ctx);
        ctx.strokeRect(this.position.x, this.position.y, this.width, this.height)
    }

    get_sprite_state(){
        return this.sprites_data.states[this.state];
    }
}