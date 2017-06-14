import * as _  from 'lodash';

export function creepsByRole(role: string) {
  return _.filter<Creep>(Game.creeps, c => c.memory.role === role);
}

export function creepCountByRole(role: string) {
  return _.size(creepsByRole(role));
}