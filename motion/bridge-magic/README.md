# Bridge Magic

Six-second silent Remotion ident for the Well and Good homepage.

The bridge lowers in a tight, fixed-angle 3D shot during frames 0-42. A straight pullback ends at frame 54. The rings, dots and water assemble during frames 60-112. The cursor arrives, presses at frame 132, and starts the colour change on that same timeline cue. The final logo is complete at frame 150 and holds through frame 179.

The outer ellipse keeps the same dimensions during the reveal, colour change and final hold. Its edge is cropped in the rendered film, so the website does not apply a second crop or change blending when playback ends.

## Render and edit

Run `npm ci`, `npm run studio`, `npm run render`, and `npm run poster`. Run `npm run typecheck` to validate source. Rendering uses local Chromium with software WebGL. No cloud rendering, paid assets or sound.

After rendering, copy the silent master and export the website assets from this folder:

```sh
cp out/bridge-magic.mp4 out/bridge-magic-silent.mp4
ffmpeg -i out/bridge-magic.mp4 -vf 'crop=1080:1080:420:0,scale=600:600' -c:v libx264 -crf 22 -preset slow -pix_fmt yuv420p -movflags +faststart -an -y ../../site-growth/assets/bridge-magic-clean-edge.mp4
ffmpeg -i ../../site-growth/assets/bridge-magic-clean-edge.mp4 -vf "select='eq(n,179)'" -frames:v 1 -y out/qa/web-poster.png
cwebp -q 92 out/qa/web-poster.png -o ../../site-growth/assets/bridge-magic-clean-edge.webp
```

Create `out/qa/` first if it does not exist. The shared poster remains 600 by 600 pixels; verify the header and footer crop whenever replacing it.

`src/ThreeBridge.tsx` contains the solid truss walls, transverse members, spheres, rails, camera and rigid lift motion. `src/paths.json` contains logo-derived centre lines. `src/BridgeMagic.tsx` supplies the stage and final colour fade. `src/workbench.ts` exposes the same components to the local Shotcraft workbench.

Run `npm run preview` and open http://127.0.0.1:3108/ to play the master. The copied Shotcraft workbench and development history remain local in ignored directories. Remotion Studio works from this checkout after installing dependencies.

## Deliverables

- `out/bridge-magic.mp4` and `out/bridge-magic-silent.mp4`: identical silent1920x1080,30fps exports.
- `out/poster.png`: final frame179.
- `../../site-growth/assets/bridge-magic-clean-edge.mp4`: optimized600x600 H.264 fast-start website copy.
- Matching WebP poster: static fallback for reduced motion, data saving, disabled JavaScript or unavailable autoplay.

The website loads video only when visible, plays once without visible controls, and retains the final logo. The original source logo is preserved in `public/logo-original.png`. Recipe references and their upstream license are in `references/`. Earlier designs and QA files remain local under `versions/` and `out/qa/`.
