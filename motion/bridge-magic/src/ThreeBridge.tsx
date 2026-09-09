import React, {useLayoutEffect, useRef} from 'react';
import {useCurrentFrame} from 'remotion';
import paths from './paths.json';
type V=[number,number,number];
const mix=(a:number,b:number,t:number)=>a+(b-a)*t;
const ease=(f:number,a:number,b:number)=>{const t=Math.max(0,Math.min(1,(f-a)/(b-a)));return t*t*t*(t*(t*6-15)+10)};
const sub=(a:V,b:V):V=>a.map((n,i)=>n-b[i]) as V;
const cross=(a:V,b:V):V=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];
const unit=(v:V):V=>{const d=Math.hypot(...v);return v.map(n=>n/d) as V};
const dot=(a:V,b:V)=>a.reduce((n,x,i)=>n+x*b[i],0);
const finalEye:V=[0,416,-1300],finalForward=unit([0,-416,1300]),finalRight:V=[1,0,0],finalUp=unit(cross(finalForward,finalRight));
// Inverse camera projection constructs fixed world geometry from the supplied
// logo contours. The finishing camera therefore reproduces its exact silhouette.
function fromLogo(x:number,y:number,z:number,slope=0):V{
 const u=(x-625.5)*1.1/1450,v=(470.5-y)*1.1/1450;
 const ray:V=[finalForward[0]+u*finalRight[0]+v*finalUp[0],finalForward[1]+u*finalRight[1]+v*finalUp[1],finalForward[2]+u*finalRight[2]+v*finalUp[2]];
 const t=(z-finalEye[2]+slope*finalEye[0])/(ray[2]-slope*ray[0]);return [finalEye[0]+t*ray[0],finalEye[1]+t*ray[1],finalEye[2]+t*ray[2]];
}

