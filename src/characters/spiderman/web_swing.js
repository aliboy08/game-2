export function add_web_swing(entity){
    
    const canvas = entity.stage.canvas;

    let state;

    let last_position_y;

    let freeze = false;

    let web_line = {
        start: false,
        line_end: false,
        length: 0,
        velocity: 2000,
        velocity_min: 2,
        deceleration: {
            initial: 200,
            current: 0,
            rate: 4000,
        },
        origin_offset: {
            x: 5,
            y: -32,
        },
    }

    let swing = {
        velocity: 70000,
        acceleration: 1500,
        acceleration_rate: 150,
        destination: {},
    };

    let bounds_left = canvas.width - entity.width;
    
    entity.web_swing = ()=>{
        entity.jump();
        setTimeout(()=>{
            web_line_start();
        }, 150)
    }
    
    function update(time){
        freeze_position();
        web_line_create(time);
        swing_update(time);
    }
    
    function draw(ctx){
        web_line_draw(ctx);
        swing_draw(ctx);
    }

    function freeze_position(){
        if( !freeze ) return;
        entity.velocity.y = 0;
        entity.position.y = last_position_y;
    }
    
    function web_line_start(){

        freeze = true;
        entity.lock = true;
        entity.move_stop();
        entity.animate('web_line_shoot')
        
        last_position_y = entity.position.y;

        web_line.length = 0;
        web_line.line_end = false;
        web_line.start = true;
        web_line.angle = 5.5;
        web_line.origin = {
            x: entity.position.x + entity.width + web_line.origin_offset.x,
            y: entity.position.y + web_line.origin_offset.y,
        }
        web_line.deceleration.current = web_line.deceleration.initial;
    }
    
    function web_line_create(time){
        
        if( !web_line.start ) return;
        if( web_line.line_end ) return;

        web_line.deceleration.current += web_line.deceleration.rate * time.seconds_passed;
        let velocity = ( web_line.velocity - web_line.deceleration.current ) * time.seconds_passed;
        if( velocity < web_line.velocity_min ) velocity = web_line.velocity_min;

        console.log(velocity)
        
        web_line.length += velocity;

        let {length, angle, origin} = web_line;
        
        web_line.current = {
            x: origin.x + (length * Math.cos(angle)),
            y: origin.y + (length * Math.sin(angle)),
        }

        on_web_line_create_complete();
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
        if( web_line.current.y > 0 && web_line.current.x < canvas.width ) return;
        web_line.line_end = true;
        swing_start();
    }
    
    function swing_start(){
        
        state = 'swing';
        entity.animate('web_swing')

        let start_x = entity.position.x + entity.width;
        let distance = (web_line.current.x - start_x) * 2;
        
        swing.acceleration = 1500;
        swing.destination = {
            x: start_x + distance,
            y: entity.position.y,
        }
    }

    function swing_update(time){

        if( state !== 'swing' ) return;

        swing.acceleration = (swing.acceleration * swing.acceleration_rate) * time.seconds_passed;
        entity.velocity.x = (swing.velocity + swing.acceleration) * time.seconds_passed;
        
        if( entity.position.x >= bounds_left ) {
            entity.position.x = bounds_left;
            on_swing_end();
            return;
        }
        
        if( entity.position.x >= swing.destination.x ) {
            entity.position.x = swing.destination.x;
            on_swing_end();
        }
    }
    
    function on_swing_end(){
        state = '';
        entity.velocity.x = 0;
        freeze = false;
        entity.lock = false;
        entity.animate('falling')
    }

    function swing_draw(ctx){
        if( state !== 'swing' ) return;
        let { x, y } = swing.destination;
        let { width, height } = entity;
        ctx.save();
        ctx.strokeStyle = 'red';
        ctx.strokeRect(x, y, width, height)
        ctx.restore();
    }

    // entity.hooks.animation_end.push(animation_end);
    entity.hooks.update.push(update);
    // entity.hooks.draw.push(draw);
    entity.hooks.draw.unshift(draw); // push to first, for z-index/order issue
}