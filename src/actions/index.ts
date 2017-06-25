import { harvest } from './harvest';
import { fakeAction } from './fakeAction';
interface Actions {
  harvest(creep: Creep): void;
  fakeAction(creep: Creep): void;
};
export const actions : Actions = {
  harvest,
  fakeAction,
};