import * as _  from 'lodash';
import * as Config from './../config';
import * as Utils from './../utils';
import Roles from './../roles';

export function run(room: Room) {
  // fire role.run() for each creep in room based on creep.memory.role
  const creeps = room.find<Creep>(FIND_MY_CREEPS);
  _.forEach(creeps, (creep: Creep) => {
    if ((!creep.memory.role) || (!Roles.hasOwnProperty(creep.memory.role))) {
      console.log(`[ERR] attempting role.run(): No role in memory or unknown role [${creep.name} in ${creep.pos.roomName}]`)
    } else {
      Roles[creep.memory.role].run(creep);
    }
    // catch unknown role
  });
}