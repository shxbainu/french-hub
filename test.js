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
assert.deepEqual(check(q, 'fiere'), { ok: true, accent: true });
assert.equal(check(q, 'fier').ok, false);
assert.equal(check(q, '').ok, false);
assert.equal(check({ lang: 'en', answers: ['black-haired'] }, 'black haired').ok, true);
assert.equal(check({ lang: 'en', answers: ['small'] }, 'a small').ok, true);

// Every topic, many times: each question has an answer, and the answer passes its own check.
for (const [t] of TOPICS) for (let i = 0; i < 400; i++) {
  const x = Q[t]();
  assert.ok(x.answers.length && x.answers.every(Boolean), t);
  if (x.choices) assert.ok(x.choices.includes(x.answers[0]), t);
  else assert.ok(check(x, x.answers[0]).ok, t);
  assert.ok(x.show && x.why, t);
  assert.ok(A[x.word], t + ' has a word');
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

console.log('ok');
