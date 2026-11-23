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

    // Cognates: same or similar spelling and meaning in English. reg: +e / +s; same: already ends in -e.
    ...[
      ['agréable', 'same', ['pleasant'], 'pt'], ['amical', null, ['friendly'], 'pa'], ['amusant', 'reg', ['fun', 'funny', 'amusing'], 'pt'],
      ['désagréable', 'same', ['unpleasant'], 'pt'], ['égoïste', 'same', ['selfish'], 'p'], ['élégant', 'reg', ['elegant'], 'pt'],
      ['impatient', 'reg', ['impatient'], 'p'], ['impoli', 'reg', ['impolite', 'rude'], 'p'], ['indépendant', 'reg', ['independent'], 'p'],
      ['intelligent', 'reg', ['intelligent', 'smart'], 'pa'], ['intéressant', 'reg', ['interesting'], 'pt'], ['occupé', 'reg', ['busy'], 'p'],
      ['optimiste', 'same', ['optimistic'], 'p'], ['patient', 'reg', ['patient'], 'p'], ['pessimiste', 'same', ['pessimistic'], 'p'],
      ['poli', 'reg', ['polite'], 'p'], ['réservé', 'reg', ['reserved'], 'p'], ['sincère', 'same', ['sincere'], 'p'],
      ['sympathique', 'same', ['nice', 'likeable'], 'pa'],
    ].map(([w, k, en, on]) => {
      const f = k === 'reg' ? [w, w + 'e', w + 's', w + 'es'] : k === 'same' ? [w, w, w + 's', w + 's'] : ['amical', 'amicale', 'amicaux', 'amicales'];
      const note = w === 'amical' ? '-al → -aux in the masculine plural: amicaux (but amicales).' : w === 'sympathique' ? 'Short form: sympa (plural sympas).' : k === 'same' ? 'Already ends in -e: same for masculine and feminine.' : undefined;
      return A(w, f, en, 'cog', { on, note });
    }),

    // Nationalities: lower case in French. -ien → -ienne; -s words add no -s in the masculine plural.
    ...[
      ['allemand', ['German']], ['anglais', ['English']], ['chinois', ['Chinese']], ['coréen', ['Korean']], ['cubain', ['Cuban']],
      ['espagnol', ['Spanish']], ['indien', ['Indian']], ['italien', ['Italian']], ['irlandais', ['Irish']], ['japonais', ['Japanese']],
      ['martiniquais', ['Martinican', 'from Martinique']], ['mexicain', ['Mexican']], ['polonais', ['Polish']], ['portugais', ['Portuguese']],
      ['québécois', ['Québécois', 'from Quebec']], ['russe', ['Russian']],
    ].map(([w, en]) => {
      const fem = w.endsWith('ien') || w.endsWith('éen') ? w + 'ne' : w === 'russe' ? w : w + 'e';
      const f = [w, fem, w.endsWith('s') ? w : w + 's', fem + 's'];
      const note = fem.endsWith('nne') ? '-en → -enne: add -ne for the feminine.' : w.endsWith('s') ? 'Ends in -s: no extra -s in the masculine plural.' : w === 'russe' ? 'Already ends in -e: same for masculine and feminine.' : undefined;
      return A(w, f, en, 'nat', { note });
    }),
  ];
  // One entry per handout. New lessons: add here and tag their words with lesson: '<id>'.
  const LESSONS = [{ id: '3A1', title: 'Leçon 3A1', sub: 'Les adjectifs descriptifs' }];
  const GROUPS = { desc: 'Descriptive adjectives', irr: 'Irregular adjectives', bags: 'Also on the “before” list', cog: 'Cognates', nat: 'Nationalities' };
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

  // Vocab drills feed the spaced-repetition review; grammar drills are sentence work with a rule beside them.
  const VOCAB = [['fr-en', 'Meaning: French → English'], ['en-fr', 'Meaning: English → French'], ['forms', 'One form'], ['all', 'All four forms']];
  const GRAMMAR = [
    ['sent', 'Sentences'], ['phrase', 'Write the phrase'], ['place', 'Before or after the noun?'],
    ['bel', 'bel, nouvel, vieil'], ['de', 'de or des?'], ['hair', 'Hair'],
  ];
  const TOPICS = VOCAB.concat(GRAMMAR);
  // Which rule cards to show beside each grammar drill (ids of the cards on the Rules page).
  const RULE_OF = { sent: ['agree', 'before'], phrase: ['before', 'agree'], place: ['before'], bel: ['bel'], de: ['de'], hair: ['hair'] };

  const pick = (a) => a[Math.floor(Math.random() * a.length)];
  // focus: word ids to drill (trouble words); falls back to every word when none fit the question.
  let focus = [];
  function pool(pred = () => true) {
    const all = ADJ.filter(pred), f = all.filter((a) => focus.includes(a.id));
    if (f.length) return f;
    // Drills and quizzes lean on the class sheet's words; cognates and nationalities only come up now and then.
    const core = all.filter((a) => a.group !== 'cog' && a.group !== 'nat');
    return core.length && Math.random() < 0.85 ? core : all;
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
    const en = pl ? enAdj + ' ' + enNoun : (/^[aeiou]/i.test(enAdj) ? 'an ' : 'a ') + enAdj + ' ' + enNoun;
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

  const cap = (x) => x[0].toUpperCase() + x.slice(1);
  const theNoun = (n, pl) => (pl ? 'les ' + n.pl : n.v ? "l'" + n.sg : (n.g === 'f' ? 'la ' : 'le ') + n.sg);
  // "The girls are happy." → "Les filles sont heureuses."  brun / châtain work here for people.
  function predicate(a, n, pl) {
    const form = a.f[slotOf(n.g, pl)];
    return { fr: cap(theNoun(n, pl)) + (pl ? ' sont ' : ' est ') + form + '.', en: 'The ' + (pl ? n.enp : n.en) + (pl ? ' are ' : ' is ') + a.en[0] + '.', form };
  }
  const fitsPred = (a, n) => (a.on ? fits(a, n) : n.k === 'p');

  const EN_SUBJ = { Il: ['He is', 'He has'], Elle: ['She is', 'She has'], Ils: ['They are', 'They have'], Elles: ['They are', 'They have'] };
  const HINT = {
    phrase: 'Before or after the noun? Masculine or feminine, singular or plural?',
    hair: 'Who does it describe: the person, or les cheveux (always masculine plural)?',
  };
  const startsWith = (w) => 'Starts with “' + w.slice(0, w.length > 5 ? 2 : 1) + '…”';

  const Q = {
    'fr-en'() {
      const a = pick(pool());
      return { topic: 'fr-en', word: a.id, ask: 'What does it mean?', show: a.f[0], showLang: 'fr', sub: a.f.join(' · '), lang: 'en', answers: a.en, why: a.id + ': ' + a.en.join(', ') + '.', hint: startsWith(a.en[0]) };
    },
    'en-fr'() {
      const a = pick(pool());
      return { topic: 'en-fr', word: a.id, ask: 'In French (masculine singular)', show: a.en[0], showLang: 'en', lang: 'fr', answers: [a.f[0]], why: a.en[0] + ' = ' + a.f.join(', ') + '.' + (a.note ? ' ' + a.note : ''), hint: startsWith(a.f[0]) };
    },
    forms() {
      const a = pick(pool());
      const i = 1 + Math.floor(Math.random() * 3);
      return { topic: 'forms', word: a.id, ask: 'Give the ' + SLOT[i], show: a.f[0], showLang: 'fr', sub: a.en[0], lang: 'fr', answers: [a.f[i]], why: whyForm(a, i), hint: startsWith(a.f[i]) };
    },
    sent() {
      if (Math.random() < 0.5) {
        const a = pick(pool((x) => x.on || x.id === 'brun' || x.id === 'châtain'));
        const n = pick(NOUNS.filter((x) => fitsPred(a, x)));
        const pl = Math.random() < 0.45, p = predicate(a, n, pl);
        return { topic: 'sent', word: a.id, ask: 'Write it in French', show: p.en, showLang: 'en', lang: 'fr', answers: [p.fr],
          hint: HINT.phrase, why: 'The adjective agrees with ' + theNoun(n, pl) + ' (' + (n.g === 'f' ? 'feminine' : 'masculine') + (pl ? ' plural' : ' singular') + '): ' + p.form + '.' + (a.note ? ' ' + a.note : '') };
      }
      const a = pick(pool((x) => x.on));
      const n = pick(NOUNS.filter((x) => fits(a, x)));
      const pl = Math.random() < 0.4, p = phrase(a, n, pl);
      const bits = [whyPlace(a)];
      if (p.form === a.alt) bits.push(a.alt + ' before a vowel or silent h.');
      if (pl && a.before) bits.push('Plural adjective before the noun: de, not des.');
      return { topic: 'sent', word: a.id, ask: 'Write it in French', show: 'I have ' + p.en + '.', showLang: 'en', lang: 'fr', answers: ["J'ai " + p.fr + '.'], why: bits.join(' '), hint: HINT.phrase };
    },
    // Every form at once: masc., fem., masc. pl., fem. pl. (and bel / nouvel / vieil).
    all() {
      const a = pick(pool());
      const cells = a.f.map((f, i) => ({ label: SLOT[i], answers: [f] }));
      if (a.alt) cells.push({ label: 'before a vowel', answers: [a.alt] });
      return { topic: 'all', word: a.id, ask: 'Give every form', show: a.en[0], showLang: 'en', lang: 'fr', cells,
        answers: [a.f.join(', ') + (a.alt ? ' (' + a.alt + ')' : '')], why: whyForm(a) + (a.alt ? ' Before a vowel or silent h: ' + a.alt + '.' : ''), hint: startsWith(a.f[0]) };
    },
    place() {
      const a = pick(pool((x) => x.on));
      const n = pick(NOUNS.filter((x) => fits(a, x)));
      const p = phrase(a, n, false);
      return {
        topic: 'place', word: a.id, ask: 'Where does it go?', show: (n.g === 'f' ? 'une ' : 'un ') + n.sg + ' + ' + a.f[0], showLang: 'fr', sub: p.en,
        choices: ['before the noun', 'after the noun'], answers: [a.before ? 'before the noun' : 'after the noun'], why: whyPlace(a), full: p.fr, en: p.en,
        hint: 'Only 11 go before: ' + BEFORE.join(', ') + '.',
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
      return { topic: 'phrase', word: a.id, ask: 'Write it in French', show: p.en, showLang: 'en', lang: 'fr', answers: [p.fr], why: bits.join(' '), hint: HINT.phrase };
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
      return { topic: 'bel', word: a.id, ask: 'Fill in ' + a.id, show: blank, showLang: 'fr', lang: 'fr', answers: [p.form], why, full: p.fr, en: p.en, hint: 'Is the noun masculine singular, and does it start with a vowel or silent h?' };
    },
    de() {
      const a = pick(pool((x) => x.on));
      const n = pick(NOUNS.filter((x) => fits(a, x)));
      const p = phrase(a, n, true);
      const rest = p.fr.slice(p.art.length + 1);
      return {
        topic: 'de', word: a.id, ask: 'de or des?', show: '___ ' + rest, showLang: 'fr', choices: ['de', 'des'], answers: [p.art], full: cap(p.fr), en: cap(p.en), hint: 'Does the adjective come before the noun?',
        why: a.before ? 'The plural adjective comes before the noun, so de, not des.' : 'The adjective comes after the noun, so des stays.',
      };
    },
    hair() {
      const subj = pick([['Il', 'm', false], ['Elle', 'f', false], ['Ils', 'm', true], ['Elles', 'f', true]]);
      if (Math.random() < 0.5) {
        const a = pick(pool((x) => ['brun', 'châtain', 'blond', 'roux'].includes(x.id)));
        const i = slotOf(subj[1], subj[2]);
        return { topic: 'hair', word: a.id, ask: 'Fill in ' + a.id, show: subj[0] + (subj[2] ? ' sont' : ' est') + ' ___.', showLang: 'fr', lang: 'fr', answers: [a.f[i]], why: 'It describes ' + subj[0].toLowerCase() + ', so ' + SLOT[i] + ': ' + a.f[i] + '.',
          full: subj[0] + (subj[2] ? ' sont ' : ' est ') + a.f[i] + '.', en: EN_SUBJ[subj[0]][0] + ' ' + a.en[0] + '.', hint: HINT.hair };
      }
      const a = pick(pool((x) => ['brun', 'châtain', 'blond', 'roux', 'raide', 'court', 'long', 'noir'].includes(x.id)));
      const verb = { Il: 'a', Elle: 'a', Ils: 'ont', Elles: 'ont' }[subj[0]];
      return { topic: 'hair', word: a.id, ask: 'Fill in ' + a.id, show: subj[0] + ' ' + verb + ' les cheveux ___.', showLang: 'fr', lang: 'fr', answers: [a.f[2]], why: 'Les cheveux is always masculine plural, whoever has the hair: ' + a.f[2] + '.',
        full: subj[0] + ' ' + verb + ' les cheveux ' + a.f[2] + '.', en: EN_SUBJ[subj[0]][1] + ' ' + a.en[0].replace('-haired', '') + ' hair.', hint: HINT.hair };
    },
  };
  // Practice sheet: the class worksheet's parts (fix the mistake, two adjectives, opposites, feminine plural, translation).
  // [topic, numeral, French heading, English instruction, how many]. Not in TOPICS, so the Grammar page stays as it is.
  const SHEET = [
    ['fix', 'I', 'Corrigez la faute si c’est nécessaire', 'Write the sentence correctly. If it’s already right, copy it or type “correct”.', 6],
    ['two', 'II', 'Place des adjectifs', 'Rewrite it with both adjectives, each in the right place and form.', 6],
    ['opp', 'III', 'Les contraires', 'Write the opposite adjective, agreeing with who it describes.', 6],
    ['fempl', 'IV', 'Mettez ces mots au féminin pluriel', 'Give the feminine plural (if it can change).', 10],
    ['trad', 'V', 'Traduction', 'Translate into French.', 5],
  ];
  const sayIt = (art, form, noun, pl, before) => (pl ? 'Ce sont ' : "C'est ") + art + ' ' + (before ? form + ' ' + noun : noun + ' ' + form) + '.';
  const kind = (n, pl) => n.sg + ' is ' + (n.g === 'f' ? 'feminine' : 'masculine') + (pl ? ' plural' : ' singular');
  // Two adjectives on one noun: the BAGS one (at most one) goes before, the rest after, joined by et.
  function twoAdj() {
    const n = pick(NOUNS), pl = Math.random() < 0.4, slot = slotOf(n.g, pl), noun = pl ? n.pl : n.sg;
    const fit = pool((x) => x.id !== 'raide' && fitsPred(x, n));
    let a, b;
    do { a = pick(fit); b = pick(fit); } while (a === b || (a.before && b.before) || (a.hair && b.hair) || (a.group === 'nat' && b.group === 'nat'));
    const bef = [a, b].find((x) => x.before), aft = [a, b].filter((x) => !x.before);
    const art = pl ? (bef ? 'de' : 'des') : n.g === 'f' ? 'une' : 'un';
    const fr = (pl ? 'Ce sont ' : "C'est ") + art + ' ' + (bef ? formFor(bef, n, pl) + ' ' : '') + noun + ' ' + aft.map((x) => x.f[slot]).join(' et ') + '.';
    const bits = [kind(n, pl) + '.', bef ? bef.id + ' goes before the noun; ' + aft[0].id + ' goes after.' : 'Neither is one of the 11, so both go after, joined by et.'];
    if (bef && bef.alt && formFor(bef, n, pl) === bef.alt) bits.push(bef.alt + ' before a vowel or silent h.');
    if (pl && bef) bits.push('Plural adjective before the noun: de, not des.');
    const en = (pl ? 'They are ' : "It's " + (/^[aeiou]/i.test(a.en[0]) ? 'an ' : 'a ')) + a.en[0] + ', ' + b.en[0] + ' ' + (pl ? n.enp : n.en) + '.';
    return { a, b, n, pl, noun, fr, en, why: bits.join(' ') };
  }
  const NAMES = { m: ['Paul', 'Thomas', 'Léo', 'Martin', 'Albert', 'John'], f: ['Marie', 'Sophie', 'Chloé', 'Nicole', 'Anne', 'Élodie'] };
  // A person or a pair: slot 0-3 as in SLOT. A boy and a girl together count as masculine plural.
  function who(avoid) {
    const slot = Math.floor(Math.random() * 4), m = NAMES.m.filter((x) => !avoid.includes(x)), f = NAMES.f.filter((x) => !avoid.includes(x));
    const m1 = pick(m), m2 = pick(m.filter((x) => x !== m1)), f1 = pick(f), f2 = pick(f.filter((x) => x !== f1));
    const mixed = slot === 2 && Math.random() < 0.5;
    const name = [m1, f1, mixed ? m1 + ' et ' + f1 : m1 + ' et ' + m2, f1 + ' et ' + f2][slot];
    return { slot, name, mixed, verb: slot > 1 ? ' sont ' : ' est ' };
  }
  const CALME = { id: 'calme', f: ['calme', 'calme', 'calmes', 'calmes'] }; // only ever the given word, opposite of nerveux
  const OPP = [['beau', 'laid'], ['jeune', 'vieux'], ['petit', 'grand'], ['heureux', 'malheureux'], ['calme', 'nerveux'],
    ['agréable', 'désagréable'], ['poli', 'impoli'], ['patient', 'impatient'], ['optimiste', 'pessimiste']];
  Object.assign(Q, {
    fix() {
      const a = pick(pool((x) => x.on)), n = pick(NOUNS.filter((x) => fits(a, x))), pl = Math.random() < 0.45;
      const p = phrase(a, n, pl), noun = pl ? n.pl : n.sg, right = sayIt(p.art, p.form, noun, pl, a.before);
      const base = { topic: 'fix', word: a.id, ask: 'Correct the mistake, if there is one', showLang: 'fr', lang: 'fr', hint: HINT.phrase, full: right, en: (pl ? 'They are ' : "It's ") + p.en + '.' };
      if (Math.random() < 0.1) return { ...base, show: right, answers: [right, 'correct'], why: 'No mistake. ' + whyPlace(a) };
      const errs = [[sayIt(p.art, p.form, noun, pl, !a.before), whyPlace(a)]];
      const wrong = [...new Set(a.f.concat(a.alt || []))].filter((f) => f !== p.form);
      if (wrong.length) errs.push([sayIt(p.art, pick(wrong), noun, pl, a.before), 'Agreement: ' + kind(n, pl) + ', so ' + p.form + '.']);
      if (pl && a.before) errs.push([sayIt('des', p.form, noun, pl, true), 'Plural adjective before the noun: de, not des.']);
      if (p.form === a.alt) errs.push([sayIt(p.art, a.f[0], noun, pl, true), n.sg + ' starts with a vowel or silent h, so ' + a.alt + ', not ' + a.f[0] + '.']);
      const [show, why] = pick(errs);
      return { ...base, show, answers: [right], why };
    },
    two() {
      const t = twoAdj();
      const show = (t.pl ? 'Ce sont des ' : "C'est " + (t.n.g === 'f' ? 'une ' : 'un ')) + t.noun + ' (' + t.a.en[0] + ', ' + t.b.en[0] + ')';
      return { topic: 'two', word: t.a.id, ask: 'Add both adjectives', show, showLang: 'fr', lang: 'fr', answers: [t.fr], why: t.why, full: t.fr, en: t.en, hint: 'Which one is BAGS (goes before)? The other goes after.' };
    },
    opp() {
      if (Math.random() < 0.2) {
        const [x, y] = pick([['court', 'long'], ['long', 'court']]).map((id) => byId[id]);
        return { topic: 'opp', word: y.id, ask: 'The opposite', show: 'Mes cheveux ne sont pas ' + x.f[2] + ', ils sont …', showLang: 'fr', lang: 'fr', answers: [y.f[2]],
          why: 'The opposite of ' + x.id + ' is ' + y.id + '. Les cheveux is masculine plural: ' + y.f[2] + '.', hint: 'Les cheveux: masculine plural.' };
      }
      let [x, y] = pick(Math.random() < 0.8 ? OPP.slice(0, 5) : OPP.slice(5)); // the first 5 are the sheet's words
      if (x !== 'calme' && Math.random() < 0.5) [x, y] = [y, x];
      const X = byId[x] || CALME, Y = byId[y], s1 = who([]), s2 = who(s1.name.split(' et '));
      return { topic: 'opp', word: Y.id, ask: 'The opposite', show: s1.name + s1.verb + X.f[s1.slot] + ', mais ' + s2.name + s2.verb + '…', showLang: 'fr', lang: 'fr', answers: [Y.f[s2.slot]],
        why: 'The opposite of ' + X.id + ' is ' + Y.id + '. ' + s2.name + (s2.mixed ? ' (a mixed group counts as masculine)' : '') + ': ' + SLOT[s2.slot] + ', so ' + Y.f[s2.slot] + '.', hint: 'Opposite first, then make it agree with ' + s2.name + '.' };
    },
    fempl() {
      const a = pick(pool());
      return { topic: 'fempl', word: a.id, ask: 'Feminine plural', show: a.f[0], showLang: 'fr', lang: 'fr', answers: [a.f[3]], why: whyForm(a), hint: startsWith(a.f[3]) };
    },
    trad() {
      const r = Math.random();
      if (r < 0.4) return { ...Q.sent(), topic: 'trad' };
      if (r < 0.7) { const t = twoAdj(); return { topic: 'trad', word: t.a.id, ask: 'In French', show: t.en, showLang: 'en', lang: 'fr', answers: [t.fr], why: t.why, hint: 'C’est / Ce sont… Which adjective goes before?' }; }
      const subj = pick(Object.keys(EN_SUBJ)), verb = { Il: 'a', Elle: 'a', Ils: 'ont', Elles: 'ont' }[subj];
      const len = byId[pick(['court', 'long'])], col = byId[pick(['brun', 'châtain', 'blond', 'roux'])];
      return { topic: 'trad', word: col.id, ask: 'In French', show: EN_SUBJ[subj][1] + ' ' + len.en[0] + ', ' + col.en[0].replace('-haired', '') + ' hair.', showLang: 'en', lang: 'fr',
        answers: [subj + ' ' + verb + ' les cheveux ' + len.f[2] + ' et ' + col.f[2] + '.'], why: 'Les cheveux is always masculine plural: ' + len.f[2] + ', ' + col.f[2] + '. Both go after, joined by et.', hint: HINT.hair };
    },
  });
  function question(topics, words) { focus = words || []; return Q[pick(topics)](); }

  // Answer checking: case, spacing and apostrophes don't matter. In French, accents do: "fiere" for "fière" is wrong,
  // flagged with accent: true so the card can say so. English answers ignore accents ("naive" = "naïve").
  const norm = (s) => s.toLowerCase().replace(/[’‘`]/g, "'").replace(/[.!?]+$/, '').replace(/\s+/g, ' ').trim();
  const bare = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '');
  const enNorm = (s) => norm(s).replace(/^(a|an|the|to be|to) /, '').replace(/-/g, ' ');
  function check(q, input) {
    const n = q.lang === 'en' ? enNorm : norm;
    const got = n(input || '');
    if (!got) return { ok: false, accent: false };
    const wants = q.answers.map(n);
    if (wants.includes(got)) return { ok: true, accent: false };
    if (wants.some((w) => bare(w) === bare(got))) return q.lang === 'en' ? { ok: true, accent: false } : { ok: false, accent: true };
    return { ok: false, accent: false };
  }

  // FSRS-4.5, copied from Jenney's Latin Hub (src/fsrs.js). Grades: 1 again, 2 hard, 3 good, 4 easy.
  const W = [0.4872, 1.4003, 3.7145, 13.8206, 5.1618, 1.2298, 0.8975, 0.031, 1.6474, 0.1367, 1.0461, 2.1072, 0.0793, 0.3246, 1.587, 0.2272, 2.8755];
  const DECAY = -0.5, FACTOR = 19 / 81, DAY = 86400000, MIN = 60000;
  const clamp = (x, lo, hi) => Math.max(lo, Math.min(hi, x));
  const initS = (g) => W[g - 1];
  const initD = (g) => clamp(W[4] - Math.exp(W[5] * (g - 1)) + 1, 1, 10);
  const nextD = (D, g) => clamp(W[7] * initD(4) + (1 - W[7]) * (D - W[6] * (g - 3)), 1, 10);
  const sRecall = (D, S, R, g) => S * (1 + Math.exp(W[8]) * (11 - D) * Math.pow(S, -W[9]) * (Math.exp(W[10] * (1 - R)) - 1) * (g === 2 ? W[15] : 1) * (g === 4 ? W[16] : 1));
  const sForget = (D, S, R) => Math.min(S, W[11] * Math.pow(D, -W[12]) * (Math.pow(S + 1, W[13]) - 1) * Math.exp(W[14] * (1 - R)));
  function retrievability(c, now) {
    if (!c || !c.S || !c.last) return 0;
    return Math.pow(1 + (FACTOR * Math.max(0, (now - c.last) / DAY)) / c.S, DECAY);
  }
  const intervalDays = (S, r) => (S / FACTOR) * (Math.pow(r, 1 / DECAY) - 1);
  function review(prev, g, now, r = 0.9) {
    const c = prev ? { ...prev } : { reps: 0, lapses: 0, state: 'new' };
    c.reps++;
    let due;
    if (c.state === 'new' || !c.S) {
      c.S = initS(g); c.D = initD(g); c.state = 'learning';
      due = now + (g === 1 ? MIN : 10 * MIN);
    } else if (c.state === 'learning' || c.state === 'relearning') {
      c.D = nextD(c.D, g);
      if (g === 1) due = now + MIN;
      else { c.state = 'review'; due = now + Math.max(0.5, intervalDays(c.S, r)) * DAY; }
    } else {
      const R = retrievability(c, now);
      c.D = nextD(c.D, g);
      if (g === 1) { c.lapses++; c.S = Math.max(0.1, sForget(c.D, c.S, R)); c.state = 'relearning'; due = now + 5 * MIN; }
      else { c.S = Math.min(365, sRecall(c.D, c.S, R, g)); due = now + Math.max(1, intervalDays(c.S, r)) * DAY * (0.95 + Math.random() * 0.1); }
    }
    c.last = now; c.due = Math.round(due); c.g = g;
    return c;
  }

  const api = { SHEET, ADJ, LESSONS, GROUPS, SLOT, BEFORE, NOUNS, TOPICS, VOCAB, GRAMMAR, RULE_OF, Q, review, retrievability, DAY, MIN, question, check, phrase, formFor, byId };
  if (typeof module !== 'undefined') module.exports = api;
  else window.FR = api;
})();
