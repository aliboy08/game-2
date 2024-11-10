export function jump_init( entity ){
    
    const stage = entity.stage;
    const canvas = entity.stage.canvas;
    const floor = canvas.height - stage.floor_height;
    const landing_animation_point = floor - 110;
    
    entity.is_grounded = false;
    entity.is_jumping = false;
    
    let state = '';

    entity.jump = ()=>{
        
        entity.is_jumping = true;
        entity.is_grounded = false;
        entity.velocity.y = -entity.jump_force;

        let direction = entity.get_direction();

        if( direction === 'forward' ) {
            entity.animate('jump_forward');
        } else if ( direction === 'backward' ) {
            entity.animate('jump_backward');
        }
        else {
            entity.animate('jump');
        }
    }
    
    function jumping_up(){
        if( state === 'jumping_up' ) return;
        if( entity.velocity.y >= stage.gravity ) return;
        state = 'jumping_up';
        // console.log('jumping up')
    }

    function falling_down(){
        // if( state !== 'jumping_up' ) return;
        if( entity.velocity.y <= stage.gravity ) return;
        state = 'falling_down';
        // entity.animate('falling')
        // console.log('falling_down')
    }

    function landing(){
        if( state !== 'falling_down' ) return;
        let bottom = entity.position.y + entity.height;
        if( bottom < landing_animation_point ) return;
        state = 'landing';
        entity.animate('landing')
        // console.log('landing animation')
    }

    function landed(){
        if( state !== 'landing' ) return;
        if( !entity.is_grounded ) return;
        state = 'landed';
        // console.log('landed')
        entity.is_jumping = false;
        entity.animate('land')

        if( typeof entity.on_land === 'function' ) {
            entity.on_land();
        }
    }
    
    function update(){
        if( entity.lock ) return;
        jumping_up();
        falling_down();
        landing();
        landed();
    }
    
    function animation_end(state){
        if( state === 'land' ) {
            entity.animate('idle')
        }
    }
    
    function draw(ctx){

        // landing point
        ctx.beginPath();
        ctx.moveTo(0, landing_animation_point);
        ctx.lineTo(canvas.width, landing_animation_point)
        
        // floor
        ctx.moveTo(0, floor);
        ctx.lineTo(canvas.width, floor)
        ctx.stroke();
    }
    
    entity.hooks.update.push(update)
    entity.hooks.animation_end.push(animation_end)
    entity.hooks.draw.push(draw)
}