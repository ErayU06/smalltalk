import type { NpcLook, RoleId, TargetLang } from '../types/scenario';

/**
 * Karakter kadrosu (docs/ICERIK-KILAVUZU.md §3). Her rol her dilde o kültüre uygun bir isimle yer alır.
 * Cinsiyet ve yaş ses seçiminde kullanılır; `look` gerçek portre gelene kadar SVG avatarı seçer.
 */
type Name = { name: string; roman?: string };

interface Role {
  gender: 'f' | 'm';
  age: number;
  look: NpcLook;
  names: Record<TargetLang, Name>;
}

const n = (name: string, roman?: string): Name => ({ name, roman });

export const CAST: Record<RoleId, Role> = {
  barista: { gender: 'f', age: 25, look: 'barista', names: { en: n('Emma'), de: n('Lena'), fr: n('Camille'), ru: n('Аня', 'Ánya'), zh: n('小林', 'Xiǎo Lín'), ko: n('지우', 'Jiu') } },
  tourist: { gender: 'm', age: 35, look: 'tourist', names: { en: n('Alex'), de: n('Jonas'), fr: n('Hugo'), ru: n('Дима', 'Díma'), zh: n('小王', 'Xiǎo Wáng'), ko: n('민수', 'Minsu') } },
  professor: { gender: 'f', age: 55, look: 'professor', names: { en: n('Prof. Miller'), de: n('Prof. Wagner'), fr: n('Mme Laurent'), ru: n('Анна Сергеевна', 'Ánna Sergéyevna'), zh: n('陈老师', 'Chén lǎoshī'), ko: n('김 교수님', 'Kim gyosunim') } },
  receptionist: { gender: 'm', age: 35, look: 'receptionist', names: { en: n('Daniel'), de: n('Herr Becker'), fr: n('Julien'), ru: n('Максим', 'Maksím'), zh: n('小周', 'Xiǎo Zhōu'), ko: n('준호', 'Junho') } },
  cashier: { gender: 'f', age: 45, look: 'barista', names: { en: n('Linda'), de: n('Frau Schulz'), fr: n('Nathalie'), ru: n('Татьяна', 'Tatyána'), zh: n('刘阿姨', 'Liú āyí'), ko: n('은정', 'Eunjeong') } },
  waiter: { gender: 'm', age: 25, look: 'receptionist', names: { en: n('Tom'), de: n('Felix'), fr: n('Lucas'), ru: n('Артём', 'Artyóm'), zh: n('小张', 'Xiǎo Zhāng'), ko: n('현우', 'Hyeonu') } },
  neighbor: { gender: 'f', age: 65, look: 'professor', names: { en: n('Mrs. Carter'), de: n('Frau Richter'), fr: n('Mme Dubois'), ru: n('Галина Петровна', 'Galína Petróvna'), zh: n('王阿姨', 'Wáng āyí'), ko: n('박 여사님', 'Park yeosanim') } },
  pharmacist: { gender: 'm', age: 45, look: 'receptionist', names: { en: n('Mr. Patel'), de: n('Herr Neumann'), fr: n('M. Moreau'), ru: n('Сергей', 'Sergéy'), zh: n('赵先生', 'Zhào xiānsheng'), ko: n('성민', 'Seongmin') } },
  doctor: { gender: 'f', age: 45, look: 'professor', names: { en: n('Dr. Nguyen'), de: n('Dr. Hoffmann'), fr: n('Dr Petit'), ru: n('Елена Викторовна', 'Yeléna Víktorovna'), zh: n('周医生', 'Zhōu yīshēng'), ko: n('한 선생님', 'Han seonsaengnim') } },
  colleague: { gender: 'f', age: 28, look: 'barista', names: { en: n('Maya'), de: n('Sarah'), fr: n('Léa'), ru: n('Катя', 'Kátya'), zh: n('小陈', 'Xiǎo Chén'), ko: n('수아', 'Sua') } },
  interviewer: { gender: 'm', age: 45, look: 'receptionist', names: { en: n('Mr. Brooks'), de: n('Herr Krüger'), fr: n('M. Garnier'), ru: n('Игорь Викторович', 'Ígor Víktoroviç'), zh: n('黄经理', 'Huáng jīnglǐ'), ko: n('최 팀장님', 'Choi timjangnim') } },
  landlord: { gender: 'f', age: 55, look: 'professor', names: { en: n('Mrs. Evans'), de: n('Frau Weber'), fr: n('Mme Bernard'), ru: n('Ирина Николаевна', 'Irína Nikoláyevna'), zh: n('孙阿姨', 'Sūn āyí'), ko: n('윤 사장님', 'Yun sajangnim') } },
  'shop-assistant': { gender: 'f', age: 25, look: 'barista', names: { en: n('Chloe'), de: n('Mia'), fr: n('Inès'), ru: n('Настя', 'Nástya'), zh: n('小杨', 'Xiǎo Yáng'), ko: n('하은', 'Haeun') } },
  'ticket-agent': { gender: 'm', age: 55, look: 'tourist', names: { en: n('Gary'), de: n('Herr Vogel'), fr: n('M. Girard'), ru: n('Николай', 'Nikoláy'), zh: n('老马', 'Lǎo Mǎ'), ko: n('상훈', 'Sanghun') } },
  'airline-agent': { gender: 'f', age: 32, look: 'barista', names: { en: n('Rachel'), de: n('Julia'), fr: n('Manon'), ru: n('Алина', 'Alína'), zh: n('小许', 'Xiǎo Xǔ'), ko: n('유나', 'Yuna') } },
  'new-friend': { gender: 'm', age: 24, look: 'tourist', names: { en: n('Leo'), de: n('Max'), fr: n('Théo'), ru: n('Кирилл', 'Kiríll'), zh: n('李明', 'Lǐ Míng'), ko: n('도윤', 'Doyun') } },
  'phone-receptionist': { gender: 'f', age: 32, look: 'barista', names: { en: n('Jess'), de: n('Frau Braun'), fr: n('Mme Lefèvre'), ru: n('Марина', 'Marína'), zh: n('小何', 'Xiǎo Hé'), ko: n('민지', 'Minji') } },
};

/** Arayüzde gösterilecek isim: Latin olmayan alfabede okunuş parantez içinde. */
export function castName(role: RoleId, lang: TargetLang) {
  const { name, roman } = CAST[role].names[lang];
  return roman ? `${name} (${roman})` : name;
}
