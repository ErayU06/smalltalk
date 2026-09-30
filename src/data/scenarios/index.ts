import type { Scenario, ScenarioDef, TargetLang } from '../../types/scenario';
import { CAST, castName } from '../cast';
import airportCheckin from './airport-checkin';
import cafeOrder from './cafe-order';
import campusExtension from './campus-extension';
import clothesShop from './clothes-shop';
import doctorVisit from './doctor-visit';
import flatViewing from './flat-viewing';
import groupProject from './group-project';
import hotelLateCheckout from './hotel-late-checkout';
import jobInterview from './job-interview';
import neighborElevator from './neighbor-elevator';
import officeSmallTalk from './office-small-talk';
import partyMingle from './party-mingle';
import pharmacy from './pharmacy';
import phoneAppointment from './phone-appointment';
import politeComplaint from './polite-complaint';
import restaurantOrder from './restaurant-order';
import selfIntro from './self-intro';
import streetDirections from './street-directions';
import supermarket from './supermarket';
import transitTicket from './transit-ticket';

/** Kılavuzdaki sırayla: 12 ücretsiz, sonra 8 Pro */
export const DEFS: ScenarioDef[] = [
  cafeOrder, selfIntro, neighborElevator, streetDirections, supermarket, restaurantOrder,
  transitTicket, campusExtension, pharmacy, clothesShop, phoneAppointment, groupProject,
  hotelLateCheckout, airportCheckin, officeSmallTalk, jobInterview, doctorVisit, politeComplaint,
  partyMingle, flatViewing,
];

function resolve(def: ScenarioDef, lang: TargetLang): Scenario | undefined {
  const v = def.variants[lang];
  if (!v) return undefined;
  const role = CAST[def.skeleton.role];
  const { mood, place, ...variant } = v;
  return {
    ...def.skeleton,
    ...variant,
    lang,
    npc: { name: castName(def.skeleton.role, lang), mood, place, look: role.look, gender: role.gender, age: role.age },
  };
}

/** Seçilen dilde içeriği olan senaryolar */
export function getScenarios(lang: TargetLang): Scenario[] {
  return DEFS.map((d) => resolve(d, lang)).filter((s): s is Scenario => !!s);
}

export function getScenario(id: string, lang: TargetLang): Scenario | undefined {
  const def = DEFS.find((d) => d.skeleton.id === id);
  return def && resolve(def, lang);
}

/** İlerleme ve tekrar kuyruğu dil bazında tutulur: "cafe-order:de" */
export const progressKey = (id: string, lang: TargetLang) => `${id}:${lang}`;

export function contentCount(lang: TargetLang) {
  const list = getScenarios(lang);
  return { total: list.length, free: list.filter((s) => !s.isPremium).length };
}
