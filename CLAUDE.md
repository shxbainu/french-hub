# French Hub

French vocab + grammar practice for the user's class, built as a sibling of the Latin hub (github.com/shxbainu/latin-hub) but with its own look. Vanilla JS, no build step, no dependencies.

- Repo: github.com/shxbainu/french-hub (public, push to `main` deploys).
- GitHub Pages: https://shxbainu.github.io/french-hub/ (progress stays in that browser; Copy/Paste backup buttons in the sidebar move it).
- Claude page (artifact): https://claude.ai/artifact/VECt1ZhzgoB1TwYkihLJCp, declared capabilities `db` + `user`. The user's main copy: progress syncs to their Claude account across devices. After every change, republish it with the Artifact tool: `file_path` = `index.html`, `files: {"french.js": "french.js"}`, `url` = the link above, no `capabilities` (keeps db + user).

## Commands
- `node test.js`: checks phrases against the class sheet, answer checking (accents), every question generator ×400, FSRS steps.
- Preview: `.claude/launch.json` one level up runs `python3 -m http.server 5391 -d french-hub` (name `french-hub`), open http://localhost:5391/.
- Extract and syntax-check the inline script: pull the last `<script>` of index.html into a file, `node --check` it.

## Files
- `french.js`: data and logic, a classic-script IIFE exporting `window.FR` and `module.exports`. `ADJ` (via `A(id, f[4], en[], group, extra)`, extra: `on`, `before`, `alt`, `note`, `hair`, all tagged `lesson: '3A1'`), `LESSONS`, `NOUNS`, `LNOUNS` (vowel-initial nouns from the class sheets only, for the `gender` drill; the user wants no outside words, with `genderTip` ending rules), `BEFORE` (the 11 BAGS words), topics `VOCAB` / `GRAMMAR`, `RULE_OF`, question generators `Q[topic]`, `question(topics, focusWords)`, `check(q, input)`, FSRS-4.5 `review` / `retrievability`.
- `index.html`: all UI, inline CSS + script. Tiny DOM builder `h('tag.cls', attrs, ...kids)` (text nodes only, no innerHTML). Pages: Dashboard (`Home`), Vocab (Learn: Meet → Match → Recall; Review; All words), Grammar (picker + drill with help panel), Quiz (`Sheet`, nav right under Dashboard, full quiz or one part: a whole worksheet like the class handouts, built from `SHEET` in french.js: fix the mistake, two adjectives, opposites, feminine plural, translation, noun gender, traps (`TRAPS`: hair colour vs colour, les cheveux, bel vs beaux, marron); checked all at once), Rules (`RULES`). `QCard` is the question card, `Run` the deck.
- `.github/workflows/pages.yml`: runs tests, copies index.html + french.js, swaps `french.js?v=dev` for the commit SHA (cache-bust; Safari once paired a new page with a stale script), deploys.

## Progress: never lose it
- Stored in `P = { words, topics, days, cards, t }` under localStorage `frhub:progress`, and inside Claude at db doc `data/users/<uid>/french-progress`. `save()` stamps `t`; on connect the newer copy (by `t`) wins.
- Never rename these keys or the doc path, never change the shape of `P` destructively; add fields only. Learn saves each word's FSRS card as soon as it's answered in Recall (not at the summary).

## Decisions the user made
- Must be a dashboard (navy sidebar + home with tiles), stretched to the full screen width; text scales with a fluid root font (`clamp(15px, 0.62vw + 6.5px, 23px)`, everything in rem).
- Copy the Latin hub's feel: smooth card animations, wrong answer types itself in with the mistake highlighted, "type it again" retype box, translations after answers, misses return 3 cards later.
- Drill all four forms (+ bel/nouvel/vieil) so they can be memorized.
- Accents count in French answers (fiere ≠ fière → "Accent missing", must retype); English answers ignore accents.
- Rule reminders: "Remember" list on the dashboard and a `.remind` line on quiz cards (`REMIND`, `REMIND_OF`, `remindFor`). The user likes the BAGS reminder; keep it.
- Meeting a BAGS word shows a bigger "Goes BEFORE the noun" badge, no examples (the user said examples were too much).

## Next
The user will send more lessons as screenshots or a PDF. Add each to `LESSONS`, tag its words with `lesson`, and add drills only when the lesson brings a new grammar point. Add test cases for any new forms.
