import type { ScenarioVariant } from '../../../types/scenario';

const en: ScenarioVariant = {
  locale: 'en-US',
  title: 'Asansörde yeni komşunla tanış',
  description: 'Kısa bir asansör yolculuğunda selamlaşıp havadan sudan konuşma provası.',
  placeLabel: 'Apartman',
  mood: 'Güler yüzlü yaşlı komşu',
  pattern: { text: "Lovely day, isn't it?", note: 'Onay bekleyen soru eki · A2' },
  steps: [
    {
      id: 's1',
      kind: 'choice',
      npcLine: "Oh, hello! You must be the new neighbor.",
      hint: { tr: 'Yeni taşındığını söyleyen samimi şıkkı seç.' },
      prompt: 'Kendini tanıt:',
      options: [
        { text: "Yes, hi! I just moved in last week.", correct: true, feedback: 'Samimi ve açık: yeni taşındığını söylüyorsun.' },
        { text: 'Yes. I am new person here.', correct: false, near: true, feedback: 'Anlaşılır ama doğal değil; "I just moved in" daha doğal.' },
        { text: 'No, I am going to the fifth floor.', correct: false, feedback: 'Komşu yeni olup olmadığını soruyor; kat sorusu henüz gelmedi.' },
      ],
    },
    {
      id: 's2',
      kind: 'text',
      npcLine: "Welcome! Which floor are you on?",
      hint: { tr: 'Hangi katta oturduğunu söyle.', example: "I'm on the…" },
      acceptedAnswers: ["I'm on the fourth floor.", 'The fourth floor.', "We're on the fourth floor.", "I'm on the third floor."],
      keywords: [['floor'], ['first', 'second', 'third', 'fourth', 'fifth', 'sixth', '1st', '2nd', '3rd', '4th', '5th', '6th']],
      wordBank: ["I'm on the", 'fourth', 'floor'],
      why: 'Kat söylerken sıra sayısı kullanılır: "the fourth floor".',
      mistakes: [{ match: '(in|at) the (first|second|third|fourth|fifth|sixth) floor', tip: 'Katlar için "on" kullanılır: "on the fourth floor".' }],
    },
    {
      id: 's3',
      kind: 'speech',
      npcLine: "Lovely. Beautiful weather today, isn't it?",
      hint: { tr: 'Havanın güzel olduğuna katıl.', example: 'Yes, it really is…' },
      acceptedAnswers: ['Yes, it really is!', 'It is, finally some sun!', 'Yes, it’s lovely today.', 'It really is, so nice.'],
      keywords: [['yes', 'it is', 'really is', 'lovely', 'beautiful', 'nice', 'sun']],
      wordBank: ['Yes, it really is', 'finally', 'lovely'],
      why: '"…isn\'t it?" onay bekler; "Yes, it really is!" en doğal cevap.',
    },
    {
      id: 's4',
      kind: 'choice',
      npcLine: "If you ever need anything, I'm in 2B.",
      hint: { tr: 'Nazikçe teşekkür eden şıkkı seç.' },
      prompt: 'Teşekkür et:',
      options: [
        { text: "That's so kind, thank you!", correct: true, feedback: 'Sıcak ve kibar bir teşekkür.' },
        { text: 'OK.', correct: false, near: true, feedback: 'Yanlış değil ama soğuk duyulabilir; kısa bir teşekkür ekle.' },
        { text: 'I need a hammer now.', correct: false, feedback: 'Komşu genel bir yardım teklif etti; şimdi bir şey istemek beklenmiyor.' },
      ],
    },
    {
      id: 's5',
      kind: 'speech',
      npcLine: "Here's my floor. Nice to meet you, dear!",
      hint: { tr: 'Sen de memnun olduğunu söyle ve iyi günler dile.', example: 'Nice to meet you too…' },
      acceptedAnswers: ['Nice to meet you too, have a good day!', 'You too, have a nice day!', 'Nice meeting you too, bye!', 'Likewise, see you around!'],
      keywords: [['you too', 'likewise', 'nice meeting', 'nice to meet'], ['day', 'bye', 'see you', 'too']],
      wordBank: ['Nice to meet you too', 'have a good day', 'see you'],
      why: 'Karşılık verirken "too" eklenir: "Nice to meet you too!"',
    },
  ],
  vocab: [
    { text: 'I just moved in', tr: 'Yeni taşındım' },
    { text: 'on the fourth floor', tr: 'dördüncü katta' },
    { text: "Lovely day, isn't it?", tr: 'Güzel bir gün, değil mi?' },
    { text: "That's so kind", tr: 'Çok naziksiniz' },
    { text: 'Likewise', tr: 'Ben de öyle / Aynen' },
  ],
  curveballs: ['Are you renting or did you buy the place?'],
};

export default en;
