import type { ScenarioVariant } from '../../../types/scenario';

const en: ScenarioVariant = {
  locale: 'en-US',
  title: 'Oda kartı sorunu ve geç çıkış isteği',
  description: 'Beklenmedik aksaklıkta sakince hak arama ve pazarlık provası.',
  placeLabel: 'Butik otel',
  mood: 'Yardımsever resepsiyonist',
  pattern: { text: 'Would it be possible to…?', note: 'Nazik talep kalıbı · B1' },
  steps: [
    {
      id: 's1',
      kind: 'choice',
      npcLine: 'Good morning! How can I help you?',
      hint: { tr: 'Oda kartının çalışmadığını sakince söyle.' },
      prompt: 'Sorunu anlat:',
      options: [
        { text: "Hi, I'm in room 304 and my key card doesn't seem to work.", correct: true, feedback: 'Oda numarası + sorun: resepsiyonun ihtiyacı olan her şey.' },
        { text: 'Your card is broken. Fix it.', correct: false, near: true, feedback: 'Sorun doğru ama suçlayıcı ve emir gibi; "doesn\'t seem to work" yumuşatır.' },
        { text: 'I would like a new room card game.', correct: false, feedback: 'Oyun değil, çalışmayan bir oda kartı var.' },
      ],
    },
    {
      id: 's2',
      kind: 'text',
      npcLine: "I'm so sorry about that. Could I see some ID, please?",
      hint: { tr: 'Tabii de ve pasaportunu uzat.', example: 'Of course, here is…' },
      acceptedAnswers: ["Of course, here's my passport.", "Sure, here's my ID.", 'Of course, here you go.'],
      keywords: [['passport', 'id', 'here you go', "here's", 'here is']],
      wordBank: ['Of course', "here's", 'my passport'],
      why: 'Bir şey uzatırken "Here you go" ya da "Here\'s my…" denir.',
    },
    {
      id: 's3',
      kind: 'speech',
      npcLine: "Here's a new card. Is there anything else I can do for you?",
      hint: { tr: 'Geç çıkış mümkün mü diye sor.', example: 'Would it be possible to…' },
      acceptedAnswers: ['Would it be possible to check out a bit later?', 'Could I have a late checkout, please?', 'Would a late checkout be possible?'],
      keywords: [['late', 'later'], ['check out', 'checkout']],
      wordBank: ['Would it be possible', 'to check out', 'a bit later'],
      why: 'Otelde talep ederken "Would it be possible to…" en kibar kalıp.',
      mistakes: [{ match: '^i want (a )?late', tip: '"I want" yerine "Would it be possible to…" otelde çok daha kibar duyulur.' }],
    },
    {
      id: 's4',
      kind: 'choice',
      npcLine: "Late checkout at two is thirty dollars. Would you still like it?",
      hint: { tr: 'Ücretsiz bir seçenek olup olmadığını kibarca sor.' },
      prompt: 'Kibarca pazarlık et:',
      options: [
        { text: "Hmm, is there any chance of twelve for free, given the card problem?", correct: true, feedback: 'Sakin, gerekçeli ve nazik bir pazarlık; tam ileri seviye.' },
        { text: 'No way, that is too expensive!', correct: false, near: true, feedback: 'Hissin anlaşılır ama sert; "Is there any chance…" ile yumuşat.' },
        { text: 'Yes, thirty dollars per night.', correct: false, feedback: 'Ücret gece başına değil, geç çıkış için.' },
      ],
    },
    {
      id: 's5',
      kind: 'speech',
      npcLine: "Of course, twelve is on us. Enjoy the rest of your stay!",
      hint: { tr: 'İçtenlikle teşekkür et ve iyi günler dile.', example: 'Thank you so much, I really…' },
      acceptedAnswers: ['Thank you so much, I really appreciate it!', 'That’s very kind, thanks a lot!', 'Thanks, you’ve been really helpful. Have a nice day!'],
      keywords: [['thank', 'thanks', 'appreciate', 'kind', 'helpful']],
      wordBank: ['Thank you so much', 'I really appreciate it', 'very kind'],
      why: '"I really appreciate it" yardım için içten bir teşekkür.',
    },
  ],
  vocab: [
    { text: "doesn't seem to work", tr: 'çalışmıyor gibi görünüyor' },
    { text: 'key card', tr: 'oda kartı' },
    { text: 'Would it be possible to…?', tr: '… mümkün olur mu?' },
    { text: 'late checkout', tr: 'geç çıkış' },
    { text: "It's on us", tr: 'Bizden olsun (ücretsiz)' },
  ],
  curveballs: ['We only have a room with a city view left. Is that alright?'],
};

export default en;
