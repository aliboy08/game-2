import Character from 'characters/character';
import sprite_data from './spiderman.json';
import { add_web_swing } from './web_swing';
import { add_controls } from './controls';

export default class Spiderman extends Character {

    constructor(args = {}) {
        super()

        this.load_sprite(sprite_data);
        
        this.hooks.init.push(()=>{
            add_web_swing(this);
        })

        add_controls(this);
    }

}