const gravity = 8;

export function movement( entity ){
    
    entity.is_grounded = false;

    entity.forward = ()=>{
        // if( entity.is_jumping ) return;
        entity.velocity.x = entity.move_speed;
        if( !entity.is_jumping ) entity.animate('forward');
    }

    entity.backward = ()=>{
        // if( entity.is_jumping ) return;
        entity.velocity.x = -entity.move_speed;
        if( !entity.is_jumping ) entity.animate('backward');
    }

    entity.move_stop = ()=>{
        // if( entity.is_jumping ) return;
        entity.velocity.x = 0;
        if( !entity.is_jumping ) entity.animate('idle');
    }

    entity.jump = ()=>{
        if( entity.is_jumping ) return;
        console.log('jump_start', entity.velocity.x)
        // entity.animate('jump_start');
        entity.is_jumping = true;
        entity.is_grounded = false;
        entity.velocity.y = -entity.jump_force;

        let dir = entity.get_direction();
        if( dir === 'forward' ) {
            entity.animate('jump_forward');
        } else if ( dir === 'backward' ) {
            entity.animate('jump');
        }
        else {
            entity.animate('jump');
        }


    }
    
    function jump_end(){
        if( !entity.is_jumping ) return;
        entity.is_jumping = false;
        entity.animate('idle');
    }

    function falling(){

        if( entity.velocity.x > 0 ) {
            // forward
            jump_forward();
        }

        if( entity.velocity.x < 0 ) {
            // backward
            jump_backward();
        }

    }

    function update_jump(){

        if( !entity.is_jumping ) return;
        
        if( entity.is_grounded ) {
            jump_end();
            return;
        }

        if( entity.velocity.y > gravity ) {
            falling();
        }
    }

    function jump_forward(){
        console.log('jump_forward')
    }

    function jump_backward(){
        console.log('jump_backward')
    }

    function update_move(){
        entity.position.x += entity.velocity.x;
    }

    function update(){
        update_move();
        update_jump();
    }

    return { update }
}