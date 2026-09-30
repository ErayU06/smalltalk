import type { ScenarioVariant } from '../../../types/scenario';

const en: ScenarioVariant = {
  locale: 'en-GB',
  title: 'Kiralık ev görmeye git, soru sor',
  description: 'Ev sahibine faturalar, depozito ve taşınma tarihi hakkında soru sorma provası.',
  placeLabel: 'Kiralık daire',
  mood: 'Titiz ev sahibi',
  pattern: { text: 'Are the bills included?', note: 'Kira detayı sorma · B2' },
  steps: [
    {
      id: 's1',
      kind: 'choice',
      npcLine: "Hello! You must be here for the viewing. Come on in.",
      hint: { tr: 'Selamla ve daireyi gösterdiği için teşekkür et.' },
      prompt: 'Selamlaş:',
      options: [
        { text: 'Hi, yes! Thanks for showing me around.', correct: true, feedback: '"Show me around" = bana gezdirmek; kibar ve doğal.' },
        { text: 'Yes. Show me the house.', correct: false, near: true, feedback: 'Anlaşılır ama emir gibi; "Thanks for showing me around" daha sıcak.' },
        { text: 'I am here for the movie.', correct: false, feedback: '"Viewing" burada ev gezme demek, film izleme değil.' },
      ],
    },
    {
      id: 's2',
      kind: 'text',
      npcLine: "So this is the living room. It gets lots of light in the afternoon.",
      hint: { tr: 'Faturaların kiraya dahil olup olmadığını sor.', example: 'Are the bills…' },
      acceptedAnswers: ['It’s lovely. Are the bills included in the rent?', 'Are the bills included?', 'Is that including bills?'],
      keywords: [['bills', 'utilities'], ['included', 'including', 'include']],
      wordBank: ['Are the bills', 'included', 'in the rent'],
      why: 'Kiralarda "bills included" faturaların dahil olduğunu anlatır.',
    },
    {
      id: 's3',
      kind: 'speech',
      npcLine: "Water is included, but electricity isn't. The deposit is one month's rent.",
      hint: { tr: 'Ne zaman taşınabileceğini sor.', example: 'When could I move in?' },
      acceptedAnswers: ['When could I move in?', 'When would it be available?', 'When is the earliest I could move in?'],
      keywords: [['move in', 'available', 'earliest'], ['when']],
      wordBank: ['When could I', 'move in', 'available'],
      why: 'Taşınmak için "move in", çıkmak için "move out" kullanılır.',
    },
    {
      id: 's4',
      kind: 'choice',
      npcLine: "From the first of next month. But I'd need a decision by this week.",
      hint: { tr: 'Acele etmeden düşünmek için bir gün iste.' },
      prompt: 'Zaman iste:',
      options: [
        { text: 'Could I let you know by Thursday?', correct: true, feedback: 'Somut bir gün vermek güven verir ve kibar.' },
        { text: 'I cannot decide now, wait.', correct: false, near: true, feedback: 'Anlaşılır ama emir gibi; "Could I let you know by…?" daha kibar.' },
        { text: 'This week is next month.', correct: false, feedback: 'Ev sahibi bu hafta içinde karar vermeni istiyor.' },
      ],
    },
    {
      id: 's5',
      kind: 'speech',
      npcLine: 'Thursday is fine. Lovely to meet you, and safe trip home!',
      hint: { tr: 'Teşekkür et, evi beğendiğini söyle ve vedalaş.', example: "Thanks, it's a lovely flat…" },
      acceptedAnswers: ["Thanks so much, it's a lovely flat. Speak soon!", 'Thank you, I really like it. Talk to you on Thursday!', 'Thanks for your time, see you soon!'],
      keywords: [['thank', 'thanks'], ['flat', 'like it', 'lovely', 'speak soon', 'talk to you', 'see you', 'time']],
      wordBank: ['Thanks so much', "it's a lovely flat", 'speak soon'],
      why: '"Speak soon" İngiltere\'de tekrar konuşacağınız zaman yaygın bir veda.',
    },
  ],
  vocab: [
    { text: 'show someone around', tr: 'birine bir yeri gezdirmek' },
    { text: 'bills included', tr: 'faturalar dahil' },
    { text: 'deposit', tr: 'depozito' },
    { text: 'move in', tr: 'taşınmak (içeri)' },
    { text: 'Could I let you know by…?', tr: '…a kadar haber verebilir miyim?' },
  ],
  curveballs: ['Do you have any pets?'],
};

export default en;
