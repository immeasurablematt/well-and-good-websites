import {BridgeScene,Stage,LogoFinish,BridgeMagic,DEFAULTS} from './BridgeMagic';
import {FPS,TOTAL,SFX} from './timeline';
const schema=Object.entries(DEFAULTS).filter(([k])=>k!=='size').map(([key,value])=>({type:'color',key,label:key,default:value}));
export const WORKBENCH={
 name:'Well and Good | Bridge Magic',fps:FPS,width:1920,height:1080,total:TOTAL,background:DEFAULTS.background,
 overlays:[{id:'bridge3d',label:'3D bridge mesh and camera',from:0,duration:TOTAL,component:BridgeScene},{id:'bridge',label:'Original logo finish',from:0,duration:TOTAL,component:LogoFinish,props:DEFAULTS,schema}],
 shots:[{id:'stage',label:'Forest green stage',from:0,duration:TOTAL,component:Stage,props:DEFAULTS,schema}],
 transitions:[],
 captions:[],sfx:[],bgm:[],order:['transitions','captions','overlays'],original:BridgeMagic,
};
