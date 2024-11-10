export function debug_init(entity){

    function draw(ctx){
        ctx.strokeRect(entity.position.x, entity.position.y, entity.width, entity.height)
    }
    
    entity.hooks.draw.push(draw);
}