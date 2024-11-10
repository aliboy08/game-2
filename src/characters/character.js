import { sprites_loader, sprites_draw, sprites_update } from 'components/sprites';
import { add_movement } from './movement';
import { add_jump } from './jump';
import { add_crouch } from './crouch';
import { debug_draw } from 'components/debug';
import Controls from 'components/controls';

export default class Character {

    load_sprite(data){
        this.sprites_data = sprites_loader(data);
    }

    init(args){
        this.width = this.sprites_data.width;
        this.height = this.sprites_data.height;
        this.pid = args.pid ?? 'P1';
        
        this.animation_state = 'idle';
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
        this.jump_force = 700;
        
        this.hooks = {
            update: [],
            animation_end: [],
            draw: [],
        };
        
        add_movement(this);
        add_crouch(this);
        add_jump(this);

        new Controls(this);
    }
    
    update(time){
        sprites_update(this, time);
        this.hooks.update.forEach(action=>action(time))
    }

    draw(ctx){
        sprites_draw(this, ctx);
        debug_draw(this, ctx);
        this.hooks.draw.forEach(action=>action(ctx))
    }

    get_sprite_state(){
        return this.sprites_data.states[this.animation_state];
    }

    animate(animation_state){
        if( this.animation_state === animation_state ) return;
        this.animation_state = animation_state;
        this.sprites_data.states[this.animation_state].index = 0;
    }

    animation_end(animation_state){
        this.hooks.animation_end.forEach(action=>action(animation_state))
    }

    get_direction(){
        if( this.velocity.x > 0 ) return 'forward';
        if( this.velocity.x < 0 ) return 'backward';
        return false;
    }

}