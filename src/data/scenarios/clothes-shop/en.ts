import type { ScenarioVariant } from '../../../types/scenario';

const en: ScenarioVariant = {
  locale: 'en-US',
  title: 'Beden sor, dene, değiştir',
  description: 'Mağazada beden sorma, deneme kabini ve karar verme provası.',
  placeLabel: 'Butik mağaza',
  mood: 'Yardımsever satış danışmanı',
  pattern: { text: 'Do you have this in a medium?', note: 'Beden sorma kalıbı · A2' },
  steps: [
    {
      id: 's1',
      kind: 'choice',
      npcLine: 'Hi there! Are you looking for anything in particular?',
      hint: { tr: 'Sadece baktığını kibarca söyle.' },
      prompt: 'Nazikçe cevap ver:',
      options: [
        { text: "I'm just looking, thanks!", correct: true, feedback: 'Mağazalarda en doğal cevap; kibar ve rahat.' },
        { text: 'No. Leave me.', correct: false, near: true, feedback: 'Anlam doğru ama kaba duyulur; "I\'m just looking, thanks" de.' },
        { text: "I'm looking at you.", correct: false, feedback: 'Bu "sana bakıyorum" demek; ürünlere baktığını söylemek istiyorsun.' },
      ],
    },
    {
      id: 's2',
      kind: 'text',
      npcLine: 'No problem. Let me know if you need anything.',
      hint: { tr: 'Bu kazağın M bedeni var mı diye sor.', example: 'Do you have this in…' },
      acceptedAnswers: ['Excuse me, do you have this in a medium?', 'Do you have this sweater in a medium?', 'Is there a medium in this one?'],
      keywords: [['medium', 'size m'], ['do you have', 'is there', 'have']],
      wordBank: ['Do you have', 'this', 'in a medium', 'Excuse me'],
      why: 'Beden sorarken "Do you have this in a medium?" kalıbı kullanılır.',
    },
    {
      id: 's3',
      kind: 'speech',
      npcLine: 'Here you go. The fitting rooms are just over there.',
      hint: { tr: 'Teşekkür et ve deneyebilir miyim diye sor.', example: 'Thanks! Can I try it on?' },
      acceptedAnswers: ['Thanks! Can I try it on?', 'Great, could I try it on?', 'Thank you, I’ll try it on.'],
      keywords: [['try it on', 'try on', 'try']],
      wordBank: ['Can I', 'try it on', 'thanks'],
      why: 'Kıyafet denemek için "try it on" kullanılır.',
      mistakes: [{ match: 'try (it )?out', tip: 'Kıyafet için "try out" değil "try on" kullanılır.' }],
    },
    {
      id: 's4',
      kind: 'choice',
      npcLine: 'How was it? Just so you know, sale items can’t be returned.',
      hint: { tr: 'Biraz küçük geldiğini söyle ve bir beden büyüğünü iste.' },
      prompt: 'Sonucu söyle:',
      options: [
        { text: "It's a bit tight. Could I try a large?", correct: true, feedback: 'Sorunu kısaca söyleyip çözüm istiyorsun.' },
        { text: 'It is small for me, bring large.', correct: false, near: true, feedback: 'Anlaşılır ama emir gibi; "Could I try a large?" daha kibar.' },
        { text: 'Yes, I will return it tomorrow.', correct: false, feedback: 'İndirimli ürünler iade edilemiyor; önce doğru bedeni dene.' },
      ],
    },
    {
      id: 's5',
      kind: 'speech',
      npcLine: 'That one looks great on you! Anything else today?',
      hint: { tr: 'Teşekkür et, bu kadar olduğunu söyle.', example: "Thanks! That's all…" },
      acceptedAnswers: ["Thanks! That's all for today.", 'No, that’s it, thank you!', "Thank you, I'll take it.", "That's everything, thanks!"],
      keywords: [['thanks', 'thank you'], ["that's all", 'that is all', "that's it", 'that is it', 'everything', "i'll take it", 'i will take it']],
      wordBank: ['Thanks', "That's all", "I'll take it"],
      why: 'Alışverişi bitirirken "That\'s all, thanks" yeterli.',
    },
  ],
  vocab: [
    { text: "I'm just looking", tr: 'Sadece bakıyorum' },
    { text: 'Do you have this in a medium?', tr: 'Bunun M bedeni var mı?' },
    { text: 'try it on', tr: 'denemek (kıyafet)' },
    { text: 'fitting room', tr: 'deneme kabini' },
    { text: "It's a bit tight", tr: 'Biraz dar' },
  ],
  curveballs: ['This one is on sale, so it’s final. Still want it?'],
};

export default en;
