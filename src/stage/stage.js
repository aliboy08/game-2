export default class Stage {
    
    constructor(canvas){
        this.entities = [];
        this.gravity = 8;
        this.floor_height = 100;
        this.canvas = canvas;
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
        console.log(time)
        entity.velocity.y += this.gravity;
        entity.position.y += entity.velocity.y * time.seconds_passed;
    }

    apply_bounds(entity){

        // left
        if( entity.position.x <= 0 ) {
            entity.position.x = 0;
            
        }
        // right
        else if( entity.position.x + entity.width >= this.canvas.width ) {
            entity.position.x = this.canvas.width - entity.width;
        }

        let floor = this.canvas.height - this.floor_height;
        
        // bottom
        if( entity.position.y + entity.height >= floor ) {
            if( entity.velocity.y < 0 ) return; // jumping
            entity.position.y = floor;
            entity.velocity.y = this.gravity;
        }
        
    }
    
}