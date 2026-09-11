export const FPS=30;
export const TOTAL=180;
export const REVEAL=60;
export const CLICK=132;
export const COLOUR_END=150;
export const SHOTS={descent:{from:0,duration:42},pullback:{from:30,duration:24},pause:{from:54,duration:6},reveal:{from:REVEAL,duration:52},click:{from:CLICK-6,duration:12},settle:{from:CLICK,duration:COLOUR_END-CLICK},hold:{from:COLOUR_END,duration:TOTAL-COLOUR_END}};
// This revision is silent. One shared click frame triggers the visual response.
export const SFX: {id:string;from:number;duration:number;src:string;volume:number}[]=[];
