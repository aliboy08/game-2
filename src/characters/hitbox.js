export function hitbox_init(entity){
    
    entity.hitbox = { top: 0, right: 0, bottom: 0, left: 0, width: 0, height: 0 }
    entity.hitbox_offset = { top: 0, right: 0, bottom: 0, left: 0 }
    
    function set_offset( top = 0, right = 0, bottom = 0, left = 0 ) {
        entity.hitbox_offset = { top, right, bottom, left }
    }
    
    function update(){
        entity.hitbox = {
            top: entity.position.y + entity.hitbox_offset.top,
            right: entity.position.x + entity.width + entity.hitbox_offset.right,
            bottom: entity.position.y + entity.height - entity.hitbox_offset.bottom,
            left: entity.position.x + entity.hitbox_offset.left,
            width: entity.width - entity.hitbox_offset.left - entity.hitbox_offset.right,
            height: entity.height - entity.hitbox_offset.top - entity.hitbox_offset.bottom,
        }
    }

    function draw(ctx){
        ctx.save();
        ctx.strokeStyle = 'red';
        ctx.strokeRect(
            entity.hitbox.left,
            entity.hitbox.top,
            entity.hitbox.width,
            entity.hitbox.height,
        );
        ctx.restore();
    }

    entity.set_hitbox_offset = set_offset;
    entity.hooks.update.push(update)
    entity.hooks.draw.push(draw)
}