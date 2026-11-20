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
console.log('ok');
