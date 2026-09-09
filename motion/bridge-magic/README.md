# Bridge Magic

Six-second silent Remotion ident for the Well and Good homepage.

The bridge lowers in a tight, fixed-angle 3D shot during frames0-42. A straight pullback ends at frame54. Click60 starts the circles, dots and water. The completed inverted crest fades to the original image-only logo during frames150-172, with a clipped edge to remove the source image fringe. The homepage holds the final frame after playback.

## Render and edit

Run `npm ci`, `npm run studio`, `npm run render`, and `npm run poster`. Run `npm run typecheck` to validate source. Rendering uses local Chromium with software WebGL. No cloud rendering, paid assets or sound.

`src/ThreeBridge.tsx` contains the solid truss walls, transverse members, spheres, rails, camera and rigid lift motion. `src/paths.json` contains logo-derived centre lines. `src/BridgeMagic.tsx` supplies the stage and final colour fade. `src/workbench.ts` exposes the same components to the local Shotcraft workbench.

Run `npm run preview` and open http://127.0.0.1:3108/ to play the master. The copied Shotcraft workbench and development history remain local in ignored directories. Remotion Studio works from this checkout after installing dependencies.

## Deliverables

- `out/bridge-magic.mp4` and `out/bridge-magic-silent.mp4`: identical silent1920x1080,30fps exports.
- `out/poster.png`: final frame179.
- `../../site-growth/assets/bridge-magic-clean-edge.mp4`: optimized600x600 H.264 fast-start website copy.
- Matching WebP poster: static fallback for reduced motion, data saving, disabled JavaScript or unavailable autoplay.

The website loads video only when visible, plays once, offers a44px pause control and retains the final logo. The original source logo is preserved in `public/logo-original.png`. Recipe references and their upstream license are in `references/`. Earlier designs and QA files remain local under `versions/` and `out/qa/`.
