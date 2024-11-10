export function crouch_init( entity ){

    entity.is_crouching = false;

    entity.crouch = ()=>{
        
        entity.is_crouching = true;
        entity.animate('crouch')

        if( entity.is_moving ) {
            entity.velocity.x = 0;
        }
    }
    
    function update(){
        
    }
    
    entity.hooks.update.push(update);
}