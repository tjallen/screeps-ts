import * as _  from 'lodash';
import * as Config from './../config';
import * as Utils from './../utils';
import Roles from './../roles';

export function run(creeps : object): void {
  // fire role.run() for each creep
  _.forEach(creeps, (creep: Creep) => {
    // console.log('=>', creep)
    // creep.suicide()
    if ((!creep.memory.role) || (!Roles.hasOwnProperty(creep.memory.role))) {
      console.log(`[ERR] attempting role.run(): No role in memory or unknown role [${creep.name} in ${creep.pos.roomName}]`)
    } else {
      Roles[creep.memory.role].run(creep);
    }
  });
}
