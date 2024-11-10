import { sprites_loader, sprite_init } from 'components/sprites';
import { movement_init } from './movement';
import { jump_init } from './jump';
import { crouch_init } from './crouch';
import { hitbox_init } from './hitbox';
import { debug_init } from 'components/debug';
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

        this.move_speed = 3;
        this.jump_force = 700;
        
        this.hooks = {
            update: [],
            animation_end: [],
            draw: [],
        };
        
        sprite_init(this);
        hitbox_init(this);
        movement_init(this);
        crouch_init(this);
        jump_init(this);
        debug_init(this);

        new Controls(this);
    }
    
    update(time){
        this.hooks.update.forEach(action=>action(time))
    }

    draw(ctx){
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