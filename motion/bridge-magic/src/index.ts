import React from 'react';
import {Composition,registerRoot} from 'remotion';
import {BridgeMagic} from './BridgeMagic';
import {FPS,TOTAL} from './timeline';
const Root:React.FC=()=>React.createElement(Composition,{id:'BridgeMagic',component:BridgeMagic,durationInFrames:TOTAL,fps:FPS,width:1920,height:1080,defaultProps:{sound:false}});
registerRoot(Root);
