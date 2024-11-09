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
    
    constructor(player){

        this.player = player;

        this.pressing = {
            forward: false,
            backward: false,
            crouch: false,
        }

        document.addEventListener('keydown',e=>{
            if( !controls[player.pid][e.code] ) return;
            this[controls[player.pid][e.code]]();
        })

        document.addEventListener('keyup',(e)=>{
            if( !controls[player.pid][e.code] ) return;
            this.action_end(controls[player.pid][e.code]);
        });

    }

    forward(){
        this.pressing.forward = true;
        this.player.forward();
    }

    backward(){
        this.pressing.backward = true;
        this.player.backward();
    }

    jump(){
        this.player.jump();
    }

    crouch(){
        this.pressing.crouch = true;
        if( this.player.is_jumping ) return;
        this.player.crouch();
    }

    attack_1(){

    }

    attack_2(){
        
    }

    attack_3(){
        
    }

    action_end(action){

        if( action === 'forward' ) {

            this.pressing.forward = false;

            if( this.pressing.backward ) {
                this.player.backward();
            }
            else {
                this.player.move_stop();
            }

        }
        else if( action === 'backward' ) {

            this.pressing.backward = false;

            if( this.pressing.forward ) {
                this.player.forward();
            }
            else {
                this.player.move_stop();
            }
        }
        
        else if( action === 'crouch' ) {
            
            this.pressing.crouch = false;

            if( this.pressing.forward ) {
                this.player.forward();
            }
            else if ( this.pressing.backward ){
                this.player.backward();
            }
            else {
                this.player.idle();
            }

        }
    }

}