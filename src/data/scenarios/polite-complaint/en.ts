import type { ScenarioVariant } from '../../../types/scenario';

const en: ScenarioVariant = {
  locale: 'en-US',
  title: 'Yanlış gelen siparişi kibarca düzelttir',
  description: 'Kimseyi suçlamadan sorunu söyleme ve çözümü kabul etme provası.',
  placeLabel: 'Restoran',
  mood: 'İlgili garson',
  pattern: { text: "Sorry, I think there's been a mix-up.", note: 'Kibar şikâyet kalıbı · B2' },
  steps: [
    {
      id: 's1',
      kind: 'choice',
      npcLine: 'Here we go, one mushroom risotto!',
      hint: { tr: 'Sen makarna istemiştin. Suçlamadan bir karışıklık olduğunu söyle.' },
      prompt: 'Sorunu kibarca söyle:',
      options: [
        { text: "Sorry, I think there's been a mix-up. I ordered the pasta.", correct: true, feedback: '"There\'s been a mix-up" kimseyi suçlamadan sorunu söyler.' },
        { text: 'You brought the wrong food!', correct: false, near: true, feedback: 'Doğru ama suçlayıcı; "I think there\'s been a mix-up" daha yumuşak.' },
        { text: 'Thank you, it looks delicious.', correct: false, feedback: 'Siparişin bu değildi; bunu nazikçe söylemen gerekiyor.' },
      ],
    },
    {
      id: 's2',
      kind: 'speech',
      npcLine: "Oh no, I'm so sorry! It was the pasta with tomato sauce, right?",
      hint: { tr: 'Evet de ve sorun olmadığını söyle.', example: "Yes, that's right. No worries…" },
      acceptedAnswers: ["Yes, that's right. No worries!", "That's right, it's no problem.", 'Yes, the tomato one. No worries at all.'],
      keywords: [['yes', 'right', 'tomato'], ['no worries', 'no problem', 'okay', 'fine']],
      wordBank: ["Yes, that's right", 'no worries'],
      why: '"No worries" garsonu rahatlatır; ortam gerilmez.',
    },
    {
      id: 's3',
      kind: 'choice',
      npcLine: "The kitchen is closing soon. I can bring the pasta in ten minutes, or something quicker?",
      hint: { tr: 'Beklemeyi kabul edip teşekkür eden şıkkı seç.' },
      prompt: 'Karar ver:',
      options: [
        { text: "Ten minutes is fine, I don't mind waiting.", correct: true, feedback: 'Esnek ve anlayışlı; "I don\'t mind waiting" çok doğal.' },
        { text: 'Ten minutes is too much, hurry up.', correct: false, near: true, feedback: 'Anlaşılır ama sert; beklemek istemiyorsan "something quicker" seçebilirsin.' },
        { text: 'Close the kitchen, please.', correct: false, feedback: 'Garson mutfağın yakında kapanacağını söylüyor; senden kapatmanı istemiyor.' },
      ],
    },
    {
      id: 's4',
      kind: 'text',
      npcLine: 'Thank you for being so understanding. Can I get you anything while you wait?',
      hint: { tr: 'Biraz daha su iste.', example: 'Could I get some more…' },
      acceptedAnswers: ['Could I get some more water, please?', 'Just some more water, please.', 'Some more water would be great, thanks.'],
      keywords: [['water']],
      wordBank: ['Could I get', 'some more water', 'please'],
      why: '"Some more…" = biraz daha; "Could I get…" kibar talep.',
    },
    {
      id: 's5',
      kind: 'speech',
      npcLine: "Here's your pasta. And dessert is on the house tonight!",
      hint: { tr: 'Çok nazik olduğunu söyle ve teşekkür et.', example: "That's so kind…" },
      acceptedAnswers: ["That's so kind, thank you!", 'Oh, you didn’t have to. Thank you!', 'Wow, thanks so much, that’s really nice.'],
      keywords: [['thank', 'thanks'], ['kind', 'nice', 'have to', 'wow']],
      wordBank: ["That's so kind", "you didn't have to", 'thank you'],
      why: '"You didn\'t have to" ikram karşısında nazik bir şaşkınlık ifadesi.',
    },
  ],
  vocab: [
    { text: "There's been a mix-up", tr: 'Bir karışıklık olmuş' },
    { text: 'I ordered the…', tr: '… sipariş etmiştim' },
    { text: "I don't mind waiting", tr: 'Beklemekte sakınca yok' },
    { text: 'on the house', tr: 'ikram, müesseseden' },
    { text: "You didn't have to", tr: 'Zahmet etmeseydiniz' },
  ],
  curveballs: ['Would you like to speak to the manager?'],
};

export default en;
