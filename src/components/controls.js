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

export default class Controls {
    
    constructor(entity){

        this.entity = entity;

        this.pressing = {
            forward: false,
            backward: false,
            crouch: false,
        }

        document.addEventListener('keydown',e=>{
            if( !controls[entity.pid] ) return;
            let action = controls[entity.pid][e.code];
            if( typeof this[action] === 'function' ) {
                this[action]();
            }
        })

        document.addEventListener('keyup',(e)=>{
            if( !controls[entity.pid] ) return;
            let action = controls[entity.pid][e.code];
            if( typeof this[action+'_end'] === 'function' ) {
                this[action+'_end']();
            }
        });
    }

    forward(){
        this.pressing.forward = true;
        if( this.pressing.crouch ) return;
        this.entity.forward();
    }
    forward_end(){
        this.pressing.forward = false;
        this.move_continue();
    }

    backward(){
        this.pressing.backward = true;
        if( this.pressing.crouch ) return;
        this.entity.backward();
    }
    backward_end(){
        this.pressing.backward = false;
        this.move_continue();
    }

    move_continue(){
        if( this.pressing.forward ) {
            this.forward();
            return true;
        }

        if( this.pressing.backward ) {
            this.backward();
            return true;
        }
        
        this.entity.move_stop();
        return false;
    }

    crouch(){
        this.pressing.crouch = true;
        if( this.entity.is_jumping ) return;
        this.entity.crouch();
    }
    crouch_end(){
        this.pressing.crouch = false;
        this.entity.crouch_end();
        this.move_continue();
    }
    crouch_continue(){
        if( !this.pressing.crouch ) return false;
        this.crouch();
        return true;
    }

    jump(){
        if( this.entity.is_jumping ) return;
        this.entity.jump();
        this.entity.on_land = ()=>{
            this.entity.on_land = null;
            if( this.crouch_continue() ) return;
            this.move_continue();
        }
    }
    
    attack_1(){

    }

    attack_2(){
        
    }

    attack_3(){
        
    }
    
}