export function crouch_init( entity ){

    entity.is_crouching = false;

    entity.crouch = ()=>{
        entity.is_crouching = true;
        
        if( entity.is_moving ) {
            entity.velocity.x = 0;
        }

        entity.animate('crouch')

        entity.set_hitbox_offset(38);
    }

    entity.crouch_end = ()=>{
        entity.set_hitbox_offset(0);
    }
    
    // function update(){
    // }
    
    // entity.hooks.update.push(update);
}