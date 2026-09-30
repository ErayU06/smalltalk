import type { ScenarioVariant } from '../../../types/scenario';

const en: ScenarioVariant = {
  locale: 'en-US',
  title: 'Markette ürün bul, kasada öde',
  description: 'Görevliye ürün sorma ve kasada kısa sohbet provası.',
  placeLabel: 'Mahalle marketi',
  mood: 'Sakin kasiyer',
  pattern: { text: 'Excuse me, where can I find…?', note: 'Ürün sorma kalıbı · A1' },
  steps: [
    {
      id: 's1',
      kind: 'choice',
      npcLine: 'Hi! Can I help you find anything?',
      hint: { tr: 'Ürünün yerini kibarca soran şıkkı seç.' },
      prompt: 'Ürünü sor:',
      options: [
        { text: 'Yes, please. Where can I find the eggs?', correct: true, feedback: 'Kibar ve net: "Where can I find…?"' },
        { text: 'Eggs. Where?', correct: false, near: true, feedback: 'Anlaşılır ama çok kısa ve sert; tam bir soru sor.' },
        { text: 'I can find you.', correct: false, feedback: 'Bu "seni bulabilirim" demek; ürün sormak istiyorsun.' },
      ],
    },
    {
      id: 's2',
      kind: 'text',
      npcLine: "They're in aisle five, next to the milk.",
      hint: { tr: 'Teşekkür et ve bir ürün daha sor: ekmek nerede?', example: 'Thanks! And where is the…' },
      acceptedAnswers: ['Thanks! And where is the bread?', 'Thank you. Where can I find the bread?', 'Great, thanks. Do you have fresh bread?'],
      keywords: [['bread'], ['where', 'do you have', 'find']],
      wordBank: ['Thanks!', 'where is', 'the bread', 'do you have'],
      why: 'İkinci ürünü sorarken "And where is the…?" kısa ve doğal.',
    },
    {
      id: 's3',
      kind: 'speech',
      npcLine: 'Did you find everything okay?',
      hint: { tr: 'Evet de, teşekkür et.', example: 'Yes, I did…' },
      acceptedAnswers: ['Yes, I did, thanks.', 'Yes, everything, thank you.', 'I did, thanks for asking.', 'Yes, thank you.'],
      keywords: [['yes', 'i did', 'everything'], ['thanks', 'thank you']],
      wordBank: ['Yes, I did', 'thanks'],
      why: 'Kasadaki bu soru bir nezaket sorusu; "Yes, I did, thanks" yeterli.',
    },
    {
      id: 's4',
      kind: 'choice',
      npcLine: "That's twelve fifty. Do you need a bag?",
      hint: { tr: 'Poşet istemediğini kibarca söyle.' },
      prompt: 'Poşet istemiyorsun:',
      options: [
        { text: "No, thanks. I've got my own.", correct: true, feedback: 'Kibar ve açık; kendi çantan olduğunu söylüyorsun.' },
        { text: 'No bag.', correct: false, near: true, feedback: 'Anlaşılır ama kısa; "No, thanks" eklemek kibar.' },
        { text: 'Twelve fifty bags, please.', correct: false, feedback: 'Fiyatı poşet sayısı gibi söyledin; soru poşet isteyip istemediğin.' },
      ],
    },
    {
      id: 's5',
      kind: 'speech',
      npcLine: "Here's your receipt. Have a good one!",
      hint: { tr: 'Teşekkür et ve sen de iyi günler dile.', example: 'Thanks, you too…' },
      acceptedAnswers: ['Thanks, you too!', 'Thank you, have a good one!', 'Thanks, have a nice day!', 'Cheers, you too!'],
      keywords: [['thanks', 'thank you', 'cheers'], ['you too', 'good one', 'nice day', 'day']],
      wordBank: ['Thanks', 'you too', 'have a good one'],
      why: '"Have a good one" = iyi günler; "You too!" en doğal karşılık.',
    },
  ],
  vocab: [
    { text: 'Where can I find…?', tr: '…yı nerede bulabilirim?' },
    { text: 'aisle', tr: 'reyon, koridor' },
    { text: 'next to', tr: 'yanında' },
    { text: "I've got my own bag", tr: 'Kendi çantam var' },
    { text: 'receipt', tr: 'fiş' },
  ],
  curveballs: ['Do you have a loyalty card?'],
};

export default en;
