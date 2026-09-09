import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const types={'.html':'text/html','.png':'image/png','.svg':'image/svg+xml','.mp4':'video/mp4','.wav':'audio/wav','.json':'application/json'};
http.createServer((req,res)=>{let name=decodeURIComponent(new URL(req.url,'http://localhost').pathname);if(name==='/')name='/preview.html';const file=path.resolve(root,'.'+name);if(!file.startsWith(root+path.sep)||!fs.existsSync(file)||!fs.statSync(file).isFile()){res.writeHead(404);res.end();return}const size=fs.statSync(file).size;const headers={'Content-Type':types[path.extname(file)]||'application/octet-stream','Accept-Ranges':'bytes'};const m=req.headers.range?.match(/bytes=(\d+)-(\d*)/);if(m){const start=Number(m[1]),end=m[2]?Math.min(Number(m[2]),size-1):size-1;if(start>=size||start>end){res.writeHead(416,{'Content-Range':`bytes */${size}`});res.end();return}res.writeHead(206,{...headers,'Content-Range':`bytes ${start}-${end}/${size}`,'Content-Length':end-start+1});fs.createReadStream(file,{start,end}).pipe(res)}else{res.writeHead(200,{...headers,'Content-Length':size});fs.createReadStream(file).pipe(res)}}).listen(3108,'127.0.0.1',()=>console.log('Bridge Magic preview: http://localhost:3108'));
