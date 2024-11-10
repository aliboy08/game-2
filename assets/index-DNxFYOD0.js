(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))r(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function e(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(t){if(t.ep)return;t.ep=!0;const o=e(t);fetch(t.href,o)}})();class v{constructor(s){this.entities=[],this.gravity=8,this.floor_height=20,this.ctx=s,this.canvas=s.canvas}update(s){this.entities.forEach(e=>{this.apply_gravity(e,s),this.apply_bounds(e),e.update(s)})}draw(s){this.entities.forEach(e=>{e.draw(s)})}apply_gravity(s,e){s.velocity.y+=this.gravity,s.position.y+=s.velocity.y*e.seconds_passed}apply_bounds(s){this.limit_left(s),this.limit_right(s),this.limit_bottom(s)}limit_left(s){s.position.x>=0||(s.position.x=0)}limit_right(s){const e=this.canvas.width-s.width;s.position.x<=e||(s.position.x=e)}limit_bottom(s){if(s.velocity.y<0)return;let e=this.canvas.height-this.floor_height-s.height;s.position.y<=e||(s.position.y=e,s.velocity.y=this.gravity,s.is_grounded=!0)}add_entity(s){s.ctx=this.ctx,this.entities.push(s)}add_player(s,e){s.stage=this,this.add_entity(s),s.init(e)}}function x(i){const s=i.file_extension??"png";for(const e in i.states){const r=i.states[e];r.images=[],r.indexes.forEach(t=>{let[o,a]=t,n=o;if(o<a)for(;n<=a;){const d=new Image;d.src=`${i.base_src+n}.${s}`,r.images.push(d),n++}else if(o>a)for(;n>=a;){const d=new Image;d.src=`${i.base_src+n}.${s}`,r.images.push(d),n--}}),r.index=0,typeof r.time>"u"&&(r.time=60)}return i}function k(i){i.hooks.update.push(s=>E(i,s)),i.hooks.draw.push(s=>j(i,s))}function j(i,s){const e=i.get_sprite_state(),r=i.sprites_data.scale,{image_width:t,image_height:o}=i.sprites_data;let{x:a,y:n}=i.position;a+=i.sprites_data.offset.x,n+=i.sprites_data.offset.y,s.drawImage(e.images[e.index],0,0,t,o,a,n,t*r,o*r)}function E(i,s){const e=i.get_sprite_state();s.previous<i.animation_timer+e.time||(i.animation_timer=s.previous,e.index++,e.loop?e.index===e.images.length&&(e.index=0):e.index===e.images.length&&(e.index=e.images.length-1,i.animation_end(i.animation_state)))}function S(i){i.is_moving=!1,i.is_backward=!1,i.is_forward=!1,i.forward=()=>{i.is_moving=!0,i.is_forward=!0,i.velocity.x=i.move_speed,i.is_jumping||i.animate("forward")},i.backward=()=>{i.is_moving=!0,i.is_backward=!0,i.velocity.x=-i.move_speed,i.is_jumping||i.animate("backward")},i.move_stop=()=>{i.velocity.x=0,i.is_moving=!1,i.is_backward=!1,i.is_forward=!1,i.is_jumping||i.animate("idle")};function s(){i.position.x+=i.velocity.x}i.hooks.update.push(s)}function L(i){const s=i.stage,e=i.stage.canvas,r=e.height-s.floor_height,t=r-110;i.is_grounded=!1,i.is_jumping=!1;let o="";i.jump=()=>{i.is_jumping=!0,i.is_grounded=!1,i.velocity.y=-i.jump_force;let h=i.get_direction();h==="forward"?i.animate("jump_forward"):h==="backward"?i.animate("jump_backward"):i.animate("jump")};function a(){o!=="jumping_up"&&(i.velocity.y>=s.gravity||(o="jumping_up"))}function n(){i.velocity.y<=s.gravity||(o="falling_down")}function d(){o!=="falling_down"||i.position.y+i.height<t||(o="landing",i.animate("landing"))}function m(){o==="landing"&&i.is_grounded&&(o="landed",i.is_jumping=!1,i.animate("land"),typeof i.on_land=="function"&&i.on_land())}function g(){a(),n(),d(),m()}function w(h){h==="land"&&i.animate("idle")}function b(h){h.beginPath(),h.moveTo(0,t),h.lineTo(e.width,t),h.moveTo(0,r),h.lineTo(e.width,r),h.stroke()}i.hooks.update.push(g),i.hooks.animation_end.push(w),i.hooks.draw.push(b)}function K(i){i.is_crouching=!1,i.crouch=()=>{i.is_crouching=!0,i.animate("crouch"),i.is_moving&&(i.velocity.x=0),i.set_hitbox_offset(38)},i.crouch_end=()=>{i.set_hitbox_offset(0)};function s(){}i.hooks.update.push(s)}function P(i){i.hitbox={top:0,right:0,bottom:0,left:0,width:0,height:0},i.hitbox_offset={top:0,right:0,bottom:0,left:0};function s(t=0,o=0,a=0,n=0){i.hitbox_offset={top:t,right:o,bottom:a,left:n}}function e(){i.hitbox={top:i.position.y+i.hitbox_offset.top,right:i.position.x+i.width+i.hitbox_offset.right,bottom:i.position.y+i.height-i.hitbox_offset.bottom,left:i.position.x+i.hitbox_offset.left,width:i.width-i.hitbox_offset.left-i.hitbox_offset.right,height:i.height-i.hitbox_offset.top-i.hitbox_offset.bottom}}function r(t){t.save(),t.strokeStyle="red",t.strokeRect(i.hitbox.left,i.hitbox.top,i.hitbox.width,i.hitbox.height),t.restore()}i.set_hitbox_offset=s,i.hooks.update.push(e),i.hooks.draw.push(r)}function O(i){function s(e){e.strokeRect(i.position.x,i.position.y,i.width,i.height)}i.hooks.draw.push(s)}const f={P1:{KeyA:"backward",KeyD:"forward",KeyS:"crouch",Space:"jump",KeyJ:"attack_1",KeyK:"attack_2",KeyL:"attack_3"}};class q{constructor(s){this.entity=s,this.pressing={forward:!1,backward:!1,crouch:!1},document.addEventListener("keydown",e=>{if(!f[s.pid])return;let r=f[s.pid][e.code];typeof this[r]=="function"&&this[r]()}),document.addEventListener("keyup",e=>{if(!f[s.pid])return;let r=f[s.pid][e.code];typeof this[r+"_end"]=="function"&&this[r+"_end"]()})}forward(){this.pressing.forward=!0,!this.pressing.crouch&&this.entity.forward()}forward_end(){this.pressing.forward=!1,this.move_continue()}backward(){this.pressing.backward=!0,!this.pressing.crouch&&this.entity.backward()}backward_end(){this.pressing.backward=!1,this.move_continue()}move_continue(){return this.pressing.forward?(this.forward(),!0):this.pressing.backward?(this.backward(),!0):(this.entity.move_stop(),!1)}crouch(){this.pressing.crouch=!0,!this.entity.is_jumping&&this.entity.crouch()}crouch_end(){this.pressing.crouch=!1,this.entity.crouch_end(),this.move_continue()}crouch_continue(){return this.pressing.crouch?(this.crouch(),!0):!1}jump(){this.entity.is_jumping||(this.entity.jump(),this.entity.on_land=()=>{this.entity.on_land=null,!this.crouch_continue()&&this.move_continue()})}attack_1(){}attack_2(){}attack_3(){}}class A{load_sprite(s){this.sprites_data=x(s)}init(s){this.width=this.sprites_data.width,this.height=this.sprites_data.height,this.pid=s.pid??"P1",this.animation_state="idle",this.animation_timer=0,this.position=s.position??{x:0,y:0},this.velocity={x:0,y:0},this.move_speed=3,this.jump_force=700,this.hooks={update:[],animation_end:[],draw:[]},k(this),P(this),S(this),K(this),L(this),O(this),new q(this)}update(s){this.hooks.update.forEach(e=>e(s))}draw(s){this.hooks.draw.forEach(e=>e(s))}get_sprite_state(){return this.sprites_data.states[this.animation_state]}animate(s){this.animation_state!==s&&(this.animation_state=s,this.sprites_data.states[this.animation_state].index=0)}animation_end(s){this.hooks.animation_end.forEach(e=>e(s))}get_direction(){return this.velocity.x>0?"forward":this.velocity.x<0?"backward":!1}}const C="spiderman",I="sprites/spiderman/MVC2_SpiderMan_",T=1,$={x:-280,y:-210},F=60,M=80,N=640,R=480,D={idle:{loop:!0,indexes:[[159,167]]},forward:{loop:!0,indexes:[[169,180]]},backward:{loop:!0,indexes:[[180,169]]},jump:{indexes:[[198,195],[189,195]]},jump_forward:{indexes:[[200,210]]},jump_backward:{indexes:[[211,216]]},falling:{indexes:[[189,195]]},land:{indexes:[[196,199]]},landing:{indexes:[[193,199]]},crouch:{indexes:[[217,220]]}},J={id:C,base_src:I,scale:T,offset:$,width:F,height:M,image_width:N,image_height:R,states:D};class Q extends A{constructor(s={}){super(),this.load_sprite(J)}}const p={previous:0,seconds_passed:0};let c,u,_;function V(){H(),z(),requestAnimationFrame(l)}window.addEventListener("load",V);function z(){_=new v(u),_.add_player(new Q,{pid:"P1"})}function B(i){_.update(i)}function G(i){i.clearRect(0,0,c.width,c.height),_.draw(i)}function H(){c=document.querySelector("canvas"),c.width=1e3,c.height=500,u=c.getContext("2d"),u.strokeStyle="green",u.imageSmoothingEnabled=!0,u.imageSmoothingQuality="high"}function l(i){p.seconds_passed=(i-p.previous)/1e3,p.previous=i,requestAnimationFrame(l),B(p),G(u)}
