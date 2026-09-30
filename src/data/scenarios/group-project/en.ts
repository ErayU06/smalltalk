import type { ScenarioVariant } from '../../../types/scenario';

const en: ScenarioVariant = {
  locale: 'en-US',
  title: 'Grup ödevini planla',
  description: 'Yeni bir arkadaşınla işi bölüşme, fikir önerme ve buluşma ayarlama provası.',
  placeLabel: 'Kütüphane',
  mood: 'Kurstan tanıdığın Leo',
  pattern: { text: 'How about we split it up?', note: 'Öneri kalıbı · B1' },
  steps: [
    {
      id: 's1',
      kind: 'choice',
      npcLine: "So, we've got ten days for this presentation. Where do we start?",
      hint: { tr: 'İşi bölüşmeyi öneren şıkkı seç.' },
      prompt: 'Bir öneri yap:',
      options: [
        { text: 'How about we split it up? You do research, I do the slides.', correct: true, feedback: '"How about we…?" doğal ve iş birliğine açık bir öneri.' },
        { text: 'You must do the research.', correct: false, near: true, feedback: '"Must" emir gibi duyulur; "How about you…?" ya da "Could you…?" dene.' },
        { text: 'Ten days is a long holiday.', correct: false, feedback: 'Leo tatilden değil, sunumdan bahsediyor.' },
      ],
    },
    {
      id: 's2',
      kind: 'text',
      npcLine: 'Sounds good. When should we meet to put it together?',
      hint: { tr: 'Gelecek salı öğleden sonra buluşmayı öner.', example: 'How about next Tuesday…' },
      acceptedAnswers: ['How about next Tuesday afternoon?', 'Could we meet next Tuesday afternoon?', "Let's meet on Tuesday afternoon.", 'What about Tuesday after class?'],
      keywords: [['tuesday'], ['how about', 'what about', "let's", 'could we', 'meet']],
      wordBank: ['How about', 'next Tuesday', 'afternoon', "Let's meet"],
      why: '"Next Tuesday" önünde "on" kullanılmaz: "next Tuesday".',
      mistakes: [{ match: 'on next tuesday', tip: '"next" ile gün söylerken "on" gerekmez: "next Tuesday".' }],
    },
    {
      id: 's3',
      kind: 'choice',
      npcLine: "Hmm, I can't make it on Tuesday. I have work.",
      hint: { tr: 'Anlayış göster ve başka bir gün öner.' },
      prompt: 'Alternatif öner:',
      options: [
        { text: 'No worries! Does Wednesday work for you?', correct: true, feedback: 'Anlayışlı ve çözüm odaklı.' },
        { text: 'But Tuesday is better for me.', correct: false, near: true, feedback: 'Açık sözlü ama esnek değil; başka bir gün önermek daha iyi.' },
        { text: 'Where do you work?', correct: false, feedback: 'İlginç bir soru ama önce buluşma gününü çözmeniz gerekiyor.' },
      ],
    },
    {
      id: 's4',
      kind: 'speech',
      npcLine: "Wednesday's great. Should we share a document online?",
      hint: { tr: 'Evet de ve bu akşam linki göndereceğini söyle.', example: "Yes, I'll send you the link…" },
      acceptedAnswers: ["Yes, I'll send you the link tonight.", "Sure, I'll share it with you this evening.", "Good idea, I'll send the link later today."],
      keywords: [['send', 'share'], ['link', 'it', 'document']],
      wordBank: ["I'll send you", 'the link', 'tonight'],
      why: 'Söz verirken "I\'ll…" kullanılır: "I\'ll send you the link."',
    },
    {
      id: 's5',
      kind: 'speech',
      npcLine: "Perfect. It's nice working with you, by the way!",
      hint: { tr: 'Sen de memnun olduğunu söyle ve görüşürüz de.', example: 'You too! See you…' },
      acceptedAnswers: ['You too! See you on Wednesday.', 'Same here! See you Wednesday.', 'Thanks, you too! See you then.', 'Likewise, see you soon!'],
      keywords: [['you too', 'same here', 'likewise'], ['see you', 'wednesday', 'soon', 'then']],
      wordBank: ['Same here', 'see you', 'on Wednesday'],
      why: '"Same here" ve "You too" iltifata doğal karşılıklar.',
    },
  ],
  vocab: [
    { text: 'How about we…?', tr: '… yapsak nasıl olur?' },
    { text: 'split it up', tr: 'işi bölüşmek' },
    { text: "I can't make it", tr: 'Gelemiyorum / Yetişemem' },
    { text: 'Does Wednesday work?', tr: 'Çarşamba uygun mu?' },
    { text: 'Same here', tr: 'Ben de' },
  ],
  curveballs: ["Honestly, I'm not great at presenting. Could you do the talking?"],
};

export default en;
