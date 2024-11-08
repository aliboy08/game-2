export function get_bounds(object){
    return {
        top: object.position.y,
        right: object.position.x + object.width,
        bottom: object.position.y + object.height,
        left: object.position.x,
        width: object.width,
        height: object.height,
    }
}

export function remove_item(arr, item_to_remove){
    arr.forEach((item, i)=>{
        if( item == item_to_remove ) {
            arr.splice(i, 1);
        }
    })
}

export function stand_over(entity, platform){
    entity.position.y = platform.position.y - entity.height;
    entity.is_grounded = true;
    entity.velocity.y = 0;
}

export function is_colliding(a, b){
    return get_collision_direction(a.bounds, b.bounds);
}

export function get_collision_direction(a, b){

    if( a.top > b.bottom ) {
        // a below
        return false;
    }

    if( a.bottom < b.top ) {
        // a above
        return false; 
    }

    const distance_left = Math.abs(a.left - b.left);
    const distance_right = Math.abs(a.right - b.right);

    // console.log({distance_left, distance_right})
    
    if( a.right > b.left &&
        a.left < b.right &&
        distance_left < distance_right ) {
        // a - left
        return 'left';
    }
    
    if( a.left < b.right &&
        a.right > b.left ) {
        // a - right
        return 'right';
    }
    
    return false;
}

export function get_random_percent(percent){
    return get_random_min_max(1, 101) <= percent;
}

export function get_random_item(arr) {
    const item_index = get_random_max(arr.length);
    return arr[item_index];
}

export function get_random_max(max) {
    return Math.floor(Math.random() * max);
}

// maximum is exclusive and minimum is inclusive
export function get_random_min_max(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); 
}

export function sprite_images_loader_old_v1(options){

    const data = {
        frames_count: options.frames_count,
        max: {
            width: 0,
            height: 0,
        },
        ready: false,
    }
    
    let loaded = 0;

    const on_image_load = function(){

        // get max image width & height
        if( this.width > data.max.width ) data.max.width = this.width;
        if( this.height > data.max.height ) data.max.height = this.height;

        loaded++;

        if( loaded === options.frames_count ) {
            // ready
            data.ready = true;
        }
    }

    if( typeof options.file_names !== 'undefined' ) {
        data.images = load_images_filenames(options, on_image_load);
    }
    else {
        data.images = load_images_sequential(options, on_image_load);
    }

    return data;
}

function load_images_filenames(options, on_image_load){

    const images = [];
    
    options.file_names.forEach(file_name=>{
        const image = new Image();
        image.onload = on_image_load;
        image.src = options.base_image_path+file_name;
        images.push(image);
    });

    return images;
}

function load_images_sequential(options, on_image_load){

    const images = [];

    const file_extension = options.image_extension ?? '.png';
    const index_start = options.image_index_start ?? 1;
    let index_end = options.image_index_end ?? options.frames_count;

    if( typeof options.image_index_end === 'undefined' ) {
        index_end = index_start + options.frames_count;
    }
    
    // sequential images file names
    for( let i = index_start; i < index_end; i++ ) {
        
        let image_index = i ;

        if( (options.leading_zero ?? true) && image_index < 10 ) {
            image_index = '0'+image_index;
        }
        
        const image = new Image();
        image.onload = on_image_load;
        image.src = options.base_image_path + image_index + file_extension;
        images.push(image);
    }

    return images;
}

export function sprite_images_loader_old_v2( data, base_path, file_extension = 'png' ){

    for( const name in data ) {

        const item = data[name];

        for( const state_name in item.states ) {

            const state = item.states[state_name];
            state.name = state_name;
            state.index = 0;

            const img = new Image();
            img.onload = function(){
                state.frames_count = img.width / item.width;
            }
            img.src = `${base_path}/${name}/${state_name}.${file_extension}`;
            state.img = img;
        }
    }

    return data;
}

export function set_state_timeout(object, key){
    object[key].state = true;
    clearTimeout(object[key].timer);
    object[key].timer = setTimeout(()=>{
        object[key].state = false;
    }, object[key].time);
}