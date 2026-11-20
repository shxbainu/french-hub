# French Hub

Practice for Leçon 3A1, les adjectifs descriptifs: meanings, the four forms, which 11 adjectives go before the noun, bel / nouvel / vieil, de vs des, and hair adjectives.

- **Practice**: tick the drills you want, 10, 20 or endless questions, the rule after every answer. Accents are optional but flagged.
- **Words**: every adjective with all four forms.
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

To add vocabulary, add entries to `ADJ` (and nouns to `NOUNS`) in `french.js`.

## Deploy

Pushing to `main` runs `.github/workflows/pages.yml`: test, then publish `index.html` and `french.js` to GitHub Pages.
