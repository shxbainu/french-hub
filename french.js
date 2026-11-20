// Data and question logic for French Hub. Loaded by index.html as a plain script (works from file://)
// and by test.js through module.exports.
(function () {
  // Leçon 3A1, les adjectifs descriptifs. f = [m. sg., f. sg., m. pl., f. pl.].
  // on: which nouns it fits in the phrase drill (p people, a animals, t things). before: one of the 11 that go before the noun.
  const A = (id, f, en, group, extra) => ({ id, f, en, group, lesson: '3A1', on: 'pat', ...extra });
  const ADJ = [
    A('bleu', ['bleu', 'bleue', 'bleus', 'bleues'], ['blue'], 'desc', { on: 'at' }),
    A('blond', ['blond', 'blonde', 'blonds', 'blondes'], ['blond', 'blonde', 'fair-haired'], 'desc', { on: 'p', hair: true }),
    A('brun', ['brun', 'brune', 'bruns', 'brunes'], ['black-haired', 'dark-haired'], 'desc', { on: '', hair: true }),
    A('châtain', ['châtain', 'châtain', 'châtains', 'châtains'], ['brown-haired'], 'desc', { on: '', hair: true, note: 'Same form for masculine and feminine.' }),
    A('court', ['court', 'courte', 'courts', 'courtes'], ['short'], 'desc', { on: 't' }),
    A('jeune', ['jeune', 'jeune', 'jeunes', 'jeunes'], ['young'], 'desc', { on: 'pa', before: true, note: 'Already ends in -e: same for masculine and feminine.' }),
    A('joli', ['joli', 'jolie', 'jolis', 'jolies'], ['pretty'], 'desc', { before: true }),
    A('laid', ['laid', 'laide', 'laids', 'laides'], ['ugly'], 'desc'),
    A('marron', ['marron', 'marron', 'marron', 'marron'], ['brown'], 'desc', { on: 'at', note: 'Invariable: never changes, not even in the plural.' }),
    A('noir', ['noir', 'noire', 'noirs', 'noires'], ['black'], 'desc', { on: 'at' }),
    A('petit', ['petit', 'petite', 'petits', 'petites'], ['small', 'little', 'short'], 'desc', { before: true }),
    A('raide', ['raide', 'raide', 'raides', 'raides'], ['straight'], 'desc', { on: '', hair: true, note: 'Used for hair: les cheveux raides.' }),
    A('roux', ['roux', 'rousse', 'roux', 'rousses'], ['red-haired', 'red'], 'desc', { on: 'p', hair: true }),
    A('vert', ['vert', 'verte', 'verts', 'vertes'], ['green'], 'desc', { on: 'at' }),

    A('beau', ['beau', 'belle', 'beaux', 'belles'], ['beautiful', 'handsome', 'good-looking'], 'irr', { before: true, alt: 'bel' }),
    A('nouveau', ['nouveau', 'nouvelle', 'nouveaux', 'nouvelles'], ['new'], 'irr', { before: true, alt: 'nouvel' }),
    A('vieux', ['vieux', 'vieille', 'vieux', 'vieilles'], ['old'], 'irr', { before: true, alt: 'vieil' }),
    A('bon', ['bon', 'bonne', 'bons', 'bonnes'], ['good'], 'irr', { before: true }),
    A('fier', ['fier', 'fière', 'fiers', 'fières'], ['proud'], 'irr', { on: 'p' }),
    A('gros', ['gros', 'grosse', 'gros', 'grosses'], ['big', 'fat'], 'irr', { before: true }),
    A('heureux', ['heureux', 'heureuse', 'heureux', 'heureuses'], ['happy'], 'irr', { on: 'pa' }),
    A('malheureux', ['malheureux', 'malheureuse', 'malheureux', 'malheureuses'], ['unhappy'], 'irr', { on: 'pa' }),
    A('curieux', ['curieux', 'curieuse', 'curieux', 'curieuses'], ['curious'], 'irr', { on: 'pa' }),
    A('nerveux', ['nerveux', 'nerveuse', 'nerveux', 'nerveuses'], ['nervous'], 'irr', { on: 'pa' }),
    A('intellectuel', ['intellectuel', 'intellectuelle', 'intellectuels', 'intellectuelles'], ['intellectual'], 'irr', { on: 'p' }),
    A('long', ['long', 'longue', 'longs', 'longues'], ['long'], 'irr', { on: 't', before: true }),
    A('naïf', ['naïf', 'naïve', 'naïfs', 'naïves'], ['naïve', 'innocent'], 'irr', { on: 'p' }),

    // On the "11 adjectives that go before" list but not in the vocab list above.
    A('grand', ['grand', 'grande', 'grands', 'grandes'], ['big', 'tall', 'great'], 'bags', { before: true }),
    A('mauvais', ['mauvais', 'mauvaise', 'mauvais', 'mauvaises'], ['bad'], 'bags', { before: true }),
  ];
  // One entry per handout. New lessons: add here and tag their words with lesson: '<id>'.
  const LESSONS = [{ id: '3A1', title: 'Leçon 3A1', sub: 'Les adjectifs descriptifs' }];
  const GROUPS = { desc: 'Descriptive adjectives', irr: 'Irregular adjectives', bags: 'Also on the “before” list' };
  const SLOT = ['masculine singular', 'feminine singular', 'masculine plural', 'feminine plural'];
  const BEFORE = ['beau', 'bon', 'grand', 'gros', 'jeune', 'joli', 'long', 'mauvais', 'nouveau', 'petit', 'vieux'];

  // v: starts with a vowel or silent h (takes bel / nouvel / vieil). k: person, animal or thing.
  const N = (sg, pl, g, en, enp, k, v) => ({ sg, pl, g, en, enp, k, v: !!v });
  const NOUNS = [
    N('chien', 'chiens', 'm', 'dog', 'dogs', 'a'), N('chat', 'chats', 'm', 'cat', 'cats', 'a'),
    N('oiseau', 'oiseaux', 'm', 'bird', 'birds', 'a', 1), N('livre', 'livres', 'm', 'book', 'books', 't'),
    N('lycée', 'lycées', 'm', 'high school', 'high schools', 't'), N('arbre', 'arbres', 'm', 'tree', 'trees', 't', 1),
    N('garçon', 'garçons', 'm', 'boy', 'boys', 'p'), N('homme', 'hommes', 'm', 'man', 'men', 'p', 1),
    N('ami', 'amis', 'm', 'friend', 'friends', 'p', 1),
    N('fille', 'filles', 'f', 'girl', 'girls', 'p'), N('femme', 'femmes', 'f', 'woman', 'women', 'p'),
    N('maison', 'maisons', 'f', 'house', 'houses', 't'), N('voiture', 'voitures', 'f', 'car', 'cars', 't'),
    N('histoire', 'histoires', 'f', 'story', 'stories', 't', 1), N('école', 'écoles', 'f', 'school', 'schools', 't', 1),
  ];

  const TOPICS = [
    ['fr-en', 'Meaning: French → English'],
    ['en-fr', 'Meaning: English → French'],
    ['forms', 'The four forms'],
    ['place', 'Before or after the noun?'],
    ['phrase', 'Write the phrase'],
    ['bel', 'bel, nouvel, vieil'],
    ['de', 'de or des?'],
    ['hair', 'Hair'],
  ];

  const pick = (a) => a[Math.floor(Math.random() * a.length)];
  // focus: word ids to drill (trouble words); falls back to every word when none fit the question.
  let focus = [];
  function pool(pred = () => true) {
    const all = ADJ.filter(pred), f = all.filter((a) => focus.includes(a.id));
    return f.length ? f : all;
  }
  const byId = Object.fromEntries(ADJ.map((a) => [a.id, a]));
  const slotOf = (g, pl) => (g === 'f' ? 1 : 0) + (pl ? 2 : 0);

  // The adjective's form next to a noun: bel / nouvel / vieil before a masculine singular vowel or silent h.
  function formFor(a, n, pl) {
    if (!pl && n.g === 'm' && n.v && a.alt) return a.alt;
    return a.f[slotOf(n.g, pl)];
  }
  // "a small dog" → "un petit chien"; plural with the adjective first → "de", otherwise "des".
  function phrase(a, n, pl) {
    const form = formFor(a, n, pl), noun = pl ? n.pl : n.sg;
    const art = pl ? (a.before ? 'de' : 'des') : n.g === 'f' ? 'une' : 'un';
    const fr = art + ' ' + (a.before ? form + ' ' + noun : noun + ' ' + form);
    const enAdj = a.en[0], enNoun = pl ? n.enp : n.en;
    const en = pl ? enAdj + ' ' + enNoun : (/^[aeiou]/.test(enAdj) ? 'an ' : 'a ') + enAdj + ' ' + enNoun;
    return { fr, en, form, art };
  }
  const fits = (a, n) => a.on.includes(n.k);

  function whyForm(a, i) {
    if (a.note) return a.note;
    return a.id + ' → ' + a.f.join(', ') + '.';
  }
  function whyPlace(a) {
    return a.before
      ? a.id + ' is one of the 11 that go before the noun: ' + BEFORE.join(', ') + '.'
      : 'Most adjectives go after the noun. Only these 11 go before: ' + BEFORE.join(', ') + '.';
  }

  const Q = {
    'fr-en'() {
      const a = pick(pool());
      return { topic: 'fr-en', word: a.id, ask: 'What does it mean?', show: a.f[0], showLang: 'fr', sub: a.f.join(' · '), lang: 'en', answers: a.en, why: a.id + ': ' + a.en.join(', ') + '.' };
    },
    'en-fr'() {
      const a = pick(pool());
      return { topic: 'en-fr', word: a.id, ask: 'In French (masculine singular)', show: a.en[0], showLang: 'en', lang: 'fr', answers: [a.f[0]], why: a.en[0] + ' = ' + a.f.join(', ') + '.' + (a.note ? ' ' + a.note : '') };
    },
    forms() {
      const a = pick(pool((x) => x.id !== 'marron' || Math.random() < 0.3));
      const i = 1 + Math.floor(Math.random() * 3);
      return { topic: 'forms', word: a.id, ask: 'Give the ' + SLOT[i], show: a.f[0], showLang: 'fr', sub: a.en[0], lang: 'fr', answers: [a.f[i]], why: whyForm(a, i) };
    },
    place() {
      const a = pick(pool((x) => x.on));
      const n = pick(NOUNS.filter((x) => fits(a, x)));
      const p = phrase(a, n, false);
      return {
        topic: 'place', word: a.id, ask: 'Where does it go?', show: (n.g === 'f' ? 'une ' : 'un ') + n.sg + ' + ' + a.f[0], showLang: 'fr', sub: p.en,
        choices: ['before the noun', 'after the noun'], answers: [a.before ? 'before the noun' : 'after the noun'], why: whyPlace(a) + ' → ' + p.fr,
      };
    },
    phrase() {
      const a = pick(pool((x) => x.on));
      const n = pick(NOUNS.filter((x) => fits(a, x)));
      const pl = Math.random() < 0.4;
      const p = phrase(a, n, pl);
      const bits = [whyPlace(a)];
      if (p.form !== a.f[0] || pl) bits.push(n.sg + ' is ' + (n.g === 'f' ? 'feminine' : 'masculine') + (pl ? ' plural' : '') + ', so ' + p.form + '.');
      if (p.form === a.alt) bits.push(a.alt + ' before a vowel or silent h.');
      if (pl && a.before) bits.push('Plural adjective before the noun: de, not des.');
      return { topic: 'phrase', word: a.id, ask: 'Write it in French', show: p.en, showLang: 'en', lang: 'fr', answers: [p.fr], why: bits.join(' ') };
    },
    bel() {
      const a = pick(pool((x) => x.alt));
      const n = pick(NOUNS.filter((x) => fits(a, x) && (x.g === 'm' || Math.random() < 0.3)));
      const pl = Math.random() < 0.2;
      const p = phrase(a, n, pl);
      const blank = p.art + ' ___ ' + (pl ? n.pl : n.sg);
      const why = p.form === a.alt ? n.sg + ' starts with a vowel or silent h, so ' + a.alt + ', not ' + a.f[0] + '.'
        : n.g === 'f' ? n.sg + ' is feminine: ' + p.form + '.' : pl ? 'Plural: ' + p.form + '. (' + a.alt + ' is only masculine singular.)'
        : n.sg + ' starts with a consonant, so ' + a.f[0] + '.';
      return { topic: 'bel', word: a.id, ask: 'Fill in ' + a.id, show: blank, showLang: 'fr', sub: p.en, lang: 'fr', answers: [p.form], why };
    },
    de() {
      const a = pick(pool((x) => x.on));
      const n = pick(NOUNS.filter((x) => fits(a, x)));
      const p = phrase(a, n, true);
      const rest = p.fr.slice(p.art.length + 1);
      return {
        topic: 'de', word: a.id, ask: 'de or des?', show: '___ ' + rest, showLang: 'fr', sub: p.en, choices: ['de', 'des'], answers: [p.art],
        why: a.before ? 'The plural adjective comes before the noun, so de, not des.' : 'The adjective comes after the noun, so des stays.',
      };
    },
    hair() {
      const subj = pick([['Il', 'm', false], ['Elle', 'f', false], ['Ils', 'm', true], ['Elles', 'f', true]]);
      if (Math.random() < 0.5) {
        const a = pick(pool((x) => ['brun', 'châtain', 'blond', 'roux'].includes(x.id)));
        const i = slotOf(subj[1], subj[2]);
        return { topic: 'hair', word: a.id, ask: 'Fill in ' + a.id, show: subj[0] + (subj[2] ? ' sont' : ' est') + ' ___.', showLang: 'fr', sub: a.en[0], lang: 'fr', answers: [a.f[i]], why: 'It describes ' + subj[0].toLowerCase() + ', so ' + SLOT[i] + ': ' + a.f[i] + '.' };
      }
      const a = pick(pool((x) => ['brun', 'châtain', 'blond', 'roux', 'raide', 'court', 'long', 'noir'].includes(x.id)));
      const verb = { Il: 'a', Elle: 'a', Ils: 'ont', Elles: 'ont' }[subj[0]];
      return { topic: 'hair', word: a.id, ask: 'Fill in ' + a.id, show: subj[0] + ' ' + verb + ' les cheveux ___.', showLang: 'fr', sub: a.en[0] + ' hair', lang: 'fr', answers: [a.f[2]], why: 'Les cheveux is always masculine plural, whoever has the hair: ' + a.f[2] + '.' };
    },
  };
  function question(topics, words) { focus = words || []; return Q[pick(topics)](); }

  // Answer checking: case, spacing and apostrophes don't matter; a missing accent still counts but is flagged.
  const norm = (s) => s.toLowerCase().replace(/[’‘`]/g, "'").replace(/[.!?]+$/, '').replace(/\s+/g, ' ').trim();
  const bare = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '');
  const enNorm = (s) => norm(s).replace(/^(a|an|the|to be|to) /, '').replace(/-/g, ' ');
  function check(q, input) {
    const n = q.lang === 'en' ? enNorm : norm;
    const got = n(input || '');
    if (!got) return { ok: false, accent: false };
    for (const ans of q.answers) {
      const want = n(ans);
      if (got === want) return { ok: true, accent: false };
      if (bare(got) === bare(want)) return { ok: true, accent: true };
    }
    return { ok: false, accent: false };
  }

  const api = { ADJ, LESSONS, GROUPS, SLOT, BEFORE, NOUNS, TOPICS, Q, question, check, phrase, formFor, byId };
  if (typeof module !== 'undefined') module.exports = api;
  else window.FR = api;
})();
