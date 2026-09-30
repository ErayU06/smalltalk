import type { ScenarioVariant } from '../../../types/scenario';

const en: ScenarioVariant = {
  locale: 'en-US',
  title: 'Eczanede baş ağrısı için bir şey iste',
  description: 'Şikâyetini kısaca anlatıp eczacının sorularını cevaplama provası.',
  placeLabel: 'Eczane',
  mood: 'Sakin eczacı',
  pattern: { text: 'Do you have anything for a headache?', note: 'Şikâyet için ürün sorma · A2' },
  steps: [
    {
      id: 's1',
      kind: 'choice',
      npcLine: 'Hello, how can I help you today?',
      hint: { tr: 'Baş ağrısı için bir şey olup olmadığını sor.' },
      prompt: 'Derdini söyle:',
      options: [
        { text: 'Hi, do you have anything for a headache?', correct: true, feedback: 'Eczanede en doğal soru kalıbı: "Do you have anything for…?"' },
        { text: 'My head is paining.', correct: false, near: true, feedback: 'Anlaşılır ama İngilizcede "I have a headache" denir.' },
        { text: 'I have a head.', correct: false, feedback: 'Bu "bir başım var" demek; baş ağrısı "a headache".' },
      ],
    },
    {
      id: 's2',
      kind: 'text',
      npcLine: 'Sure. How long have you had it?',
      hint: { tr: 'Dünden beri olduğunu söyle.', example: 'Since…' },
      acceptedAnswers: ['Since yesterday.', "Since yesterday morning.", "I've had it since yesterday.", 'Since last night.'],
      keywords: [['since', 'yesterday', 'last night', 'morning', 'day']],
      wordBank: ['Since', 'yesterday', 'morning', "I've had it"],
      why: 'Başlangıç zamanı için "since" kullanılır: since yesterday.',
      mistakes: [{ match: '^from yesterday', tip: 'Başladığı an için "from" değil "since" kullanılır: since yesterday.' }],
    },
    {
      id: 's3',
      kind: 'speech',
      npcLine: 'Are you taking any other medication at the moment?',
      hint: { tr: 'Başka ilaç kullanmadığını söyle.', example: "No, I'm not…" },
      acceptedAnswers: ["No, I'm not taking anything else.", "No, nothing else.", "No, I'm not.", 'No, not at the moment.'],
      keywords: [['no', 'not', 'nothing']],
      wordBank: ["No, I'm not", 'nothing else', 'at the moment'],
      why: '"Are you taking…?" sorusuna kısa cevap: "No, I\'m not."',
    },
    {
      id: 's4',
      kind: 'choice',
      npcLine: 'Take this with water after meals. If it lasts more than three days, see a doctor.',
      hint: { tr: 'Anladığını gösteren şıkkı seç.' },
      prompt: 'Anladığını göster:',
      options: [
        { text: 'Got it, with water after meals. Thank you!', correct: true, feedback: 'Talimatı tekrar ederek anladığını gösteriyorsun; çok iyi bir alışkanlık.' },
        { text: 'OK, I understood you.', correct: false, near: true, feedback: 'Anlaşılır ama biraz resmî; "Got it" daha doğal.' },
        { text: 'I will see a doctor after meals.', correct: false, feedback: 'Doktor yalnızca ağrı üç günden uzun sürerse gerekiyor.' },
      ],
    },
    {
      id: 's5',
      kind: 'speech',
      npcLine: 'You’re welcome. I hope you feel better soon!',
      hint: { tr: 'Teşekkür et ve iyi günler dile.', example: 'Thanks, have a…' },
      acceptedAnswers: ['Thanks, have a good day!', 'Thank you, you too!', 'Thanks so much, bye!', 'Thank you, I hope so too!'],
      keywords: [['thanks', 'thank you']],
      wordBank: ['Thanks', 'have a good day', 'I hope so'],
      why: 'Kısa bir teşekkür ve iyi dilek yeterli.',
    },
  ],
  vocab: [
    { text: 'Do you have anything for…?', tr: '… için bir şeyiniz var mı?' },
    { text: 'a headache', tr: 'baş ağrısı' },
    { text: 'since yesterday', tr: 'dünden beri' },
    { text: 'after meals', tr: 'yemeklerden sonra' },
    { text: 'Got it', tr: 'Anladım' },
  ],
  curveballs: ['Do you have any allergies?'],
};

export default en;
