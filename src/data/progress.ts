// Mock learner data until a backend exists.

export const profile = {
  name: 'Deniz',
  targetLanguage: 'İngilizce',
  level: 'Orta (B1)',
  dailyGoalMinutes: 10,
};

export const progress = {
  streakDays: 5,
  todayMinutes: 6,
  sessionsCompleted: 18,
  week: [
    { day: 'Pzt', minutes: 8 },
    { day: 'Sal', minutes: 12 },
    { day: 'Çar', minutes: 0 },
    { day: 'Per', minutes: 10 },
    { day: 'Cum', minutes: 5 },
    { day: 'Cmt', minutes: 14 },
    { day: 'Paz', minutes: 6 },
  ],
  recent: [
    { scenarioId: 'coffee-shop', when: 'Bugün', score: 86 },
    { scenarioId: 'office-kitchen', when: 'Dün', score: 74 },
    { scenarioId: 'weather', when: '2 gün önce', score: 91 },
  ],
};
