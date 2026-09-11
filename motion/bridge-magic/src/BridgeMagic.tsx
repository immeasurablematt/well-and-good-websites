import React from 'react';
import {AbsoluteFill,Easing,Img,interpolate,staticFile,useCurrentFrame} from 'remotion';
import {ThreeBridge} from './ThreeBridge';
import {CLICK,COLOUR_END,REVEAL} from './timeline';
export const DEFAULTS={background:'#1e3d34'};
type Props=Partial<typeof DEFAULTS>;
export const Stage:React.FC<Props>=({background=DEFAULTS.background})=><AbsoluteFill style={{background,backgroundImage:'none'}}/>;
// Match the existing website poster crop, with one fixed edge for the whole finish.
const CREST={x:960,y:540,rx:356.4,ry:361.8};
export const CrestOutline:React.FC=()=>{
 const t=interpolate(useCurrentFrame(),[REVEAL,112],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:Easing.inOut(Easing.cubic)});
 return <svg viewBox="0 0 1920 1080" style={{position:'absolute',inset:0,width:'100%',height:'100%'}}>
  <ellipse cx={CREST.x} cy={CREST.y} rx={CREST.rx-12} ry={CREST.ry-12} fill="none" stroke="#fffdf7" strokeWidth={24} pathLength={1} strokeDasharray={1} strokeDashoffset={1-t}/>
 </svg>;
};
// The click starts the colour change. The original mark covers the 3D scene
// directly, avoiding the dim halfway frame of two opposing opacity fades.
export const LogoFinish:React.FC<Props>=()=>{
 const f=useCurrentFrame();
 const t=interpolate(f,[CLICK,COLOUR_END],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:Easing.out(Easing.cubic)});
 return <AbsoluteFill style={{opacity:t,clipPath:`ellipse(${CREST.rx}px ${CREST.ry}px at ${CREST.x}px ${CREST.y}px)`}}>
  <Img src={staticFile('logo-original.png')} style={{position:'absolute',left:271.95,top:22.45,width:1379.4,height:1379.4,maxWidth:'none'}}/>
 </AbsoluteFill>;
};
export const BridgeScene:React.FC=()=>{
 return useCurrentFrame()<COLOUR_END?<ThreeBridge/>:null;
};
export const BridgeMagic:React.FC<Props&{sound?:boolean}>=({sound=false,...props})=><AbsoluteFill><Stage {...props}/><BridgeScene/><LogoFinish/><CrestOutline/></AbsoluteFill>;
