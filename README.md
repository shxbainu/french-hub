# French Hub

Practice for Leçon 3A1, les adjectifs descriptifs: meanings, the four forms, which 11 adjectives go before the noun, bel / nouvel / vieil, de vs des, and hair adjectives.

- **Dashboard**: words learned, reviews due, day streak, grammar accuracy, what to do next, trouble words.
- **Vocab**: learn new words in groups of 5 (meet each word and copy out every form, match them up, recall the meaning and all four forms); reviews mostly ask for every form, then spaced-repetition reviews (FSRS-4.5, the same scheduler as the Latin hub). All words lists each word's status.
- **Grammar**: sentences and phrases (agreement, placement, bel / nouvel / vieil, de vs des, hair), with the matching rule shown beside each question and the full sentence + translation after each answer.
- Accents count in French answers: *fiere* for *fière* is marked wrong (“Accent missing”) and has to be retyped. English answers ignore accents.
- Every quiz works like the Latin hub's: cards slide in and out, a miss shakes and types the right answer in with your mistake highlighted, you type it again to move on, and missed words come back a few cards later.
- **Rules**: the class notes with examples.

## Develop

No build step and no dependencies. Open `index.html` in a browser.

```
node test.js   # checks the phrases against the class sheet and that every question is answerable
```

| What | File |
| --- | --- |
| Adjectives, nouns, question generators, answer checking | `french.js` |
| The page (styles and UI) | `index.html` |

To add a lesson: add it to `LESSONS` in `french.js` and tag its words with `lesson: '<id>'`.

Progress is saved in the browser (localStorage, `frhub:*`). Opened as a Claude page, it also syncs to your Claude account, so it follows you across devices. On the GitHub Pages copy, use Copy / Paste backup in the sidebar to move it.

## Deploy

Pushing to `main` runs `.github/workflows/pages.yml`: test, then publish `index.html` and `french.js` to GitHub Pages.
