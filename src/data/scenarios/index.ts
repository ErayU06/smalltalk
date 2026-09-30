import type { Scenario } from '../../types/scenario';
import { cafeOrder } from './cafe-order';
import { hotelLateCheckout, professorExtension, streetDirections } from './more';

export const scenarios: Scenario[] = [cafeOrder, streetDirections, professorExtension, hotelLateCheckout];

export const getScenario = (id: string) => scenarios.find((s) => s.id === id);
