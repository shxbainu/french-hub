// node test.js — checks the phrases against the class sheet and that every question can be answered.
const assert = require('assert');
const FR = require('./french.js');
const { byId: A, NOUNS, phrase, check, Q, TOPICS } = FR;
const N = Object.fromEntries(NOUNS.map((n) => [n.sg, n]));

// Examples from the sheet.
assert.equal(phrase(A.nouveau, N.histoire, false).fr, 'une nouvelle histoire');
assert.equal(phrase(A.nouveau, N.ami, false).fr, 'un nouvel ami');
assert.equal(phrase(A.beau, N.homme, false).fr, 'un bel homme');
assert.equal(phrase(A.vieux, N.oiseau, false).fr, 'un vieil oiseau');
assert.equal(phrase(A.nouveau, N.ami, true).fr, 'de nouveaux amis');
assert.equal(phrase(A.beau, N.lycée, true).fr, 'de beaux lycées');
assert.equal(phrase(A.laid, N.oiseau, false).fr, 'un oiseau laid');
assert.equal(phrase(A.vert, N.oiseau, true).fr, 'des oiseaux verts');
assert.equal(phrase(A.vieux, N.homme, false).en, 'an old man');
assert.equal(phrase(A.marron, N.chat, true).fr, 'des chats marron');

// Answer checking.
const q = { lang: 'fr', answers: ['fière'] };
assert.deepEqual(check(q, ' Fière '), { ok: true, accent: false });
assert.deepEqual(check(q, 'fiere'), { ok: false, accent: true }); // accents count in French
assert.deepEqual(check(q, 'fièré'), { ok: false, accent: true });
assert.deepEqual(check({ lang: 'en', answers: ['naïve', 'innocent'] }, 'naive'), { ok: true, accent: false }); // not in English
assert.equal(check({ lang: 'fr', answers: ['châtain'] }, 'chatain').ok, false);
assert.equal(check(q, 'fier').ok, false);
assert.equal(check(q, '').ok, false);
assert.equal(check({ lang: 'en', answers: ['black-haired'] }, 'black haired').ok, true);
assert.equal(check({ lang: 'en', answers: ['small'] }, 'a small').ok, true);

// Every topic, many times: each question has an answer, and the answer passes its own check.
for (const [t] of TOPICS.concat(FR.SHEET)) for (let i = 0; i < 400; i++) {
  const x = Q[t]();
  assert.ok(x.answers.length && x.answers.every(Boolean), t);
  if (x.choices) assert.ok(x.choices.includes(x.answers[0]), t);
  else if (x.cells) assert.ok(x.cells.every((c) => check({ lang: 'fr', answers: c.answers }, c.answers[0]).ok), t);
  else assert.ok(check(x, x.answers[0]).ok, t);
  assert.ok(x.show && x.why, t);
  assert.ok(A[x.word], t + ' has a word');
  assert.ok(x.hint, t + ' has a hint');
  if (x.full) assert.ok(x.en && !x.full.includes('___'), t + ' full sentence + translation');
}

// Trouble-word focus: questions stick to the focus words when the drill allows them.
for (let i = 0; i < 100; i++) assert.equal(FR.question(['forms'], ['fier']).word, 'fier');
assert.equal(FR.question(['bel'], ['fier']).word === 'fier', false); // fier has no bel-form: falls back
assert.ok(FR.ADJ.every((a) => FR.LESSONS.some((l) => l.id === a.lesson)));
// Sentences.
const sent = FR.Q.sent; // smoke-tested in the loop above; exact forms here:
assert.equal(FR.byId.heureux.f[3], 'heureuses');
for (let i = 0; i < 300; i++) {
  const x = sent();
  assert.ok(/^(J'ai (un|une|de|des) |(Le|La|Les|L') ?)/.test(x.answers[0]), x.answers[0]);
  assert.ok(x.answers[0].endsWith('.'), x.answers[0]);
}
assert.ok(check({ lang: 'fr', answers: ["L'homme est heureux."] }, "l’homme est heureux").ok);

// Spaced repetition: new card → 10 min, then good → at least half a day; again → 5 min relearning.
const t0 = Date.now();
let c = FR.review(null, 3, t0);
assert.equal(c.due - t0, 10 * FR.MIN);
c = FR.review(c, 3, t0 + 10 * FR.MIN);
assert.ok(c.state === 'review' && c.due - (t0 + 10 * FR.MIN) >= 0.5 * FR.DAY);
const d = FR.review(c, 1, c.due);
assert.equal(d.state, 'relearning');
assert.equal(d.due - c.due, 5 * FR.MIN);
assert.equal(FR.TOPICS.length, FR.VOCAB.length + FR.GRAMMAR.length);
assert.ok(FR.GRAMMAR.every(([t]) => FR.RULE_OF[t]));

// All forms: four cells, plus the vowel form for beau / nouveau / vieux.
const all = FR.question(['all'], ['vieux']);
assert.deepEqual(all.cells.map((c) => c.answers[0]), ['vieux', 'vieille', 'vieux', 'vieilles', 'vieil']);
assert.equal(FR.question(['all'], ['bleu']).cells.length, 4);

// Practice sheet: the worksheet's own answers come out of the generators.
const seen = (t, re, n = 3000) => { for (let i = 0; i < n; i++) if (re.test(FR.question([t]).answers[0])) return true; return false; };
assert.ok(seen('two', /^C'est une petite fille rousse\.$/, 20000));
assert.ok(seen('two', /^Ce sont de jeunes filles intellectuelles\.$/, 20000));
assert.ok(seen('fix', /^Ce sont de bons /));
assert.ok(seen('opp', /^longs$/));
for (let i = 0; i < 500; i++) { const x = Q.two(); assert.ok(!/ des [a-zé]+ (jeune|beau|bon|petit|grand|gros|joli|long|mauvais|nouveau|vieux)/.test(x.answers[0]), x.answers[0]); }
assert.equal(check({ lang: 'fr', answers: ["C'est un livre court.", 'correct'] }, 'Correct').ok, true);
assert.equal(FR.question(['fempl'], ['marron']).answers[0], 'marron');

console.log('ok');
