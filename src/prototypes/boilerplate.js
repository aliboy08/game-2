window.addEventListener('load', ()=>{

    const canvas = document.querySelector('canvas');
    canvas.width = 1000;
    canvas.height = 500;
    
    const ctx = canvas.getContext('2d');
    
    let frame_time = {
        previous: 0,
        seconds_passed: 0,
    }

    let animation_timer = 0;
    const animation_time = 60;
    
    function frame(time){
    
        requestAnimationFrame(frame);
        
        // for consistent fps on different refresh rates
        frame_time.seconds_passed = (time - frame_time.previous) / 1000;
        frame_time.previous = time;
        
        clear_canvas();

        update(frame_time);
        draw(ctx);
        
    }

    function clear_canvas(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    function update(time){
        if( time.previous < animation_timer + animation_time ) return;
        animation_timer = time.previous;
    }

    function draw(ctx){
        
    }

    requestAnimationFrame(frame);
    
})