import type { ScenarioVariant } from '../../../types/scenario';

const en: ScenarioVariant = {
  locale: 'en-US',
  title: 'Partide sohbete katıl, kibarca ayrıl',
  description: 'Tanımadığın biriyle sohbet açma, sürdürme ve nazikçe bitirme provası.',
  placeLabel: 'Ev partisi',
  mood: 'Rahat ve konuşkan Leo',
  pattern: { text: 'Anyway, it was great talking to you!', note: 'Sohbeti kibarca bitirme · B2' },
  steps: [
    {
      id: 's1',
      kind: 'choice',
      npcLine: "Hey! I don't think I know you. How do you know Sam?",
      hint: { tr: 'Sam\'i nereden tanıdığını söyle ve sohbeti aç.' },
      prompt: 'Cevap ver:',
      options: [
        { text: "Hi! We work together. I'm Deniz, by the way.", correct: true, feedback: 'Bağlantını söyleyip kendini tanıtıyorsun; sohbet açılır.' },
        { text: 'I know him.', correct: false, near: true, feedback: 'Doğru ama sohbeti kapatır; nereden tanıdığını ekle.' },
        { text: "I don't know you either.", correct: false, feedback: 'Leo Sam\'i nereden tanıdığını soruyor.' },
      ],
    },
    {
      id: 's2',
      kind: 'speech',
      npcLine: "Nice to meet you, Deniz! I'm Leo. So what do you do there?",
      hint: { tr: 'Ne iş yaptığını söyle ve soruyu geri çevir.', example: "I'm in marketing. What about you?" },
      acceptedAnswers: ["I'm in marketing. What about you?", "I'm a designer. How about you?", 'I work in sales. What do you do?'],
      keywords: [['marketing', 'designer', 'sales', 'developer', 'engineer', 'work'], ['what about you', 'how about you', 'what do you do', 'and you']],
      wordBank: ["I'm in…", 'What about you?', 'How about you?'],
      why: 'Soruyu geri çevirmek sohbeti canlı tutar.',
    },
    {
      id: 's3',
      kind: 'text',
      npcLine: "I'm a nurse. Long shifts, but I love it. Do you live nearby?",
      hint: { tr: 'Yakında, on dakika uzakta oturduğunu söyle.', example: 'Yes, just ten minutes…' },
      acceptedAnswers: ['Yes, just ten minutes away.', 'Pretty close, about ten minutes from here.', "Not far, I'm about ten minutes away."],
      keywords: [['minutes', 'close', 'near', 'nearby', 'far', 'away']],
      wordBank: ['just', 'ten minutes', 'away'],
      why: 'Mesafe için "ten minutes away" kısa ve doğal.',
    },
    {
      id: 's4',
      kind: 'choice',
      npcLine: 'Oh, cool! So who else do you know here?',
      hint: { tr: 'Pek kimseyi tanımadığını esprili ve rahat bir dille söyle.' },
      prompt: 'Cevap ver:',
      options: [
        { text: 'Honestly, just Sam so far. Maybe you can introduce me!', correct: true, feedback: 'Dürüst ve sıcak; yeni tanışmalara kapı açıyor.' },
        { text: 'Nobody. I am alone.', correct: false, near: true, feedback: 'Doğru ama hüzünlü duyulur; "just Sam so far" daha rahat.' },
        { text: 'I know everything here.', correct: false, feedback: 'Soru kimleri tanıdığın; her şeyi değil.' },
      ],
    },
    {
      id: 's5',
      kind: 'speech',
      npcLine: "Ha, sure! I'll introduce you to my friends later.",
      hint: { tr: 'Sohbeti kibarca bitir: Sam\'e merhaba deme bahanesiyle ayrıl.', example: "Anyway, it was great talking to you…" },
      acceptedAnswers: ["Anyway, it was great talking to you. I'm going to say hi to Sam.", 'Great! It was really nice talking to you, see you later.', "Thanks! I'll go say hi to Sam, catch you later!"],
      keywords: [['talking to you', 'catch you later', 'see you later', 'say hi'], ['great', 'nice', 'anyway', 'thanks']],
      wordBank: ['Anyway', 'it was great talking to you', 'catch you later'],
      why: '"Anyway, it was great talking to you" kaba olmadan sohbeti bitirmenin klasik yolu.',
    },
  ],
  vocab: [
    { text: 'How do you know…?', tr: '…yi nereden tanıyorsun?' },
    { text: 'by the way', tr: 'bu arada' },
    { text: 'What about you?', tr: 'Ya sen?' },
    { text: 'introduce me', tr: 'beni tanıştır' },
    { text: 'Catch you later!', tr: 'Sonra görüşürüz!' },
  ],
  curveballs: ['Wait, have we met before? You look familiar!'],
};

export default en;
