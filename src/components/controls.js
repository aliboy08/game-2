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
        }

        document.addEventListener('keydown',e=>{
            console.log(e.code)
            if( !controls[player.id][e.code] ) return;
            this[controls[player.id][e.code]]();
        })

        document.addEventListener('keyup',(e)=>{
            if( !controls[player.id][e.code] ) return;
            this.action_end(controls[player.id][e.code]);
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

    }

    crouch(){

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
    }

}