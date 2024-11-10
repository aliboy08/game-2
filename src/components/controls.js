const controls = {
    P1: {
        KeyA: 'backward',
        KeyD: 'forward',
        KeyS: 'crouch',
        Space: 'jump',
        KeyJ: 'attack_1',
        KeyK: 'attack_2',
        KeyL: 'attack_3',
    },
}

export function add_controls(entity) {
    
    const pressing = {
        forward: false,
        backward: false,
        crouch: false,
    }

    const actions = {
        forward,
        backward,
        crouch,
        jump,
        attack_1,
        attack_2,
        attack_3,
    }

    const actions_end = {
        forward_end,
        backward_end,
        crouch_end
    }
    
    function forward(){
        pressing.forward = true;
        if( pressing.crouch ) return;
        entity.forward();
    }

    function forward_end(){
        pressing.forward = false;
        move_continue();
    }

    function backward(){
        pressing.backward = true;
        if( pressing.crouch ) return;
        entity.backward();
    }
    function backward_end(){
        pressing.backward = false;
        move_continue();
    }

    function move_continue(){
        if( pressing.forward ) {
            forward();
            return true;
        }

        if( pressing.backward ) {
            backward();
            return true;
        }
        
        entity.move_stop();
        return false;
    }

    function crouch(){
        pressing.crouch = true;
        if( entity.is_jumping ) return;
        entity.crouch();
    }
    function crouch_end(){
        pressing.crouch = false;
        entity.crouch_end();
        move_continue();
    }
    function crouch_continue(){
        if( !pressing.crouch ) return false;
        crouch();
        return true;
    }

    function jump(){
        if( entity.is_jumping ) return;
        entity.jump();
        entity.on_land = ()=>{
            entity.on_land = null;
            if( crouch_continue() ) return;
            move_continue();
        }
    }
    
    function attack_1(){

    }

    function attack_2(){
        
    }

    function attack_3(){
        
    }

    document.addEventListener('keydown',e=>{
        if( !controls[entity.pid] ) return;
        const action_key = controls[entity.pid][e.code];
        if( typeof actions[action_key] === 'function' ) {
            actions[action_key]();
        }
    })

    document.addEventListener('keyup',(e)=>{
        if( !controls[entity.pid] ) return;
        const action_key = controls[entity.pid][e.code];
        if( typeof actions_end[action_key+'_end'] === 'function' ) {
            actions_end[action_key+'_end']();
        }
    });
    
}