import React from 'react';
import {AbsoluteFill,Easing,Img,interpolate,staticFile,useCurrentFrame} from 'remotion';
import {ThreeBridge} from './ThreeBridge';
export const DEFAULTS={background:'#1e3d34'};
type Props=Partial<typeof DEFAULTS>;
export const Stage:React.FC<Props>=({background=DEFAULTS.background})=><AbsoluteFill style={{background,backgroundImage:'none'}}/>;
// Original source crest fades over the settled scene, never through a blank frame.
export const LogoFinish:React.FC<Props>=()=>{
 const f=useCurrentFrame();
 const t=interpolate(f,[150,172],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:Easing.inOut(Easing.cubic)});
 return <AbsoluteFill style={{opacity:t}}>
  <div style={{position:'absolute',left:567.85,top:144.55,width:784.3,height:790.9,borderRadius:'50%',overflow:'hidden',clipPath:'ellipse(calc(50% - 4px) calc(50% - 4px) at 50% 50%)'}}>
   <Img src={staticFile('logo-original.png')} style={{position:'absolute',left:-295.9,top:-122.1,width:1379.4,height:1379.4,maxWidth:'none'}}/>
  </div>
 </AbsoluteFill>;
};
export const BridgeScene:React.FC=()=>{
 const t=interpolate(useCurrentFrame(),[150,172],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:Easing.inOut(Easing.cubic)});
 return <AbsoluteFill style={{opacity:1-t}}><ThreeBridge/></AbsoluteFill>;
};
export const BridgeMagic:React.FC<Props&{sound?:boolean}>=({sound=false,...props})=><AbsoluteFill><Stage {...props}/><BridgeScene/><LogoFinish/></AbsoluteFill>;
