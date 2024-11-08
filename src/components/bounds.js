const floor_height = 100;

export function apply_bounds(object, canvas){

    const bounds = get_bounds(object);

    // left
    if( bounds.left <= 0 ) {
        // object.velocity.x = 1;
        object.position.x = 0;
    }
    // right
    else if( bounds.right >= canvas.width ) {
        // object.velocity.x = -1;
        object.position.x = canvas.width;
    }

    let floor = canvas.height - floor_height;

    // bottom
    if( bounds.bottom >= floor ) {
        object.position.y = floor;
        object.velocity.y = 0;
    }

}

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