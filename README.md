# French Hub

Practice for Leçon 3A1, les adjectifs descriptifs: meanings, the four forms, which 11 adjectives go before the noun, bel / nouvel / vieil, de vs des, and hair adjectives.

- **Dashboard**: words learned, reviews due, day streak, grammar accuracy, what to do next, trouble words.
- **Vocab**: learn new words in groups of 5 (study cards with all four forms, then a quiz both ways), then spaced-repetition reviews (FSRS-4.5, the same scheduler as the Latin hub). All words lists each word's status.
- **Grammar**: sentences and phrases (agreement, placement, bel / nouvel / vieil, de vs des, hair), with the matching rule shown beside each question.
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

Progress is saved in the browser (localStorage, `frhub:*`); nothing is sent anywhere.

## Deploy

Pushing to `main` runs `.github/workflows/pages.yml`: test, then publish `index.html` and `french.js` to GitHub Pages.
