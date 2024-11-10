export function sprites_loader(data){

    const file_extension = data.file_extension ?? 'png';
    
    for( const state_key in data.states ) {

        const state = data.states[state_key];

        state.images = [];
        
        state.indexes.forEach(range=>{

            let [start, end] = range;

            if( !end ) {
                // single image
                const img = new Image();
                img.src = `${data.base_src + start}.${file_extension}`;
                state.images.push(img);
                return;
            }

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

export function sprite_init(entity){

    entity.hooks.update.push((time)=>{
        return sprites_update(entity, time);
    });

    entity.hooks.draw.push((ctx)=>{
        return sprites_draw(entity, ctx);
    });
}

function sprites_draw(entity, ctx){

    const state = entity.get_sprite_state();

    // console.log(entity.state)

    const scale = entity.sprites_data.scale;
    const { image_width, image_height } = entity.sprites_data;
    let { x, y } = entity.position;

    x += entity.sprites_data.offset.x;
    y += entity.sprites_data.offset.y;

    if( entity.animation_offset ) {
        x += entity.animation_offset.x;
        y += entity.animation_offset.y;
    }

    ctx.drawImage(
        state.images[state.index],
        0, 0,
        image_width, image_height,
        x, y,
        image_width*scale, image_height*scale
    );
}

function sprites_update(entity, time){

    const state = entity.get_sprite_state();

    if( time.previous < entity.animation_timer + state.time ) return;
    entity.animation_timer = time.previous;
    
    state.index++;

    // console.log(entity.animation_state)
    
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
            entity.animation_end(entity.animation_state);
        }
    }
    
}