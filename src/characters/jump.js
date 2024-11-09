const gravity = 8;

export function jump( entity ){
    
    entity.is_grounded = false;
    entity.is_jumping = false;

    entity.jump = ()=>{

        if( entity.is_jumping ) return;
        console.log('jump_start', entity.velocity.x)
        
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
    
    function check_landing(){

    }

    function check_landed(){
        if( !entity.is_grounded ) return;
        entity.is_jumping = false;
        // entity.animate('idle');
        console.log('landed')
        entity.animate('land')
    }

    function jump_forward() {
    }

    function jump_backward(){

    }
    
    function update(){

        if( !entity.is_jumping ) return;
        
        check_landed();

        // if( entity.is_grounded ) {
        //     jump_end();
        //     return;
        // }

        // if( entity.velocity.y > gravity ) {
        //     falling();
        // }
    }
    
    function animation_end(state){
        if( state === 'land' ) {
            entity.state = 'idle';
        }
    }


    entity.hooks.update.push(update)
    entity.hooks.animation_end.push(animation_end)
}