import * as _  from 'lodash';

export function creepsByRole(role: string) {
  return _.filter<Creep>(Game.creeps, c => c.memory.role === role);
}

export function creepCountByRole(role: string) {
  return _.size(creepsByRole(role));
}

// multi-level groupBy
// https://gist.github.com/joyrexus/9837596
export function nestedGroupBy(arr: any, keys: string[]) {
    if (!keys.length) { return arr; }
    let [ first, ...rest ] = keys;
    return _.mapValues(_.groupBy(arr, first), value => nestedGroupBy(value, rest));
};