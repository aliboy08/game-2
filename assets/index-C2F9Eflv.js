(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))o(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&o(a)}).observe(document,{childList:!0,subtree:!0});function i(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(s){if(s.ep)return;s.ep=!0;const r=i(s);fetch(s.href,r)}})();function _(t,e){e.strokeRect(t.position.x,t.position.y,t.width,t.height)}const p={P1:{KeyA:"backward",KeyD:"forward",KeyS:"crouch",Space:"jump",KeyJ:"attack_1",KeyK:"attack_2",KeyL:"attack_3"}};class g{constructor(e){this.player=e,this.pressing={forward:!1,backward:!1},document.addEventListener("keydown",i=>{p[e.pid][i.code]&&this[p[e.pid][i.code]]()}),document.addEventListener("keyup",i=>{p[e.pid][i.code]&&this.action_end(p[e.pid][i.code])})}forward(){this.pressing.forward=!0,this.player.forward()}backward(){this.pressing.backward=!0,this.player.backward()}jump(){this.player.jump()}crouch(){}action_end(e){e==="forward"?(this.pressing.forward=!1,this.pressing.backward?this.player.backward():this.player.move_stop()):e==="backward"&&(this.pressing.backward=!1,this.pressing.forward?this.player.forward():this.player.move_stop())}}class w{constructor(e){this.entities=[],this.gravity=8,this.floor_height=20,this.canvas=e}update(e){this.entities.forEach(i=>{this.apply_gravity(i,e),this.apply_bounds(i),i.update(e)})}draw(e){this.entities.forEach(i=>{i.draw(e)})}apply_gravity(e,i){e.velocity.y+=this.gravity,e.position.y+=e.velocity.y*i.seconds_passed}apply_bounds(e){this.limit_left(e),this.limit_right(e),this.limit_bottom(e)}limit_left(e){e.position.x>=0||(e.position.x=0)}limit_right(e){const i=this.canvas.width-e.width;e.position.x<=i||(e.position.x=i)}limit_bottom(e){if(e.velocity.y<0)return;let i=this.canvas.height-this.floor_height-e.height;e.position.y<=i||(e.position.y=i,e.velocity.y=this.gravity,e.is_grounded=!0)}}function v(t){const e=t.file_extension??"png";for(const i in t.states){const o=t.states[i];o.images=[],o.image_index.forEach(s=>{let[r,a]=s,n=r;if(r<a)for(;n<=a;){const c=new Image;c.src=`${t.base_src+n}.${e}`,o.images.push(c),n++}else if(r>a)for(;n>=a;){const c=new Image;c.src=`${t.base_src+n}.${e}`,o.images.push(c),n--}}),o.index=0,typeof o.time>"u"&&(o.time=60)}return t}function x(t,e){const i=t.get_sprite_state(),o=t.sprites_data.scale,{image_width:s,image_height:r}=t.sprites_data;let{x:a,y:n}=t.position;a+=t.sprites_data.offset.x,n+=t.sprites_data.offset.y,e.drawImage(i.images[i.index],0,0,s,r,a,n,s*o,r*o)}function y(t,e){const i=t.get_sprite_state();e.previous<t.animation_timer+i.time||(t.animation_timer=e.previous,i.index++,i.loop?i.index===i.images.length&&(i.index=0):i.index===i.images.length&&(i.index=i.images.length-1))}function b(t){t.forward=()=>{t.velocity.x=t.move_speed},t.backward=()=>{t.velocity.x=-t.move_speed},t.move_stop=()=>{t.velocity.x=0},t.jump=()=>{t.is_jumping||(t.is_jumping=!0,t.is_grounded=!1,t.velocity.y=-t.jump_force,t.animate("jump"))};function e(){t.is_jumping=!1,t.state="idle"}function i(){t.animate("fall")}function o(){if(t.is_grounded){e();return}t.velocity.y>0&&i()}function s(){t.position.x+=t.velocity.x,o()}return{update:s}}class k{load_sprite(e){this.sprites_data=v(e)}init(e){this.width=this.sprites_data.width,this.height=this.sprites_data.height,this.pid=e.pid??"P1",this.state="idle",this.animation_timer=0,this.position=e.position??{x:0,y:0},this.velocity={x:0,y:0},this.move_speed=2,this.jump_force=600,this.movement=b(this)}update(e){y(this,e),this.movement.update()}draw(e){x(this,e)}get_sprite_state(){return this.sprites_data.states[this.state]}animate(e){this.state!==e&&(console.log("animate",e),this.state=e,this.sprites_data.states[this.state].index=0)}}const S="spiderman",L="sprites/spiderman/MVC2_SpiderMan_",E=1,K={x:-280,y:-210},P=60,O=80,q=640,A=480,C={idle:{loop:!0,image_index:[[159,167]]},jump:{image_index:[[198,189]]},fall:{image_index:[[189,198]]}},I={id:S,base_src:L,scale:E,offset:K,width:P,height:O,image_width:q,image_height:A,states:C};class $ extends k{constructor(e={}){super(),this.load_sprite(I),this.init(e)}}const u={previous:0,seconds_passed:0};let d,h,l,f;function j(){R(),F(),requestAnimationFrame(m)}window.addEventListener("load",j);function F(){f=new w(d),l=new $({pid:"P1"}),new g(l),f.entities.push(l)}function M(t){f.update(t)}function N(t){t.clearRect(0,0,d.width,d.height),f.draw(t),_(l,t)}function R(){d=document.querySelector("canvas"),d.width=1e3,d.height=500,h=d.getContext("2d"),h.strokeStyle="green",h.imageSmoothingEnabled=!0,h.imageSmoothingQuality="high"}function m(t){u.seconds_passed=(t-u.previous)/1e3,u.previous=t,requestAnimationFrame(m),M(u),N(h)}
