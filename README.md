# Java Learner

A static website for learning Java: ten lessons, video playlists, practice problems with solutions, and quizzes. It is plain HTML, CSS and JavaScript, so there is no build step and no server code. It works on GitHub Pages.

## Run locally
Open `index.html` in a browser, or serve the folder (`python3 -m http.server`) and visit http://localhost:8000.

## Structure
- `assets/site.css`: design tokens, light/dark themes and shared components
- `assets/site.js`: theme toggle, search, code highlighting and copy, progress/bookmarks, quiz engine
- `assets/data.js`: lesson list and search index (generated from the pages)
- `assets/quiz-data.js`: quiz questions
- `*.html`: lesson, playlist, practice and quiz pages

## Notes
- Progress, bookmarks and the theme are saved in the browser's local storage. They are not synced between devices.
- There is no in-browser Java execution. `Compiler Java/` is a legacy PHP compiler that cannot run on GitHub Pages and runs submitted code without sandboxing. It is not linked from the site and should not be deployed as is.
- Videos are streamed from `https://HareeshGT.github.io/ElearnVC/`.
