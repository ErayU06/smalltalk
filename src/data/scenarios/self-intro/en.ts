import type { ScenarioVariant } from '../../../types/scenario';

const en: ScenarioVariant = {
  locale: 'en-US',
  title: 'İlk gün: kendini tanıt',
  description: 'Yeni tanıştığın biriyle adını, nereli olduğunu ve ne yaptığını paylaşma provası.',
  placeLabel: 'Kurs ilk günü',
  mood: 'Yan sıradaki öğrenci',
  pattern: { text: "Nice to meet you, I'm…", note: 'Tanışma kalıbı · A1' },
  steps: [
    {
      id: 's1',
      kind: 'choice',
      npcLine: "Hey, I'm Leo. I don't think we've met yet!",
      hint: { tr: 'Tanıştığına memnun olduğunu söyle ve adını ver.' },
      prompt: 'Kendini tanıt:',
      options: [
        { text: "Hi Leo, nice to meet you! I'm Deniz.", correct: true, feedback: 'Samimi ve doğal: selam, "nice to meet you" ve adın.' },
        { text: 'Hello. My name is Deniz. I am student.', correct: false, near: true, feedback: 'Anlaşılır ama biraz ders kitabı gibi; "I\'m a student" demek gerekir.' },
        { text: "Yes, we've met yesterday.", correct: false, feedback: 'Leo daha önce tanışmadığınızı söylüyor; burada kendini tanıtman bekleniyor.' },
      ],
    },
    {
      id: 's2',
      kind: 'text',
      npcLine: 'So where are you from?',
      hint: { tr: 'Nereli olduğunu söyle.', example: "I'm from…" },
      acceptedAnswers: ["I'm from Turkey.", "I'm from Istanbul.", 'I come from Turkey.', "I'm from Izmir, in Turkey."],
      keywords: [["i'm from", 'i am from', 'come from', 'from']],
      wordBank: ["I'm from", 'Turkey', 'Istanbul', 'originally'],
      why: 'Nereli olduğunu söylerken "I\'m from…" en doğal kalıp.',
      mistakes: [{ match: '^i am (turkey|istanbul|izmir|ankara)', tip: '"I am Turkey" yerine "I\'m from Turkey" ya da "I\'m Turkish" denir.' }],
    },
    {
      id: 's3',
      kind: 'speech',
      npcLine: 'Oh nice! What do you do?',
      hint: { tr: 'Ne iş yaptığını ya da okuduğunu söyle.', example: "I'm a student…" },
      acceptedAnswers: ["I'm a student.", "I'm studying engineering.", 'I work in marketing.', "I'm a software developer."],
      keywords: [['student', 'study', 'studying', 'work', 'developer', 'engineer', 'teacher', 'designer']],
      wordBank: ["I'm a…", 'I work in…', "I'm studying…"],
      why: 'Meslek söylerken "a" unutulmaz: "I\'m a student."',
      mistakes: [{ match: '^i am (student|engineer|teacher|developer|designer)', tip: 'Meslekten önce "a/an" gelir: "I\'m a student."' }],
    },
    {
      id: 's4',
      kind: 'choice',
      npcLine: "Cool. And how long have you been in the city?",
      hint: { tr: 'Ne zamandır burada olduğunu söyleyen doğru şıkkı seç.' },
      prompt: 'Ne zamandır buradasın?',
      options: [
        { text: 'Just two weeks, actually.', correct: true, feedback: 'Kısa ve doğal; "actually" sohbeti yumuşatır.' },
        { text: 'I am here since two weeks.', correct: false, near: true, feedback: 'Türkçedeki "iki haftadır" yapısı; İngilizcede "for two weeks" ya da "I\'ve been here for two weeks".' },
        { text: 'I like the city very much.', correct: false, feedback: 'Güzel bir cümle ama soru ne zamandır burada olduğunu soruyor.' },
      ],
    },
    {
      id: 's5',
      kind: 'speech',
      npcLine: "Well, it's great to have you here. See you around!",
      hint: { tr: 'Sen de memnun olduğunu söyle, vedalaş.', example: 'Thanks, see you…' },
      acceptedAnswers: ['Thanks, see you around!', 'Thanks Leo, see you later!', 'Nice meeting you, see you!', 'Great talking to you, see you soon!'],
      keywords: [['see you', 'bye', 'take care'], ['thanks', 'nice meeting', 'great talking', 'leo']],
      wordBank: ['Thanks', 'see you', 'nice meeting you'],
      why: 'Vedalaşırken "Nice meeting you" ve "see you" birlikte çok doğal.',
    },
  ],
  vocab: [
    { text: 'Nice to meet you', tr: 'Tanıştığıma memnun oldum' },
    { text: "I'm from…", tr: "…lıyım / …'dan geliyorum" },
    { text: 'What do you do?', tr: 'Ne iş yapıyorsun?' },
    { text: 'for two weeks', tr: 'iki haftadır' },
    { text: 'See you around!', tr: 'Görüşürüz!' },
  ],
  curveballs: ['Am I saying your name right?'],
};

export default en;
