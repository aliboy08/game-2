export function movement_init( entity ){

    entity.is_moving = false;
    entity.is_backward = false;
    entity.is_forward = false;

    entity.forward = ()=>{
        entity.is_moving = true;
        entity.is_forward = true;
        entity.velocity.x = entity.move_speed;
        if( !entity.is_jumping ) entity.animate('forward');
    }

    entity.backward = ()=>{
        entity.is_moving = true;
        entity.is_backward = true;
        entity.velocity.x = -entity.move_speed;
        if( !entity.is_jumping ) entity.animate('backward');
    }

    entity.move_stop = ()=>{
        entity.velocity.x = 0;
        entity.is_moving = false;
        entity.is_backward = false;
        entity.is_forward = false;
        if( !entity.is_jumping ) entity.animate('idle');
    }
    
    function update(time){
        // entity.position.x += entity.velocity.x;
        // console.log(time)
        entity.position.x += entity.velocity.x * time.seconds_passed;
    }
    
    entity.hooks.update.push(update);
}