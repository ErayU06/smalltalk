import type { SymbolViewProps } from 'expo-symbols';

// Mock content until a backend exists. The practice language is English;
// the app's own UI is Turkish.

export type Level = 'Başlangıç' | 'Orta' | 'İleri';

export const Levels: Level[] = ['Başlangıç', 'Orta', 'İleri'];

export type Scenario = {
  id: string;
  title: string;
  description: string;
  /** Shown above the conversation so the learner knows their role. */
  context: string;
  level: Level;
  minutes: number;
  icon: SymbolViewProps['name'];
  partner: string;
  /** Partner lines in order. The learner replies after every line except the last. */
  script: string[];
  /** Suggested replies for each learner turn (length = script.length - 1). */
  suggestions: string[][];
  tips: string[];
};

export const scenarios: Scenario[] = [
  {
    id: 'coffee-shop',
    title: 'Kafede sipariş',
    description: 'Kahve sipariş et, barista ile kısa bir sohbet kur.',
    context: 'Bir kafedesin ve kendine bir içecek sipariş edeceksin.',
    level: 'Başlangıç',
    minutes: 3,
    icon: { ios: 'cup.and.saucer.fill', android: 'local_cafe', web: 'local_cafe' },
    partner: 'Sam (barista)',
    script: [
      'Hi there! What can I get for you today?',
      'Great choice. Would you like it hot or iced?',
      'Sure thing. Can I get a name for the order?',
      "Thanks! It'll be ready in a couple of minutes. Have a great day!",
    ],
    suggestions: [
      ['Could I get a latte, please?', 'What do you recommend?'],
      ['Hot, please.', 'Iced, thanks.'],
      ["Sure, it's Alex.", "It's Kim, thanks."],
    ],
    tips: [
      '"Could I get…" siparişte "I want…" demekten daha kibar duyulur.',
      'Kısa cevaplara "please" ve "thanks" eklemek doğal bir alışkanlıktır.',
    ],
  },
  {
    id: 'new-neighbor',
    title: 'Yeni komşuyla tanışma',
    description: 'Kendini tanıt ve mahalle hakkında sohbet et.',
    context: 'Yeni taşındığın binada merdivende bir komşuyla karşılaştın.',
    level: 'Başlangıç',
    minutes: 4,
    icon: { ios: 'hand.wave.fill', android: 'waving_hand', web: 'waving_hand' },
    partner: 'Emma (komşu)',
    script: [
      "Oh, hi! I don't think we've met. Did you just move in?",
      'Welcome to the building! Where did you move from?',
      "Nice. How are you finding the neighborhood so far?",
      "Well, if you need anything, I'm in 4B. Nice to meet you!",
    ],
    suggestions: [
      ['Yes, I moved in last week.', "Hi! Yes, I'm new here."],
      ['I moved from Istanbul.', 'From across town, actually.'],
      ["I love it, it's really quiet.", 'Still exploring! Any tips?'],
    ],
    tips: [
      '"How are you finding…?" sorusu "nasıl buluyorsun?" anlamına gelir; fikrini sorar.',
      'Sohbeti sürdürmek için cevabının sonuna kısa bir soru ekle: "What about you?"',
    ],
  },
  {
    id: 'weather',
    title: 'Hava durumu sohbeti',
    description: 'En klasik small talk konusu: hava.',
    context: 'Otobüs durağında yanındaki kişi seninle konuşmaya başladı.',
    level: 'Başlangıç',
    minutes: 3,
    icon: { ios: 'sun.max.fill', android: 'wb_sunny', web: 'wb_sunny' },
    partner: 'Leo (yabancı)',
    script: [
      "Lovely weather today, isn't it?",
      "They say it's going to rain this weekend, though.",
      'Do you have any plans for the weekend?',
      "Sounds good. Oh, here's my bus. Enjoy your day!",
    ],
    suggestions: [
      ['Yes, it\'s beautiful!', 'Finally some sun!'],
      ['Oh no, really?', "That's a shame."],
      ["I'm meeting some friends.", 'Just relaxing at home.'],
    ],
    tips: [
      '"…isn\'t it?" gibi soru ekleri onay bekler; kısa ve olumlu cevap yeterlidir.',
      'Olumsuz bir haberi "That\'s a shame" ile yumuşatabilirsin.',
    ],
  },
  {
    id: 'office-kitchen',
    title: 'Ofiste kısa sohbet',
    description: 'Mutfakta bir iş arkadaşınla hafta sonunu konuş.',
    context: 'Pazartesi sabahı ofis mutfağında bir iş arkadaşınla karşılaştın.',
    level: 'Orta',
    minutes: 5,
    icon: { ios: 'briefcase.fill', android: 'work', web: 'work' },
    partner: 'Daniel (iş arkadaşı)',
    script: [
      'Morning! How was your weekend?',
      'Nice! Did you do anything special?',
      "That sounds fun. I mostly caught up on sleep, to be honest.",
      "Anyway, are you going to the team lunch on Thursday?",
      "Great, see you there. Good luck with the week!",
    ],
    suggestions: [
      ['Pretty good, thanks! Yours?', 'Too short, as always.'],
      ['I went hiking with friends.', 'I finally tried that new restaurant.'],
      ['Honestly, that sounds perfect.', 'Sometimes you just need that.'],
      ["Yes, I'll be there.", "I'm not sure yet, I'll check my calendar."],
    ],
    tips: [
      'Cevap verdikten sonra soruyu geri çevir ("And you?"); sohbet tek taraflı kalmaz.',
      '"To be honest" ve "anyway" gibi bağlaçlar konuşmayı doğal gösterir.',
    ],
  },
  {
    id: 'airport-delay',
    title: 'Uçuş rötarı',
    description: 'Kapıda bekleyen bir yolcuyla rötar hakkında konuş.',
    context: 'Uçuşun rötar yaptı; kapıda yanındaki yolcu seninle konuşuyor.',
    level: 'Orta',
    minutes: 5,
    icon: { ios: 'airplane', android: 'flight', web: 'flight' },
    partner: 'Priya (yolcu)',
    script: [
      'Excuse me, did they say how long the delay would be?',
      'Ugh, two hours. Are you traveling for work or pleasure?',
      "Oh nice. Have you been there before?",
      "I'm going to grab a coffee. Would you mind watching my bag for a second?",
      "Thank you so much! I'll be right back.",
    ],
    suggestions: [
      ['I think they said about two hours.', "I'm not sure, I missed it too."],
      ["Pleasure — I'm on holiday.", "Work, unfortunately."],
      ["No, it's my first time.", "Yes, I go there every year."],
      ['Sure, no problem.', "Of course, take your time."],
    ],
    tips: [
      '"Would you mind…?" sorusuna "No, not at all" demek "hayır, sorun değil" anlamına gelir.',
      'Belirsiz olduğunda "I think…" ile başlamak cevabını yumuşatır.',
    ],
  },
  {
    id: 'networking',
    title: 'Etkinlikte networking',
    description: 'Bir konferansta tanımadığın biriyle sohbet başlat.',
    context: 'Bir teknoloji konferansının kahve arasında yeni biriyle tanışıyorsun.',
    level: 'İleri',
    minutes: 6,
    icon: {
      ios: 'person.2.fill',
      android: 'groups',
      web: 'groups',
    },
    partner: 'Marcus (katılımcı)',
    script: [
      "Hi, I'm Marcus. What did you think of the keynote?",
      'Same here. So what brings you to the conference?',
      "Interesting! What kind of projects are you working on these days?",
      'That sounds really promising. Any challenges so far?',
      "I'd love to hear more. Do you want to connect on LinkedIn?",
      'Perfect. It was great talking to you — enjoy the rest of the event!',
    ],
    suggestions: [
      ['I found it really inspiring.', 'Honestly, it was a bit long.'],
      ["I'm here to learn about AI tools.", 'My company sent me, actually.'],
      ["I'm building a mobile app for language learners.", 'Mostly backend work.'],
      ['Finding time is the hardest part.', 'Scaling has been tricky.'],
      ["Sure, I'd like that.", "Absolutely, let's keep in touch."],
    ],
    tips: [
      'Açık uçlu sorular ("What kind of…?") sohbeti derinleştirir.',
      'Sohbeti kapatırken "It was great talking to you" demek kibar ve yaygındır.',
    ],
  },
];

export function getScenario(id: string | undefined) {
  return scenarios.find((scenario) => scenario.id === id);
}
