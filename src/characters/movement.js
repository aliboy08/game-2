export function movement( entity ){

    entity.forward = ()=>{
        entity.velocity.x = entity.move_speed;
        if( !entity.is_jumping ) entity.animate('forward');
    }

    entity.backward = ()=>{
        entity.velocity.x = -entity.move_speed;
        if( !entity.is_jumping ) entity.animate('backward');
    }

    entity.move_stop = ()=>{
        entity.velocity.x = 0;
        if( !entity.is_jumping ) entity.animate('idle');
    }
    
    function update(){
        entity.position.x += entity.velocity.x;
    }
    
    entity.hooks.update.push(update);
}