import type { ScenarioVariant } from '../../../types/scenario';

const en: ScenarioVariant = {
  locale: 'en-US',
  title: 'Telefonla randevu al',
  description: 'Yüzünü görmediğin biriyle net konuşma ve tarih-saat ayarlama provası.',
  placeLabel: 'Telefon görüşmesi',
  mood: 'Kuaför resepsiyonu, telefonda',
  pattern: { text: "I'd like to book an appointment for…", note: 'Randevu alma kalıbı · A2' },
  steps: [
    {
      id: 's1',
      kind: 'choice',
      npcLine: 'Good morning, hair salon, Jess speaking. How can I help?',
      hint: { tr: 'Randevu almak istediğini söyle.' },
      prompt: 'Aramanın nedenini söyle:',
      options: [
        { text: "Hi, I'd like to book an appointment for a haircut, please.", correct: true, feedback: 'Telefonda en net ve kibar açılış.' },
        { text: 'I want haircut appointment.', correct: false, near: true, feedback: 'Anlaşılır ama eksik ve direkt; "I\'d like to book…" dene.' },
        { text: 'Who is speaking?', correct: false, feedback: 'Jess adını zaten söyledi; arama nedenini söyleme sırası sende.' },
      ],
    },
    {
      id: 's2',
      kind: 'text',
      npcLine: 'Sure. What day works best for you?',
      hint: { tr: 'Perşembe öğleden sonra uygun olup olmadığını sor.', example: 'Do you have anything on Thursday…' },
      acceptedAnswers: ['Do you have anything on Thursday afternoon?', 'Is Thursday afternoon possible?', 'Thursday afternoon would be great, if possible.'],
      keywords: [['thursday'], ['afternoon', 'pm', 'after lunch']],
      wordBank: ['Do you have anything', 'on Thursday', 'afternoon'],
      why: 'Günlerden önce "on" gelir: on Thursday.',
      mistakes: [{ match: '(in|at) thursday', tip: 'Günlerden önce "on" kullanılır: on Thursday.' }],
    },
    {
      id: 's3',
      kind: 'choice',
      npcLine: "Sorry, the line's bad. Could you repeat that?",
      hint: { tr: 'Daha yavaş ve net tekrar eden şıkkı seç.' },
      prompt: 'Hat kötü; tekrar et:',
      options: [
        { text: 'Sure. Thursday. Afternoon. Is that okay?', correct: true, feedback: 'Kötü hatta kısa ve ayrık söylemek en iyisi.' },
        { text: 'I SAID THURSDAY!', correct: false, near: true, feedback: 'Bilgi doğru ama bağırmak gibi; sakin ve yavaş tekrar et.' },
        { text: 'The line is bad, bye.', correct: false, feedback: 'Kapatmana gerek yok; tekrar etmen yeterli.' },
      ],
    },
    {
      id: 's4',
      kind: 'speech',
      npcLine: "Got it. We have three thirty or four fifteen. Which one's better?",
      hint: { tr: 'Saat üç buçuğu seç.', example: 'Three thirty…' },
      acceptedAnswers: ['Three thirty, please.', 'Three thirty works for me.', "I'll take three thirty.", '3:30 is perfect.'],
      keywords: [['three thirty', '3 30', 'half past three', 'four fifteen', '4 15']],
      wordBank: ['Three thirty', 'works for me', 'please'],
      why: '"…works for me" saat seçerken çok doğal bir kalıp.',
    },
    {
      id: 's5',
      kind: 'speech',
      npcLine: "Perfect, you're booked for Thursday at three thirty. See you then!",
      hint: { tr: 'Teşekkür et ve vedalaş.', example: 'Great, thanks. See you…' },
      acceptedAnswers: ['Great, thank you. See you Thursday!', 'Thanks a lot, see you then!', 'Perfect, thanks. Bye!', 'Thank you so much, have a nice day!'],
      keywords: [['thank', 'thanks'], ['see you', 'bye', 'day', 'then']],
      wordBank: ['Thank you', 'see you then', 'bye'],
      why: 'Telefonu kapatırken "See you then!" randevuyu onaylar.',
    },
  ],
  vocab: [
    { text: 'book an appointment', tr: 'randevu almak' },
    { text: 'What day works for you?', tr: 'Hangi gün uygun?' },
    { text: 'on Thursday afternoon', tr: 'perşembe öğleden sonra' },
    { text: 'Could you repeat that?', tr: 'Tekrar eder misiniz?' },
    { text: 'See you then!', tr: 'O zaman görüşürüz!' },
  ],
  curveballs: ["Sorry, the line's really bad. Can I call you back?"],
};

export default en;
