export const gravity = 8;

export function apply_gravity(object, time){  
    object.velocity.y += gravity;
    object.position.y += object.velocity.y * time.seconds_passed;
}