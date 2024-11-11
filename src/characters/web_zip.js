export function add_web_zip(entity){
    
    let last_position_y;

    let freeze = false;

    const web_line = {
        start: false,
        line_complete: false,
        offset: {
            x: 7,
            y: -60,
        },
        velocity: 1800,
        velocity_min: 2,
        deceleration: {
            initial: 100,
            current: 0,
            rate: 4000,
        }
    }
    
    entity.web_zip_up = ()=>{
        web_line_start();
    }
    
    function update(time){
        // freeze_position();
        web_line_create(time);
    }
    
    function draw(ctx){
        web_line_draw(ctx);
    }

    function freeze_position(){
        if( !freeze ) return;
        entity.velocity.y = 0;
        entity.position.y = last_position_y;
    }
    
    function web_line_start(){

        console.log('web_line_start')
        entity.animate('web_line_up_shoot');
        web_line.start = true;
        web_line.line_complete = false;
        web_line.length = 0;
        web_line.deceleration.current = web_line.deceleration.initial;

        web_line.origin = {
            x: entity.position.x + entity.width/2 + web_line.offset.x,
            y: entity.position.y + entity.width/2 + web_line.offset.y,
        }

        web_line.current = {
            x: web_line.origin.x,
            y: web_line.origin.y,
        }
    }
    
    function web_line_create(time){
        if( !web_line.start ) return;
        if( web_line.line_complete ) return;
        
        web_line.deceleration.current += web_line.deceleration.rate * time.seconds_passed;
        let velocity = ( web_line.velocity - web_line.deceleration.current ) * time.seconds_passed;
        if( velocity < web_line.velocity_min ) velocity = web_line.velocity_min;
        web_line.current.y -= velocity;

        if(  web_line.current.y <= 0 ) {
            web_line.line_complete = true;
        }
    }

    function web_line_draw(ctx){
        if( !web_line.start ) return;
        ctx.save();
        ctx.strokeStyle = 'cyan';
        ctx.beginPath();
        ctx.moveTo(web_line.origin.x, web_line.origin.y);
        ctx.lineTo(web_line.current.x, web_line.current.y);
        ctx.stroke();
        ctx.restore();
    }
    
    function on_web_line_create_complete(){
        if( web_line.current.y > 0 ) return;
        web_line.line_end = true;
    }

    // entity.hooks.animation_end.push(animation_end);
    entity.hooks.update.push(update);
    // entity.hooks.draw.push(draw);
    entity.hooks.draw.unshift(draw); // push to first, for z-index/order issue
}