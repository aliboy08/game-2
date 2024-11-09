import { sprites_loader, sprites_draw, sprites_update } from 'components/sprites';
import { movement } from './movement';

export default class Character {

    load_sprite(data){
        this.sprites_data = sprites_loader(data);
    }

    init(args){
        this.width = this.sprites_data.width;
        this.height = this.sprites_data.height;
        this.pid = args.pid ?? 'P1';
        
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

        this.move_speed = 2;
        this.jump_force = 600;

        this.movement = movement(this);
    }

    update(time){
        sprites_update(this, time);
        this.movement.update();
    }

    draw(ctx){
        sprites_draw(this, ctx);
    }

    get_sprite_state(){
        return this.sprites_data.states[this.state];
    }

    animate(state){
        if( this.state === state ) return;
        console.log('animate', state)
        this.state = state;
        this.sprites_data.states[this.state].index = 0;
    }
}