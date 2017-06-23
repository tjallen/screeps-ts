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
    console.log('<span style="color: slategray">=========================</span>');
    console.log(`<span style="font-size: 16px;color: springgreen">${room} at ${Game.time}</span>`);
    console.log('<span style="color: cornflowerblue">CONTROLLER</span>');
    console.log(`Level ${room.controller.level}`);
    console.log(`Progress ${room.controller.progress}/${room.controller.progressTotal} (${room.controller.progress / room.controller.progressTotal}%)`);
    if (room.controller.ticksToDowngrade < 20000) console.log(`<span style="color: tomato">Downgrade in ${room.controller.ticksToDowngrade} ticks</span>`);
    console.log('<span style="color: cornflowerblue">STRUCTURES</span>');
    console.log(`Energy ${room.energyAvailable} / ${room.energyCapacityAvailable} capacity`);
    console.log('<span style="color: cornflowerblue">CREEPS</span>');
      for (let role in Roles) {
        let max: number = Roles[role].count[room.controller.level];
        let current: number = (!roomCreeps || !roomCreeps[role]) ? 0 : roomCreeps[role].length;
        console.log(`${role}: [${current}/${max}]`);
      };
  };
};