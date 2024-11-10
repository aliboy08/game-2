export function add_web_swing(entity){
    
    const canvas = entity.stage.canvas;
    
    let web_line = {
        shoot: false,
        length: 0,
        velocity: 5,
        origin_offset: {
            x: 25,
            y: -10,
        }
    }
    
    entity.web_swing = ()=>{
        web_line_up_right();
    }

    function web_line_up_right(){
        entity.lock = true;
        entity.move_stop();
        entity.animate('web_shoot_ground_up_right')
        web_line.length = 0;
        web_line.shoot = true;
        web_line.angle = 5.5;
        web_line.origin = {
            x: entity.position.x + entity.width + web_line.origin_offset.x,
            y: entity.position.y + web_line.origin_offset.y,
        }
    }

    function update(time){

        if( !web_line.shoot ) return;

        web_line.length += web_line.velocity;

        let {length, angle, origin} = web_line;
        
        web_line.current = {
            x: origin.x + (length * Math.cos(angle)),
            y: origin.y + (length * Math.sin(angle)),
        }
        
        web_line_end();
        
    }

    function web_line_end(){

        // calculate line length end
        let limit = 500
        console.log(web_line.length)
        
        if( web_line.length < limit ) return;
        web_line.shoot = false;
        entity.lock = false;
        entity.animate('idle')
    }

    function draw_web_line(ctx){
        if( !web_line.shoot ) return;
        ctx.save();
        ctx.strokeStyle = 'cyan';
        ctx.beginPath();
        ctx.moveTo(web_line.origin.x, web_line.origin.y);
        ctx.lineTo(web_line.current.x, web_line.current.y);
        ctx.stroke();
        ctx.restore();
    }

    function draw(ctx){
        draw_web_line(ctx);
    }

    entity.hooks.update.push(update);
    entity.hooks.draw.push(draw);
}