import Character from 'characters/character';
import sprite_data from './data.json';

export default class Spiderman extends Character {

    constructor(args = {}) {
        super()
        this.load_sprite(sprite_data);
        this.init(args);
    }
    
}