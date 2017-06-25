import { harvest } from './harvest';
import { fill } from './fill';
interface Actions {
  harvest(creep: Creep, source: Source): void;
  fill(creep: Creep, target?: any): void;
};
export const actions : Actions = {
  harvest,
  fill,
};