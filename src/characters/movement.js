export function movement( entity ){

    let state = '';

    entity.idle = ()=>{
        entity.animate('idle')
        state = '';
    }

    entity.forward = ()=>{
        state = 'moving';
        entity.velocity.x = entity.move_speed;
        if( !entity.is_jumping ) entity.animate('forward');
    }

    entity.backward = ()=>{
        state = 'moving';
        entity.velocity.x = -entity.move_speed;
        if( !entity.is_jumping ) entity.animate('backward');
    }

    entity.move_stop = ()=>{
        entity.velocity.x = 0;
        if( !entity.is_jumping ) entity.animate('idle');
    }

    entity.crouch = ()=>{
        if( state === 'moving' ) {
            entity.velocity.x = 0;
        }
        entity.animate('crouch')
    }
    
    function update(){
        entity.position.x += entity.velocity.x;
    }
    
    entity.hooks.update.push(update);
}