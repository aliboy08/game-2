const controls = {
    P1: {
        KeyK: 'web_moves',
    },
}

export function add_controls(entity){

    const pressing = {
        KeyW: false,
    }

    const actions = {
        web_moves,
    }

    function web_moves(){
        if( pressing.KeyW ) {
            entity.web_zip_up();
        }
        else {
            entity.web_swing();
        }
    }

    document.addEventListener('keydown',e=>{
        pressing[e.code] = true;
        if( entity.lock ) return;
        if( !controls[entity.pid] ) return;
        let action_key = controls[entity.pid][e.code];
        if( typeof actions[action_key] === 'function' ) {
            actions[action_key]();
        }
    })

    document.addEventListener('keyup',(e)=>{
        pressing[e.code] = false;
        if( !controls[entity.pid] ) return;
        let action_key = controls[entity.pid][e.code];
        if( typeof actions[action_key+'_end'] === 'function' ) {
            actions[action_key+'_end']();
        }
    });
}