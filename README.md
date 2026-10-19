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
- The Compiler nav link opens `Compiler Java/index.php`, a PHP page that needs the Docker setup (`docker build -t java-learner . && docker run -p 8080:80 java-learner`). It does not work on GitHub Pages, and it runs submitted code without a sandbox or time limit, so do not expose it publicly.
- Videos are streamed from `https://HareeshGT.github.io/ElearnVC/`.

## Site
https://java-learning-website.onrender.com/
