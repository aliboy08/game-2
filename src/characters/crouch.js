export function add_crouch( entity ){

    entity.crouch = ()=>{
        if( entity.state === 'moving' ) {
            entity.velocity.x = 0;
        }
        entity.set_state('crouch');
        entity.animate('crouch')
    }
    
    function update(){
        entity.position.x += entity.velocity.x;
    }
    
    entity.hooks.update.push(update);
}