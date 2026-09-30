import type { ScenarioVariant } from '../../../types/scenario';

const en: ScenarioVariant = {
  locale: 'en-GB',
  title: 'Metroyu sor, kestirme yol iste',
  description: 'Yoldan geçen birine yön tarif etme ve mesafe söyleme alıştırması.',
  placeLabel: 'Londra',
  mood: 'Haritada kararsız görünüyor',
  place: 'Oxford St.',
  pattern: { text: 'Go straight and turn right at the lights.', note: 'Yol tarifi kalıbı · A2' },
  steps: [
    {
      id: 's1',
      kind: 'choice',
      npcLine: "Excuse me, sorry to bother you. Are you from around here?",
      hint: { tr: 'Yardım etmeye hazır olduğunu gösteren şıkkı seç.' },
      prompt: 'Nazikçe cevap ver:',
      options: [
        { text: 'Sort of! Can I help you find something?', correct: true, feedback: 'Samimi ve yardımsever; sohbeti sen açıyorsun.' },
        { text: 'Yes. What do you want?', correct: false, near: true, feedback: 'Anlamı doğru ama sert duyulabilir; "Can I help?" daha sıcak.' },
        { text: "No, I'm from the future.", correct: false, feedback: 'Eğlenceli ama kişi gerçekten yardım istiyor.' },
      ],
    },
    {
      id: 's2',
      kind: 'text',
      npcLine: "I'm looking for the nearest Tube station. Do you know where it is?",
      hint: { tr: 'Düz gitmesini ve ışıklardan sağa dönmesini söyle.', example: 'Go straight and turn right at…' },
      acceptedAnswers: [
        'Go straight and turn right at the traffic lights.',
        'Go straight for two blocks, then turn right at the lights.',
        'Walk straight on and turn right at the lights.',
      ],
      keywords: [['straight'], ['right', 'left'], ['at the lights', 'at the traffic lights', 'at the corner', 'lights', 'corner']],
      wordBank: ['Go straight', 'turn right', 'at the lights', 'on the corner'],
      why: 'Dönülen noktalar için "at" kullanılır: at the corner, at the lights.',
      mistakes: [
        { match: '(turn|turning) (right|left) in the', tip: 'Dönülen noktalar için "in" değil "at" kullanılır: turn right at the lights.' },
        { match: 'go direct', tip: '"Go direct" yerine "go straight" denir.' },
      ],
    },
    {
      id: 's3',
      kind: 'speech',
      npcLine: 'Brilliant, thanks! Is it far from here?',
      hint: { tr: 'Yürüyerek kaç dakika olduğunu söyle.', example: "It's about five minutes…" },
      acceptedAnswers: ["It's about five minutes on foot.", "No, it's just five minutes away.", "Not far, about a five-minute walk.", "It's really close, maybe five minutes."],
      keywords: [['minute', 'minutes', 'close', 'near', 'far', 'walk']],
      wordBank: ["It's about…", 'on foot', 'not far', 'a five-minute walk'],
      why: 'Mesafe için "It\'s about five minutes on foot" en doğal kalıp.',
    },
    {
      id: 's4',
      kind: 'choice',
      npcLine: 'And which line goes to King’s Cross?',
      hint: { tr: 'Emin değilsen bunu kibarca söyleyen şıkkı seç.' },
      prompt: 'Emin değilsin; ne dersin?',
      options: [
        { text: "I'm not sure, but there's a map inside the station.", correct: true, feedback: 'Emin olmadığını dürüstçe söyleyip yol gösteriyorsun.' },
        { text: "I don't know.", correct: false, near: true, feedback: 'Doğru ama kısa ve soğuk; "I\'m not sure, but…" daha yardımsever.' },
        { text: 'Take the bus to the airport.', correct: false, feedback: 'Havalimanı sorulmadı; soru hangi hattın King\'s Cross\'a gittiği.' },
      ],
    },
    {
      id: 's5',
      kind: 'speech',
      npcLine: "No worries, I'll check. Cheers for your help!",
      hint: { tr: 'Rica ederim de, iyi yolculuklar dile.', example: 'No problem, enjoy…' },
      acceptedAnswers: ['No problem, enjoy your day!', "You're welcome, have a good trip!", 'No worries, enjoy London!', 'Anytime, good luck!'],
      keywords: [['no problem', 'no worries', 'welcome', 'anytime'], ['enjoy', 'good', 'luck', 'trip', 'day']],
      wordBank: ['No problem', 'enjoy your day', 'good luck'],
      why: '"Cheers" burada teşekkür; "No worries" ya da "No problem" doğal karşılık.',
    },
  ],
  vocab: [
    { text: 'Go straight', tr: 'Düz git' },
    { text: 'turn right at the lights', tr: 'ışıklardan sağa dön' },
    { text: 'on foot', tr: 'yürüyerek' },
    { text: "I'm not sure, but…", tr: 'Emin değilim ama…' },
    { text: 'Cheers!', tr: '(İngiltere) Teşekkürler!' },
  ],
  curveballs: ['Is it quicker to walk or take the bus?'],
};

export default en;
