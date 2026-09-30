import type { ScenarioVariant } from '../../../types/scenario';

const en: ScenarioVariant = {
  locale: 'en-US',
  title: 'Ödev için ek süre iste',
  description: 'Hocanla çekinmeden, kibarca ve gerekçesiyle rica etme alıştırması.',
  placeLabel: 'Kampüs',
  mood: 'Ofis saati',
  pattern: { text: 'I was wondering if…', note: 'Resmî rica kalıbı · B1' },
  steps: [
    {
      id: 's1',
      kind: 'choice',
      npcLine: 'Come in! What can I do for you?',
      hint: { tr: 'Kibar ve saygılı bir açılış seç.' },
      prompt: 'Konuya gir:',
      options: [
        { text: 'Hi Professor, do you have a minute to talk about the essay?', correct: true, feedback: 'Saygılı ve net: önce zamanı var mı diye soruyorsun.' },
        { text: 'Hey, I need more time for the essay.', correct: false, near: true, feedback: 'Anlam doğru ama hocaya fazla direkt; önce "do you have a minute?" diye sor.' },
        { text: 'I want to talk about your weekend.', correct: false, feedback: 'Ofis saatinde ödevinle ilgili konuşmaya geldin.' },
      ],
    },
    {
      id: 's2',
      kind: 'speech',
      npcLine: 'Of course. Is this about the deadline on Friday?',
      hint: { tr: 'Evet de ve iki gün ek süre rica et.', example: 'Yes, I was wondering if…' },
      acceptedAnswers: [
        'Yes, I was wondering if I could have two more days.',
        'Yes, could I please ask for a two-day extension?',
        'Yes, would it be possible to get a short extension?',
      ],
      keywords: [['extension', 'more days', 'extra time', 'two days', 'two-day'], ['could', 'wondering', 'possible', 'may']],
      wordBank: ['I was wondering if', 'could I', 'a two-day extension'],
      why: 'Hocaya rica ederken "I was wondering if…" ya da "Could I…" kibar ve doğal.',
      mistakes: [{ match: '^(yes )?i want (more|extra|an extension)', tip: 'Hocaya "I want" demek fazla direkt; "I was wondering if I could…" dene.' }],
    },
    {
      id: 's3',
      kind: 'text',
      npcLine: 'I see. Can you tell me why you need more time?',
      hint: { tr: 'Kısa bir gerekçe ver: bu hafta hastaydın.', example: "I've been sick this week…" },
      acceptedAnswers: ["I've been sick this week, so I fell behind.", 'I was ill for a few days this week.', "I had the flu, so I couldn't finish it on time."],
      keywords: [['sick', 'ill', 'flu', 'unwell']],
      wordBank: ["I've been", 'sick', 'this week', 'fell behind'],
      why: 'Gerekçeyi kısa ve dürüst tutmak yeterli; uzun özür gerekmez.',
    },
    {
      id: 's4',
      kind: 'choice',
      npcLine: "Why didn't you let me know earlier?",
      hint: { tr: 'Özür dile ve bir dahaki sefere haber vereceğini söyle.' },
      prompt: 'Nazikçe cevap ver:',
      options: [
        { text: "You're right, I'm sorry. I'll email you sooner next time.", correct: true, feedback: 'Sorumluluk alıyorsun ve çözüm sunuyorsun; çok olgun bir cevap.' },
        { text: 'Because I was sick, I told you.', correct: false, near: true, feedback: 'Doğru ama savunmacı duyulabilir; önce kısa bir özür ekle.' },
        { text: 'The deadline is on Friday.', correct: false, feedback: 'Hoca teslim tarihini biliyor; neden önceden haber vermediğini soruyor.' },
      ],
    },
    {
      id: 's5',
      kind: 'speech',
      npcLine: "Okay, you can hand it in on Sunday. Feeling better now?",
      hint: { tr: 'Teşekkür et ve daha iyi olduğunu söyle.', example: 'Thank you so much, yes…' },
      acceptedAnswers: ["Thank you so much! Yes, I'm feeling much better.", "Thanks a lot, I'm much better now.", 'Yes, thank you, I really appreciate it.'],
      keywords: [['thank', 'thanks', 'appreciate'], ['better', 'yes']],
      wordBank: ['Thank you so much', "I'm feeling", 'much better', 'I really appreciate it'],
      why: '"I really appreciate it" teşekkürü güçlendirir.',
    },
  ],
  vocab: [
    { text: 'Do you have a minute?', tr: 'Bir dakikanız var mı?' },
    { text: 'I was wondering if…', tr: 'Acaba … diye düşünüyordum' },
    { text: 'an extension', tr: 'ek süre' },
    { text: 'fall behind', tr: 'geride kalmak' },
    { text: 'hand in', tr: 'teslim etmek' },
  ],
  curveballs: ['Have you started writing it at all?'],
};

export default en;
