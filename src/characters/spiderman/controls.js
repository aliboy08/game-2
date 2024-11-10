const controls = {
    P1: {
        KeyK: 'web_swing',
    },
}

export function add_controls(entity){

    const actions = {
        web_swing,
    }

    function web_swing(){
        entity.web_swing();
    }

    document.addEventListener('keydown',e=>{
        if( entity.lock ) return;
        if( !controls[entity.pid] ) return;
        let action_key = controls[entity.pid][e.code];
        if( typeof actions[action_key] === 'function' ) {
            actions[action_key]();
        }
    })

    document.addEventListener('keyup',(e)=>{
        if( !controls[entity.pid] ) return;
        let action_key = controls[entity.pid][e.code];
        if( typeof actions[action_key+'_end'] === 'function' ) {
            actions[action_key+'_end']();
        }
    });
}