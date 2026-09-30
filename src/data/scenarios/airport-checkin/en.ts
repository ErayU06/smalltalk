import type { ScenarioVariant } from '../../../types/scenario';

const en: ScenarioVariant = {
  locale: 'en-US',
  title: 'Check-in yap, koltuk ve bagaj sor',
  description: 'Havalimanı kontuarında belge, koltuk tercihi ve bagaj sorununu çözme provası.',
  placeLabel: 'Havalimanı',
  mood: 'Profesyonel check-in görevlisi',
  pattern: { text: 'Could I get a window seat?', note: 'Tercih bildirme kalıbı · A2' },
  steps: [
    {
      id: 's1',
      kind: 'choice',
      npcLine: 'Good afternoon! Where are you flying to today?',
      hint: { tr: 'Nereye uçtuğunu söyle ve pasaportunu uzat.' },
      prompt: 'Cevap ver:',
      options: [
        { text: "Hi, to Chicago. Here's my passport.", correct: true, feedback: 'Kısa ve eksiksiz: hedef + belge.' },
        { text: 'I am flying with airplane.', correct: false, near: true, feedback: 'Soru nereye uçtuğun; "to Chicago" demen yeterli.' },
        { text: 'I flew yesterday.', correct: false, feedback: 'Görevli bugünkü uçuşunu soruyor.' },
      ],
    },
    {
      id: 's2',
      kind: 'text',
      npcLine: 'Thank you. Do you have a seat preference?',
      hint: { tr: 'Mümkünse cam kenarı iste.', example: 'Could I get a window…' },
      acceptedAnswers: ['Could I get a window seat, please?', 'A window seat, if possible.', "I'd prefer a window seat, please.", 'Window, please.'],
      keywords: [['window', 'aisle']],
      wordBank: ['Could I get', 'a window seat', 'if possible'],
      why: '"If possible" eklemek talebi yumuşatır.',
    },
    {
      id: 's3',
      kind: 'speech',
      npcLine: 'Sure. Are you checking any bags today?',
      hint: { tr: 'Bir valiz vereceğini söyle.', example: 'Yes, just one…' },
      acceptedAnswers: ['Yes, just this one suitcase.', 'Yes, one bag, please.', 'Just one, thanks.', "Yes, I'm checking one bag."],
      keywords: [['one', 'a bag', 'suitcase', 'this']],
      wordBank: ['Yes', 'just one', 'suitcase'],
      why: 'Kısa cevap yeterli: "Yes, just one."',
    },
    {
      id: 's4',
      kind: 'choice',
      npcLine: "It's two kilos over the limit. That would be a fifty-dollar fee.",
      hint: { tr: 'Bir şeyleri el bagajına almayı öneren şıkkı seç.' },
      prompt: 'Çözüm öner:',
      options: [
        { text: 'Oh! Could I move a few things to my carry-on?', correct: true, feedback: 'Sakin ve çözüm odaklı; görevliler buna genelde izin verir.' },
        { text: 'That is not my problem.', correct: false, near: true, feedback: 'Hissin anlaşılır ama sert; bir çözüm önermek işe yarar.' },
        { text: 'Two kilos of what?', correct: false, feedback: 'Görevli bagajının iki kilo fazla olduğunu söylüyor.' },
      ],
    },
    {
      id: 's5',
      kind: 'speech',
      npcLine: "All set! Boarding is at gate twelve. Have a great flight!",
      hint: { tr: 'Teşekkür et ve iyi günler dile.', example: 'Thanks so much…' },
      acceptedAnswers: ['Thanks so much, have a nice day!', 'Thank you for your help!', 'Great, thanks a lot!', 'Thanks, you too!'],
      keywords: [['thank', 'thanks']],
      wordBank: ['Thanks so much', 'for your help'],
      why: 'Kısa ve sıcak bir teşekkür yeterli.',
    },
  ],
  vocab: [
    { text: 'seat preference', tr: 'koltuk tercihi' },
    { text: 'window / aisle seat', tr: 'cam kenarı / koridor koltuğu' },
    { text: 'check a bag', tr: 'bagaj vermek' },
    { text: 'carry-on', tr: 'el bagajı' },
    { text: 'boarding gate', tr: 'biniş kapısı' },
  ],
  curveballs: ['The flight is a little delayed. Would you like a meal voucher?'],
};

export default en;
