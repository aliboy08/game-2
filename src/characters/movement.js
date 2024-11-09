export function movement( entity ){
    
    entity.forward = ()=>{
        entity.velocity.x = entity.move_speed;
    }

    entity.backward = ()=>{
        entity.velocity.x = -entity.move_speed;
    }

    entity.move_stop = ()=>{
        entity.velocity.x = 0;
    }

    entity.jump = ()=>{
        entity.is_jumping = true;
        entity.velocity.y = -entity.jump_force;
    }

    const update = () => {
        entity.position.x += entity.velocity.x;
    }

    return {
        update
    }

}