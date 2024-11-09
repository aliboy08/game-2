export function movement( entity ){
    
    entity.forward = ()=>{
        entity.velocity.x = entity.move_speed;
        entity.animate('forward');
    }

    entity.backward = ()=>{
        entity.velocity.x = -entity.move_speed;
        entity.animate('backward');
    }

    entity.move_stop = ()=>{
        entity.velocity.x = 0;
        entity.animate('idle');
    }

    entity.jump = ()=>{
        if( entity.is_jumping ) return;
        entity.is_jumping = true;
        entity.is_grounded = false;
        entity.velocity.y = -entity.jump_force;
        entity.animate('jump');
    }

    function jump_end(){
        if( !entity.is_jumping ) return;
        entity.is_jumping = false;
        entity.animate('idle');
    }

    function falling(){
        if( !entity.is_jumping ) return;
        entity.animate('fall');
    }

    function update_jump(){
        if( entity.is_grounded ) {
            jump_end();
            return;
        }

        if( entity.velocity.y > 0 ) {
            falling();
        }
    }

    function update(){
        entity.position.x += entity.velocity.x;
        update_jump();
    }

    return { update }
}