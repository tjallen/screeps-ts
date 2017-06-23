import * as _  from 'lodash';
import * as Config from '../config';
import Roles from './../roles';

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

export function debugInfo(room: Room, roomCreeps: object): void {
  if (Game.time % Config.DEBUG_THROTTLE === 0) {
    console.log('=========================');
    console.log(`${room} at ${Game.time}`);
      console.log(`${room.energyAvailable} / ${room.energyCapacityAvailable}e`);
      for (let role in Roles) {
        let max: number = Roles[role].count[room.controller.level];
        let current: number = (!roomCreeps || !roomCreeps[role]) ? 0 : roomCreeps[role].length;
        console.log(`${role}:[${current}/${max}]`);
      };
  };
};