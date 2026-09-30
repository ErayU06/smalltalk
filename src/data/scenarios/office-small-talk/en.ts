import type { ScenarioVariant } from '../../../types/scenario';

const en: ScenarioVariant = {
  locale: 'en-US',
  title: 'Mutfakta "Hafta sonun nasıldı?"',
  description: 'Pazartesi sabahı iş arkadaşınla kısa ve samimi sohbet provası.',
  placeLabel: 'Ofis mutfağı',
  mood: 'Neşeli iş arkadaşı',
  pattern: { text: 'How was your weekend?', note: 'Sohbet açma kalıbı · A2' },
  steps: [
    {
      id: 's1',
      kind: 'choice',
      npcLine: 'Morning! How was your weekend?',
      hint: { tr: 'Güzel geçtiğini söyle ve soruyu geri çevir.' },
      prompt: 'Cevap ver:',
      options: [
        { text: 'Pretty good, thanks! How about yours?', correct: true, feedback: 'Soruyu geri çevirmek sohbeti canlı tutar.' },
        { text: 'Good.', correct: false, near: true, feedback: 'Doğru ama sohbeti bitirir; "How about yours?" ekle.' },
        { text: 'My weekend is on Saturday.', correct: false, feedback: 'Soru hafta sonunun nasıl geçtiği.' },
      ],
    },
    {
      id: 's2',
      kind: 'speech',
      npcLine: 'Nice and quiet. Did you do anything fun?',
      hint: { tr: 'Arkadaşlarla yürüyüşe gittiğini söyle.', example: 'I went hiking…' },
      acceptedAnswers: ['I went hiking with some friends.', 'Yeah, I went for a hike with friends.', 'We went hiking outside the city.'],
      keywords: [['hiking', 'hike', 'walk']],
      wordBank: ['I went', 'hiking', 'with some friends'],
      why: 'Geçmiş için "went" kullanılır: "I went hiking."',
      mistakes: [{ match: 'i (go|am going) hiking', tip: 'Geçen hafta sonu için geçmiş zaman: "I went hiking."' }],
    },
    {
      id: 's3',
      kind: 'text',
      npcLine: 'Oh, fun! Where did you go?',
      hint: { tr: 'Şehrin dışındaki bir göle gittiğinizi söyle.', example: 'To a lake…' },
      acceptedAnswers: ['To a lake just outside the city.', 'We went to a lake near the city.', 'A lake about an hour away.'],
      keywords: [['lake', 'forest', 'mountain', 'park']],
      wordBank: ['To a lake', 'just outside', 'the city'],
      why: 'Kısa cevaplar sohbette gayet doğal: "To a lake near the city."',
    },
    {
      id: 's4',
      kind: 'choice',
      npcLine: 'Sounds lovely. Hey, are you coming to lunch with us today?',
      hint: { tr: 'Katılmak istediğini kibarca söyle.' },
      prompt: 'Davete cevap ver:',
      options: [
        { text: "I'd love to! What time?", correct: true, feedback: 'Sıcak bir kabul ve pratik bir soru.' },
        { text: 'Yes, I come.', correct: false, near: true, feedback: 'Anlaşılır ama "I\'d love to" ya da "I\'m in" daha doğal.' },
        { text: 'I ate yesterday.', correct: false, feedback: 'Davet bugünkü öğle yemeği için.' },
      ],
    },
    {
      id: 's5',
      kind: 'speech',
      npcLine: 'Around twelve thirty. See you then!',
      hint: { tr: 'Tamam de ve görüşürüz de.', example: 'Great, see you…' },
      acceptedAnswers: ['Great, see you then!', 'Perfect, see you at twelve thirty!', 'Sounds good, see you later!'],
      keywords: [['see you', 'later', 'then'], ['great', 'perfect', 'sounds good', 'ok', 'okay', 'cool']],
      wordBank: ['Sounds good', 'see you then'],
      why: '"Sounds good" bir planı onaylamanın en doğal yolu.',
    },
  ],
  vocab: [
    { text: 'How was your weekend?', tr: 'Hafta sonun nasıldı?' },
    { text: 'How about yours?', tr: 'Seninki nasıldı?' },
    { text: 'I went hiking', tr: 'Doğa yürüyüşüne gittim' },
    { text: "I'd love to!", tr: 'Çok isterim!' },
    { text: 'Sounds good', tr: 'Olur / Güzel' },
  ],
  curveballs: ['Did you see the email about the Friday meeting?'],
};

export default en;
