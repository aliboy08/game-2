export function add_web_swing(entity){
    
    const canvas = entity.stage.canvas;

    let state;

    let last_position_y;

    let freeze = false;

    let web_line = {
        start: false,
        line_end: false,
        length: 0,
        velocity: 5,
        origin_offset: {
            x: 5,
            y: -32,
        },
    }

    let swing = {
        velocity: 6,
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
        web_line_create();
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
    }
    
    function web_line_create(){
        
        if( !web_line.start ) return;
        if( web_line.line_end ) return;

        web_line.length += web_line.velocity;

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

        swing.destination = {
            x: start_x + distance,
            y: entity.position.y,
        }
    }

    function swing_update(time){

        if( state !== 'swing' ) return;

        // entity.position.x += easeInOutQuint(time.seconds_passed, swing.velocity, 3, .01);
        entity.velocity.x = swing.velocity;
        
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
    
    function easeInOutQuint (t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
        return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
    }
    
    // entity.hooks.animation_end.push(animation_end);
    entity.hooks.update.push(update);
    // entity.hooks.draw.push(draw);
    entity.hooks.draw.unshift(draw); // push to first, for z-index/order issue
}