// Every member is a closed rectangular prism in world space. Both truss walls,
// tower cross-bracing and deck cross-members have real depth and occlusion.
export const ThreeBridge:React.FC=()=>{
 const f=Math.min(useCurrentFrame(),132);
 const lower=ease(f,0,42);
 // Fixed viewing direction: the opening is a close shot of the lift descending.
 // A straight pullback makes room for the crest, then stops before the click.
 const travel=ease(f,30,54);
 const azimuth=0;
 const radius=mix(900,1300,travel),elevation=.32;
 const target:V=[0,mix(-85,0,travel),0];
 const eye:V=[Math.sin(azimuth)*radius,target[1]+radius*elevation,-Math.cos(azimuth)*radius];
 const forward=unit(sub(target,eye)),right=unit(cross([0,1,0],forward)),up=unit(cross(forward,right));
 const project=(v:V):V=>{
  const relative=sub(v,eye),depth=dot(relative,forward),scale=1450/depth;
  return [960+dot(relative,right)*scale,540-dot(relative,up)*scale,depth];
 };
 const faces:{v:V[],color:string,depth:number}[]=[];
 const beam=(a:V,b:V,width=10,color=[203,208,151])=>{
  if(Math.hypot(...sub(b,a))<.001)return;
  const direction=unit(sub(b,a));const reference:V=Math.abs(direction[2])>.9?[0,1,0]:[0,0,1];
  const u=unit(cross(direction,reference)),w=unit(cross(direction,u));
  const vertices=[a,b].flatMap(p=>[[-1,-1],[1,-1],[1,1],[-1,1]].map(([i,j])=>p.map((n,k)=>n+(u[k]*i+w[k]*j)*width/2) as V));
  for(const ids of [[0,3,2,1],[4,5,6,7],[0,1,5,4],[1,2,6,5],[2,3,7,6],[3,0,4,7]]){
   const pointsWorld=ids.map(i=>vertices[i]);
   const n=unit(cross(sub(pointsWorld[1],pointsWorld[0]),sub(pointsWorld[2],pointsWorld[0])));
   const light=mix(.62+.38*Math.max(0,dot(n,unit([-1,2,-2]))),1,ease(f,102,132));
   const v=pointsWorld.map(project);faces.push({v,color:`rgb(${color.map(c=>Math.round(c*light)).join(',')})`,depth:v.reduce((s,p)=>s+p[2],0)/4});
  }
 };
 const world=(x:number,y:number,z:number,span:boolean):V=>{
  const p=fromLogo(x,y,170+z+35,.55937);
  if(span)p[1]+=90*(1-lower);
  return p;
 };
 for(const group of ['left','span','right'] as const){
  for(const line of paths[group]){
   for(const z of [-35,35]){
    let prev:V|undefined;
    for(const [cmd,xx,yy] of line){const p=world(Number(xx),Number(yy),z,group==='span');if(cmd==='L'&&prev)beam(prev,p);prev=p;}
   }
  }
 }
 // Transverse deck beams and tower ties make the orbit read as a bridge in space.
 for(let x=448;x<=784;x+=42)beam(world(x,587,-35,true),world(x,587,35,true),7);
 for(const x of [387,440,790,843])for(const y of [485,540,600,649])beam(world(x,y,-35,false),world(x,y,35,false),6);

 // All brand elements share the same perspective camera and depth buffer ordering.
 const native=(x:number,y:number,z=0):V=>fromLogo(x,y,z);
 const face=(v:V[],color:number[])=>{
  const n=unit(cross(sub(v[1],v[0]),sub(v[2],v[0])));
  const l=mix(.76+.24*Math.max(0,dot(n,unit([-1,2,-2]))),1,ease(f,102,132));
  const points=v.map(project);faces.push({v:points,color:`rgb(${color.map(c=>Math.round(c*l)).join(',')})`,depth:points.reduce((t,p)=>t+p[2],0)/points.length});
 };
 // Thick curved rails, visibly three-dimensional during the reveal.
 for(const [radius,width,color,delay] of [[343,23,[255,253,247],60],[305,11,[203,208,151],63]] as [number,number,number[],number][]){
  const amount=ease(f,delay,112),count=Math.ceil(128*amount);
  const max=radius===343?Math.PI*2:Math.PI*2-.565;
  const start=radius===343?-Math.PI/2:.105;
  for(let i=0;i<count;i++){
   const a=start+max*i/128,b=start+max*Math.min(i+1,128*amount)/128;
   beam(native(625+radius*Math.cos(a),470+radius*Math.sin(a),30),native(625+radius*Math.cos(b),470+radius*Math.sin(b),30),width,color);
  }
 }
 // Three shaded spheres spring outward from the click, then settle into the mark.
 [[255,253,247],[255,146,117],[203,208,151]].forEach((color,k)=>{
  const t=ease(f,60+k*3,80+k*3);if(!t)return;
  const bounce=1+Math.sin(t*Math.PI)*.15,r=23*t*bounce;
  const c=native(488+k*86,292-35*(1-t),-30);
  const point=(a:number,b:number):V=>[c[0]+r*Math.sin(a)*Math.cos(b),c[1]+r*Math.cos(a),c[2]+r*Math.sin(a)*Math.sin(b)];
  for(let j=0;j<10;j++)for(let i=0;i<20;i++){
   const a=.001+Math.PI*j/10,b=.001+Math.PI*(j+1)/10,u=Math.PI*2*i/20,v=Math.PI*2*(i+1)/20;
   face([point(a,u),point(b,u),point(b,v)],color);face([point(a,u),point(b,v),point(a,v)],color);
  }
 });
 // Water is built from aqua tubular members rather than a flat overlay.
 paths.water.forEach((line,k)=>{let prev:V|undefined;const t=ease(f,60+k*3,91+k*3);
  line.slice(0,Math.floor(line.length*t)).forEach(([cmd,x,y])=>{const p=native(Number(x),Number(y)+Math.sin(Number(x)/35-f*.13)*3*(1-ease(f,100,132)),-10);if(cmd==='L'&&prev)beam(prev,p,14,[169,214,226]);prev=p;});
 });
 // A beveled-volume cursor follows a continuous world-space path into the click.
 if(f>=45){
  const t=ease(f,45,60),home=ease(f,65,126);
  const cx=mix(mix(1120,790,t),840,home),cy=mix(mix(240,465,t),388,home);
  const press=1-.12*Math.sin(Math.PI*ease(f,60,66));
  const outline=[[0,0],[74,36],[49,45],[72,68],[60,80],[38,57],[28,82]];
  const verts=outline.map(([x,y])=>native(cx+x*press,cy+y*press,-55));
  const back=outline.map(([x,y])=>native(cx+x*press,cy+y*press,-43));
  for(const tri of [[0,1,2],[0,2,4],[2,3,4],[0,4,5],[0,5,6]])face(tri.map(i=>verts[i]),[255,146,117]);
  for(let i=0;i<verts.length;i++){const j=(i+1)%verts.length;face([verts[i],back[i],back[j],verts[j]],[206,100,74]);}
  if(f>=60){const r=ease(f,60,68);const fade=1-ease(f,70,85);if(fade>0)for(let i=0;i<5;i++){const a=i*Math.PI/3-.9;beam(native(cx+Math.cos(a)*(12+r*14),cy+Math.sin(a)*(12+r*14),-58),native(cx+Math.cos(a)*(18+r*23),cy+Math.sin(a)*(18+r*23),-58),3*fade,[255,146,117]);}}
  const rays=ease(f,120,131);if(rays>0)for(const [x,y,xx,yy] of [[-50,5,-26,5],[-34,-36,-17,-18],[10,-50,7,-25],[49,-24,29,-13]])beam(native(cx+x,cy+y,-55),native(cx+xx,cy+yy,-55),7*rays,[255,146,117]);
 }
 // A depth buffer resolves occlusion per pixel, including every truss opening.
 const canvas=useRef<HTMLCanvasElement>(null);
 useLayoutEffect(()=>{
  const gl=canvas.current!.getContext('webgl',{alpha:true,antialias:true,preserveDrawingBuffer:true});
  if(!gl)throw new Error('WebGL is required to render the bridge');
  const shader=(type:number,source:string)=>{const s=gl.createShader(type)!;gl.shaderSource(s,source);gl.compileShader(s);if(!gl.getShaderParameter(s,gl.COMPILE_STATUS))throw new Error(gl.getShaderInfoLog(s)!);return s;};
  const vs=shader(gl.VERTEX_SHADER,'attribute vec3 position; attribute vec4 color; varying vec4 tint; void main(){float z=position.z; gl_Position=vec4((position.x/960.0-1.0)*z,(1.0-position.y/540.0)*z,1.0002*z-2.0002,z);tint=color;}');
  const fs=shader(gl.FRAGMENT_SHADER,'precision mediump float; varying vec4 tint; void main(){gl_FragColor=tint;}');
  const program=gl.createProgram()!;gl.attachShader(program,vs);gl.attachShader(program,fs);gl.linkProgram(program);gl.useProgram(program);
  const data:number[]=[];
  faces.sort((a,b)=>b.depth-a.depth);
  for(const face of faces){const rgb=face.color.match(/\d+/g)!.map(Number);for(let i=1;i<face.v.length-1;i++)for(const p of [face.v[0],face.v[i],face.v[i+1]])data.push(...p,...rgb.map(c=>c/255),1);}
  const buffer=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buffer);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(data),gl.STATIC_DRAW);
  const pos=gl.getAttribLocation(program,'position'),col=gl.getAttribLocation(program,'color');
  gl.enableVertexAttribArray(pos);gl.vertexAttribPointer(pos,3,gl.FLOAT,false,28,0);gl.enableVertexAttribArray(col);gl.vertexAttribPointer(col,4,gl.FLOAT,false,28,12);
  gl.viewport(0,0,1920,1080);gl.clearColor(0,0,0,0);gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);gl.enable(gl.DEPTH_TEST);gl.depthFunc(gl.LEQUAL);gl.enable(gl.BLEND);gl.blendFunc(gl.SRC_ALPHA,gl.ONE_MINUS_SRC_ALPHA);gl.drawArrays(gl.TRIANGLES,0,data.length/7);gl.finish();
  return()=>{gl.deleteBuffer(buffer);gl.deleteProgram(program);gl.deleteShader(vs);gl.deleteShader(fs);};
 },[f]);
 return <canvas ref={canvas} width={1920} height={1080} style={{position:'absolute',inset:0,width:1920,height:1080}}/>;
};
