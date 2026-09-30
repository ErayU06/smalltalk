import type { ScenarioVariant } from '../../../types/scenario';

const en: ScenarioVariant = {
  locale: 'en-US',
  title: 'Doktora şikâyetini anlat',
  description: 'Belirtileri, başlangıcını ve ne zaman arttığını sakince anlatma provası.',
  placeLabel: 'Aile hekimi',
  mood: 'Sakin ve dikkatli doktor',
  pattern: { text: 'It started… and it hurts when…', note: 'Belirti anlatma · B1' },
  steps: [
    {
      id: 's1',
      kind: 'choice',
      npcLine: 'Hi, please have a seat. What brings you in today?',
      hint: { tr: 'Boğaz ağrını kısaca anlatan şıkkı seç.' },
      prompt: 'Şikâyetini söyle:',
      options: [
        { text: "I've had a sore throat for a few days.", correct: true, feedback: 'Belirti + süre: doktorun ilk duymak istediği bilgi.' },
        { text: 'My throat is hurting me since days.', correct: false, near: true, feedback: 'Anlaşılır ama "I\'ve had a sore throat for a few days" daha doğru.' },
        { text: 'I brought my car today.', correct: false, feedback: '"What brings you in" nedenini soruyor; araba değil.' },
      ],
    },
    {
      id: 's2',
      kind: 'speech',
      npcLine: 'I see. When did it start?',
      hint: { tr: 'Pazartesi başladığını söyle.', example: 'It started on…' },
      acceptedAnswers: ['It started on Monday.', 'On Monday morning.', 'It started last Monday.', 'Since Monday.'],
      keywords: [['monday', 'tuesday', 'weekend', 'days ago', 'last week']],
      wordBank: ['It started', 'on Monday', 'morning'],
      why: 'Başlangıç günü için "It started on Monday" en net cevap.',
    },
    {
      id: 's3',
      kind: 'text',
      npcLine: 'Does anything make it worse?',
      hint: { tr: 'Yutkunurken acıdığını söyle.', example: 'It hurts when I…' },
      acceptedAnswers: ['It hurts when I swallow.', 'Yes, swallowing makes it worse.', 'It gets worse when I swallow or talk a lot.'],
      keywords: [['swallow', 'swallowing', 'talk', 'eat']],
      wordBank: ['It hurts', 'when I', 'swallow'],
      why: '"It hurts when I…" belirtinin ne zaman arttığını anlatmanın doğal yolu.',
    },
    {
      id: 's4',
      kind: 'choice',
      npcLine: 'Do you have any allergies?',
      hint: { tr: 'Bildiğin bir alerjin olmadığını söyle.' },
      prompt: 'Cevap ver:',
      options: [
        { text: 'Not that I know of.', correct: true, feedback: '"Not that I know of" = bildiğim kadarıyla yok; tam doğal kalıp.' },
        { text: 'No, never, nothing.', correct: false, near: true, feedback: 'Anlaşılır ama yapay duyulur; "Not that I know of" daha doğal.' },
        { text: 'Yes, I love cats.', correct: false, feedback: 'Soru alerjin olup olmadığı; kedileri sevmek değil.' },
      ],
    },
    {
      id: 's5',
      kind: 'speech',
      npcLine: "Rest, drink warm fluids, and come back if it isn't better in a week. Take care!",
      hint: { tr: 'Teşekkür et ve iyi günler dile.', example: 'Thank you, doctor…' },
      acceptedAnswers: ['Thank you, doctor. Have a good day!', 'Thanks a lot, I will.', 'Thank you so much, see you.', 'Thanks, I’ll take it easy.'],
      keywords: [['thank', 'thanks']],
      wordBank: ['Thank you, doctor', "I'll take it easy"],
      why: '"I\'ll take it easy" = dinleneceğim; doktora güzel bir kapanış.',
    },
  ],
  vocab: [
    { text: 'What brings you in?', tr: 'Sizi buraya ne getirdi? (Şikâyetiniz ne?)' },
    { text: 'a sore throat', tr: 'boğaz ağrısı' },
    { text: 'It hurts when I swallow', tr: 'Yutkununca acıyor' },
    { text: 'Not that I know of', tr: 'Bildiğim kadarıyla yok' },
    { text: 'take it easy', tr: 'dinlenmek, yavaşlamak' },
  ],
  curveballs: ['On a scale from one to ten, how bad is the pain?'],
};

export default en;
