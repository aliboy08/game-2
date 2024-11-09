export function sprites_loader(data){

    const file_extension = data.file_extension ?? 'png';
    
    for( const state_key in data.states ) {

        const state = data.states[state_key];

        state.images = [];
        
        state.indexes.forEach(range=>{

            let [start, end] = range;

            let i = start;

            if( start < end ) {
                while( i <= end ) {
                    const img = new Image();
                    img.src = `${data.base_src + i}.${file_extension}`;
                    state.images.push(img);
                    i++;
                }
            }
            else if ( start > end ) {
                while( i >= end ) {
                    const img = new Image();
                    img.src = `${data.base_src + i}.${file_extension}`;
                    state.images.push(img);
                    i--;
                }
            }
            
        })
        
        state.index = 0;

        if( typeof state.time === 'undefined' ) {
            state.time = 60;
        }
    }
    
    return data;
}

export function sprites_draw(object, ctx){

    const state = object.get_sprite_state();

    // console.log(object.state)

    const scale = object.sprites_data.scale;
    const { image_width, image_height } = object.sprites_data;
    let { x, y } = object.position;

    x += object.sprites_data.offset.x;
    y += object.sprites_data.offset.y;

    ctx.drawImage(
        state.images[state.index],
        0, 0,
        image_width, image_height,
        x, y,
        image_width*scale, image_height*scale
    );
}

export function sprites_update(object, time){

    const state = object.get_sprite_state();

    if( time.previous < object.animation_timer + state.time ) return;
    object.animation_timer = time.previous;
    
    state.index++;

    console.log(object.state)
    
    if( state.loop ) {
        if( state.index === state.images.length ) {
            // restart animation
            state.index = 0;
        }
    }
    else {
        if( state.index === state.images.length ) {
            // freeze to last frame
            state.index = state.images.length-1;
            object.animation_end(object.state);
        }
    }
    
}