import * as _  from 'lodash';
import * as Config from './../config';
import * as Utils from './../utils';
import Roles from './../roles';

function garbageCollection(creeps): void {
  // clear dead creeps from Memory
  for (let index in Memory.creeps) {
    if (!creeps[index]) {
      delete Memory.creeps[index];
    }
  }
}

export function run(creeps : object): void {
  if (Game.time % Config.GARBAGE_COLLECTION_THROTTLE === 0) garbageCollection(creeps);
  // fire role.run() for each creep
  _.forEach(creeps, (creep: Creep, index) => {
    // creep.suicide()
    if ((!creep.memory.role) || (!Roles.hasOwnProperty(creep.memory.role))) {
      console.log(`[ERR] attempting role.run(): No role in memory or unknown role [${creep.name} in ${creep.pos.roomName}]`)
    } else {
      Roles[creep.memory.role].run(creep);
    }
  });
}
