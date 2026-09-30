import type { Scenario } from '../../types/scenario';

export const streetDirections: Scenario = {
  id: 'street-directions-en-1',
  title: 'Metroyu sor, kestirme yol iste',
  description: 'Yoldan geçen birine nazikçe seslenip yön sorma ve tarif etme alıştırması.',
  setting: 'street',
  placeLabel: 'Şehir',
  locale: 'en-GB',
  level: 'Orta',
  minutes: 4,
  xp: 25,
  isPremium: false,
  npc: { name: 'Turist Alex', mood: 'Haritada kararsız görünüyor', look: 'tourist', place: 'Oxford St.' },
  pattern: { text: 'Could you tell me the way to…?', note: 'Yol sorma kalıbı · A2' },
  steps: [
    {
      id: 's1',
      kind: 'text',
      npcLine: 'Excuse me, do you know where the nearest subway station is?',
      hint: { tr: 'Düz gitmesini ve ışıklardan sağa dönmesini söyle.', example: 'Go straight and turn right at the traffic lights…' },
      acceptedAnswers: [
        'Go straight for two blocks, then turn right at the traffic lights.',
        'Go straight and turn right at the traffic lights.',
      ],
      keywords: [['straight'], ['right', 'left'], ['at the traffic lights', 'at the corner', 'lights', 'corner']],
      wordBank: ['Go straight', 'turn right', 'next to', "You can't miss it", 'on the corner'],
      why: 'Bir noktada dönülen yerler için "at" kullanılır: at the corner, at the traffic lights.',
      mistakes: [
        { match: '(turn|turning) (right|left) in the', tip: 'Dönülen noktalar için "in" değil "at" kullanılır: turn right at the traffic lights.' },
        { match: 'go direct', tip: '"Go direct" yerine "go straight" denir.' },
      ],
    },
    {
      id: 's2',
      kind: 'speech',
      npcLine: 'Thanks! Is it far from here?',
      hint: { tr: 'Yürüyerek kaç dakika olduğunu söyle.', example: "It's about five minutes on foot." },
      acceptedAnswers: ["It's about five minutes on foot.", "No, it's just five minutes away."],
      keywords: [['minute', 'minutes', 'close', 'near', 'far']],
      wordBank: ["It's about…", 'on foot', 'not far'],
    },
  ],
};

export const professorExtension: Scenario = {
  id: 'campus-extension-en-1',
  title: 'Ödev için ek süre iste',
  description: 'Hocanla çekinmeden, kibarca rica etme alıştırması.',
  setting: 'campus',
  placeLabel: 'Kampüs',
  locale: 'en-US',
  level: 'Akademik',
  minutes: 5,
  xp: 30,
  isPremium: false,
  npc: { name: 'Profesör Miller', mood: 'Ofis saati', look: 'professor' },
  pattern: { text: 'I was wondering if…', note: 'Resmi rica kalıbı · B1' },
  steps: [
    {
      id: 's1',
      kind: 'speech',
      npcLine: 'Good morning! Did you want to discuss the assignment deadline?',
      hint: { tr: '"Evet hocam, iki gün ek süre rica edebilir miyim?" de.', example: 'Could I please ask for a two-day extension?' },
      acceptedAnswers: ['Yes professor, could I please ask for a two-day extension?', 'Yes, I was wondering if I could have two more days.'],
      keywords: [['extension', 'more days', 'extra time', 'two days', 'two-day'], ['could', 'wondering', 'may']],
      wordBank: ['Could I ask for…', 'I was wondering if…'],
      why: 'Hocaya rica ederken "Could I…" veya "I was wondering if…" ile başlamak kibar ve doğal.',
    },
  ],
};

export const hotelLateCheckout: Scenario = {
  id: 'hotel-late-checkout-en-1',
  title: 'Oda kartı sorunu ve geç çıkış isteği',
  description: 'Beklenmedik aksaklıkta sakince hak arama alıştırması.',
  setting: 'hotel',
  placeLabel: 'Butik Otel',
  locale: 'en-GB',
  level: 'İleri',
  minutes: 6,
  xp: 35,
  isPremium: true,
  npc: { name: 'Resepsiyon', mood: 'Yardımsever görevli', look: 'receptionist' },
  pattern: { text: 'Would it be possible to…?', note: 'Nazik talep kalıbı · B1' },
  steps: [],
};
