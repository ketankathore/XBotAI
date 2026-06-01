# XBotAI

Simple React + Vite demo that implements a chat UI with stubbed AI replies, per-message feedback (thumbs up/down), conversation save with rating and notes, and a `/history` view to browse saved conversations.

Getting started

```bash
cd e:/Crio/XBotAI
npm install
npm run dev
# open http://localhost:5173
```

Notes
- Chat input placeholder is `Message Bot AI…` and Ask button is `type="submit"`.
- Save dialog uses a `type="button"` Save control.
- Conversations persist in `localStorage` under `xbotai_conversations`.

Requirements covered
- Accessible attributes added: messages container has `role="log" aria-live="polite"` and the input has `aria-label`.
- Meta description and keywords present in `index.html`.

Deployment

Vercel (recommended):

1. Push your repo to GitHub.
2. In Vercel, import the GitHub project.
3. Set the build command to `npm run build` and the output directory to `dist`.
4. If you hit `Permission denied` errors for `node_modules/.bin/vite`, the repository already includes a workaround in `package.json` (`node ./node_modules/vite/bin/vite.js build`).

Netlify / Other: Build command `npm run build`, publish `dist`.

Code quality
- Add ESLint and Prettier for linting and formatting: `npm i -D eslint prettier eslint-config-prettier` and configure as needed.

Figma
- This project contains a visual approximation of the Figma screens; further pixel-perfect polishing can be done on demand.

