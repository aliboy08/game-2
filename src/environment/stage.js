import Floor from './floor';
import { apply_gravity } from 'components/gravity';
import Platform from 'entities/platform/platform';
import Loot_System from 'entities/item/loot';

const bounds_padding = 2;

export default class Stage {
    
    constructor(canvas){
        this.width = canvas.width;
        this.height = canvas.height;

        this.players = [];
        this.enemies = [];
        this.items = [];
        
        this.floor = new Floor(this);
        this.loot_system = new Loot_System(this);
        this.init_platforms();
    }
    
    update(time, ctx){
        
        apply_gravity(this.players, time);
        apply_gravity(this.enemies, time);
        apply_gravity(this.items, time);

        // platforms collision
        this.platforms.forEach(platform=>{
            platform.collision(this.players);
            platform.collision(this.enemies);
            platform.collision(this.items);
        });
        
        // floor collision
        this.floor.collision(this.players);
        this.floor.collision(this.enemies);
        this.floor.collision(this.items);
        
        // edge: left & right
        this.apply_bounds(this.players);
        this.apply_bounds(this.enemies);

        this.enemies.forEach(entity=>entity.update(time, ctx));
        this.players.forEach(entity=>entity.update(time, ctx));
        this.items.forEach(entity=>entity.update(time, ctx));
    }

    draw(ctx){

        this.floor.draw(ctx);

        this.platforms.forEach(platform=>{
            platform.draw(ctx);
        })
        
        this.enemies.forEach(entity=>entity.draw(ctx));
        this.players.forEach(entity=>entity.draw(ctx));
        this.items.forEach(entity=>entity.draw(ctx));
    }

    init_platforms(){

        const bottom = this.height - this.floor.height;
        const mid = this.width/2;
        const right = this.width;
        
        const level_1_y = bottom - 100;
        const level_2_y = bottom - 180;
        const level_3_y = bottom - 260;
        const level_4_y = bottom - 360;

        const w = 48;

        this.platforms = [

            // level 1
            new Platform({
                x: 0,
                y: level_1_y,
                width: w*2,
            }),
            new Platform({
                x: mid - w*2,
                y: level_1_y,
                width: w*4,
            }),
            new Platform({
                x: right-w,
                y: level_1_y,
                width: w,
            }),

            // level 2
            new Platform({
                x: 200,
                y: level_2_y,
                width: w*4,
            }),
            new Platform({
                x: mid - w/2,
                y: level_2_y,
                width: w,
            }),
            new Platform({
                x: right - 340,
                y: level_2_y,
                width: w*4,
            }),

            // level 3
            new Platform({
                x: 80,
                y: level_3_y,
                width: w*2,
            }),
            new Platform({
                x: mid - w*2,
                y: level_3_y,
                width: w*4,
            }),
            new Platform({
                x: right - 160,
                y: level_3_y,
                width: w*2,
            }),

            // level 4
            new Platform({
                x: 0,
                y: level_4_y,
                width: w*2,
            }),
            new Platform({
                x: mid - w,
                y: level_4_y -60,
                width: w*2,
            }),

            new Platform({
                x: right - w*2,
                y: level_4_y,
                width: w*2,
            }),
            
        ];
    }

    apply_bounds(entities){
        
        for( const entity of entities ) {
            if( entity.position.x <= 0 ) {
                entity.position.x = bounds_padding;
            }
            else if( entity.position.x + entity.width >= this.width ) {
                entity.position.x = this.width - entity.width - bounds_padding;
            }
        }
    }

    add_enemy(enemy){
        this.enemies.push(enemy);
        this.players.forEach(player=>{
            player.attacks.targets.push(enemy);
        })
    }
    
}