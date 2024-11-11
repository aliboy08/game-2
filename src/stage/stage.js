export default class Stage {
    
    constructor(ctx){
        this.entities = [];
        this.gravity = 10;
        this.floor_height = 20;
        this.ctx = ctx;
        this.canvas = ctx.canvas;
    }
    
    update(time){
        this.entities.forEach(entity=>{
            this.apply_gravity(entity, time);
            this.apply_bounds(entity);
            entity.update(time);
        })
    }

    draw(ctx){
        this.entities.forEach(entity=>{
            entity.draw(ctx);
        })
    }

    apply_gravity(entity, time){
        entity.velocity.y += this.gravity;
        entity.position.y += entity.velocity.y * time.seconds_passed;
    }

    apply_bounds(entity){
        this.limit_left(entity);
        this.limit_right(entity);
        this.limit_bottom(entity);
    }

    limit_left(entity){
        if( entity.position.x >= 0 ) return;
        entity.position.x = 0;
    }

    limit_right(entity){
        const bounds_right = this.canvas.width - entity.width;
        if( entity.position.x <= bounds_right ) return;
        entity.position.x = bounds_right;
    }

    limit_bottom(entity){

        if( entity.velocity.y < 0 ) return; // jump up

        let bounds_bottom = this.canvas.height - this.floor_height - entity.height;

        if( entity.position.y <= bounds_bottom ) return;

        entity.position.y = bounds_bottom;
        entity.velocity.y = this.gravity;
        entity.is_grounded = true;
    }

    add_entity(entity){
        entity.ctx = this.ctx;
        this.entities.push(entity);
    }

    add_player(player, args){
        player.stage = this;
        this.add_entity(player)
        player.init(args);
    }
    
}