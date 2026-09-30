import type { ScenarioVariant } from '../../../types/scenario';

const en: ScenarioVariant = {
  locale: 'en-US',
  title: 'Mülakatta kendinden bahset',
  description: 'Deneyimini özetleme, zor soruyu karşılama ve güçlü kapanış provası.',
  placeLabel: 'Toplantı odası',
  mood: 'Sakin ama dikkatli işe alım yöneticisi',
  pattern: { text: "I've been working as… for…", note: 'Deneyim anlatma · B2' },
  steps: [
    {
      id: 's1',
      kind: 'choice',
      npcLine: 'Thanks for coming in. Did you find us okay?',
      hint: { tr: 'Isınma sorusu: kısa ve olumlu cevap ver.' },
      prompt: 'Isınma sorusuna cevap ver:',
      options: [
        { text: 'Yes, no problem at all. Thanks for having me.', correct: true, feedback: 'Kısa, olumlu ve kibar; iyi bir ilk izlenim.' },
        { text: 'Yes. The traffic was terrible and the metro was late.', correct: false, near: true, feedback: 'Dürüst ama şikâyetle başlamak ilk izlenimi zayıflatır.' },
        { text: 'I found you on the internet.', correct: false, feedback: 'Soru yolu kolay bulup bulmadığın, ilanı nerede gördüğün değil.' },
      ],
    },
    {
      id: 's2',
      kind: 'speech',
      npcLine: 'So, tell me a little about yourself.',
      hint: { tr: 'Üç yıldır yazılım geliştirici olarak çalıştığını söyle.', example: "I've been working as…" },
      acceptedAnswers: [
        "I've been working as a software developer for three years.",
        "I'm a software developer with three years of experience.",
        "For the past three years, I've worked as a developer.",
      ],
      keywords: [['developer', 'engineer', 'designer', 'marketing', 'analyst'], ['years', 'year', 'experience']],
      wordBank: ["I've been working as", 'a software developer', 'for three years'],
      why: 'Süren bir iş için "I\'ve been working as… for…" kullanılır.',
      mistakes: [
        { match: 'since (two|three|four|five|2|3|4|5) years', tip: 'Süre için "since" değil "for" kullanılır: for three years.' },
        { match: '^i am working (as .* )?since', tip: 'Süregelen iş için "I\'ve been working… for/since…" daha doğal.' },
      ],
    },
    {
      id: 's3',
      kind: 'text',
      npcLine: 'Why are you interested in this position?',
      hint: { tr: 'Takım çalışmasını ve öğrenme fırsatını sevdiğini söyle.', example: "I'm excited about…" },
      acceptedAnswers: [
        "I'm excited about the team and the chance to learn new things.",
        'I really like your products and I want to grow with the team.',
        'I’m looking for a role where I can learn and work with a strong team.',
      ],
      keywords: [['team', 'learn', 'grow', 'products', 'company'], ['excited', 'like', 'love', 'interested', 'looking for']],
      wordBank: ["I'm excited about", 'the team', 'the chance to learn'],
      why: '"I\'m excited about…" motivasyonu olumlu ve samimi anlatır.',
    },
    {
      id: 's4',
      kind: 'choice',
      npcLine: "What would you say is your biggest weakness?",
      hint: { tr: 'Dürüst bir zayıf yön ve onu nasıl geliştirdiğini anlatan şıkkı seç.' },
      prompt: 'Zor soruya cevap ver:',
      options: [
        { text: "I used to take on too much, so now I plan my week more carefully.", correct: true, feedback: 'Dürüst + gelişim: mülakatta en güçlü cevap yapısı.' },
        { text: "I don't have any weaknesses.", correct: false, near: true, feedback: 'Kendinden emin ama inandırıcı değil; küçük bir zayıf yön ve çözümü daha güçlü.' },
        { text: 'My weakness is Monday mornings, haha.', correct: false, feedback: 'Espri anlaşılır ama soruya ciddi bir cevap bekleniyor.' },
      ],
    },
    {
      id: 's5',
      kind: 'speech',
      npcLine: "Great. That's all from me. Do you have any questions for us?",
      hint: { tr: 'Takımın nasıl çalıştığını sor.', example: 'Yes, could you tell me…' },
      acceptedAnswers: ['Yes, could you tell me a bit about how the team works?', "What does a typical day look like on the team?", 'Could you tell me more about the team?'],
      keywords: [['team', 'typical day', 'day'], ['could you', 'what', 'how', 'tell me']],
      wordBank: ['Could you tell me', 'about the team', 'a typical day'],
      why: 'Soru sormak ilgini gösterir; "Could you tell me…" kibar bir açılış.',
    },
    {
      id: 's6',
      kind: 'speech',
      npcLine: 'We’ll be in touch by Friday. Thanks again for coming!',
      hint: { tr: 'Zaman ayırdığı için teşekkür et ve iyi günler dile.', example: 'Thank you for your time…' },
      acceptedAnswers: ['Thank you for your time. Have a great day!', 'Thanks for having me, I look forward to hearing from you.', 'Thank you, it was great to meet you.'],
      keywords: [['thank', 'thanks'], ['time', 'having me', 'meet', 'day', 'hearing']],
      wordBank: ['Thank you for your time', 'I look forward to', 'hearing from you'],
      why: '"Thank you for your time" mülakatın klasik ve güçlü kapanışı.',
    },
  ],
  vocab: [
    { text: 'Thanks for having me', tr: 'Beni ağırladığınız için teşekkürler' },
    { text: "I've been working as…", tr: '… olarak çalışıyorum (bir süredir)' },
    { text: "I'm excited about…", tr: '… için heyecanlıyım' },
    { text: 'weakness', tr: 'zayıf yön' },
    { text: 'I look forward to hearing from you', tr: 'Haberlerinizi bekliyorum' },
  ],
  curveballs: ['Where do you see yourself in five years?'],
};

export default en;
