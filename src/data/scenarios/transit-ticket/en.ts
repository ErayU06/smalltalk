import type { ScenarioVariant } from '../../../types/scenario';

const en: ScenarioVariant = {
  locale: 'en-GB',
  title: 'Bilet al, doğru hattı sor',
  description: 'İstasyonda görevliden bilet alıp doğru hattı sorma provası.',
  placeLabel: 'Metro istasyonu',
  mood: 'Deneyimli gişe görevlisi',
  pattern: { text: 'Which line goes to…?', note: 'Hat sorma kalıbı · A2' },
  steps: [
    {
      id: 's1',
      kind: 'choice',
      npcLine: 'Morning! Where are you heading?',
      hint: { tr: 'Nereye gittiğini ve bilet istediğini söyle.' },
      prompt: 'Bilet iste:',
      options: [
        { text: "Hi, I'd like a single to Camden, please.", correct: true, feedback: 'İngiltere\'de "a single" tek yön, "a return" gidiş-dönüş demek.' },
        { text: 'Camden. Ticket.', correct: false, near: true, feedback: 'Anlaşılır ama çok kısa; tam cümle kur.' },
        { text: "I'm heading very well, thanks.", correct: false, feedback: '"Heading" nereye gittiğini soruyor, nasıl olduğunu değil.' },
      ],
    },
    {
      id: 's2',
      kind: 'text',
      npcLine: "That's two pounds eighty. Paying by card?",
      hint: { tr: 'Evet, kartla ödeyeceğini söyle.', example: 'Yes, by card…' },
      acceptedAnswers: ['Yes, by card, please.', 'Card, please.', "Yes, I'll pay by card.", 'Yes, contactless, please.'],
      keywords: [['card', 'contactless']],
      wordBank: ['Yes', 'by card', 'please'],
      why: 'Ödeme şekli için "by card" kullanılır.',
      mistakes: [{ match: 'with (the )?card', tip: 'İngilizcede ödeme şekli "by card" ile söylenir.' }],
    },
    {
      id: 's3',
      kind: 'speech',
      npcLine: 'Here you go. Anything else?',
      hint: { tr: 'Camden\'a hangi hattın gittiğini sor.', example: 'Which line goes to…' },
      acceptedAnswers: ['Which line goes to Camden?', 'Which line do I take to Camden?', 'Could you tell me which line goes to Camden?'],
      keywords: [['line'], ['camden']],
      wordBank: ['Which line', 'goes to', 'Camden'],
      why: 'Hat sorarken "Which line goes to…?" en net kalıp.',
      mistakes: [{ match: '^how can i go to', tip: '"How can I go to…" yerine "How do I get to…" ya da "Which line goes to…" daha doğal.' }],
    },
    {
      id: 's4',
      kind: 'choice',
      npcLine: 'Northern line, platform two. Change at Euston if it’s busy.',
      hint: { tr: 'Anlamadığın bir şeyi kibarca tekrar ettir.' },
      prompt: 'Aktarmayı tam anlamadın:',
      options: [
        { text: "Sorry, could you say that again? Where do I change?", correct: true, feedback: 'Tekrar istemek tamamen normal; "Could you say that again?" kibar.' },
        { text: 'What? Again.', correct: false, near: true, feedback: 'Amaç doğru ama "What?" sert duyulur; "Sorry?" ile başla.' },
        { text: 'Yes, platform two is busy.', correct: false, feedback: 'Görevli aktarma yapabileceğin yeri söylüyor; bunu sorman gerekiyordu.' },
      ],
    },
    {
      id: 's5',
      kind: 'speech',
      npcLine: 'Change at Euston. You can’t miss it. Safe travels!',
      hint: { tr: 'Teşekkür et ve iyi günler dile.', example: 'Thanks, have a…' },
      acceptedAnswers: ['Thanks a lot, have a nice day!', 'Cheers, thank you!', 'Thank you so much, bye!', 'Great, thanks for your help!'],
      keywords: [['thanks', 'thank you', 'cheers']],
      wordBank: ['Thanks a lot', 'cheers', 'have a nice day'],
      why: 'İngiltere\'de "Cheers" teşekkür için de kullanılır.',
    },
  ],
  vocab: [
    { text: 'a single / a return', tr: 'tek yön / gidiş-dönüş bilet' },
    { text: 'by card', tr: 'kartla' },
    { text: 'Which line goes to…?', tr: '…ya hangi hat gider?' },
    { text: 'change at…', tr: '…da aktarma yap' },
    { text: 'platform', tr: 'peron' },
  ],
  curveballs: ["Sorry, this card doesn't work here. Do you have another one?"],
};

export default en;
