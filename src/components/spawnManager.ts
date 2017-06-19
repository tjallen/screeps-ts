import * as _  from 'lodash';
import * as Config from './../config';
import * as Utils from './../utils';
import Roles from './../roles';

function availableSpawns(room: Room) {
  const spawns = room.find<Spawn>(FIND_MY_SPAWNS, {
    filter: (spawn: Spawn) => {
      return spawn.spawning === null;
    }
  });
  console.log(`availableSpawns() ${spawns.length} spawns available`)
  return spawns;
}

function spawnRequiredCreep(spawn: Spawn, parts: string[], role: string) {
  console.log('spawnRequiredCreep()', spawn, parts, role)
  const spawnStatus: number | string = spawn.canCreateCreep(parts, undefined);
  if (spawnStatus === OK) {
    spawn.createCreep(
      parts,
      null,
      {
        role: role,
        spawnRoom: spawn.pos.roomName,
      }
    );
  } else {
    if (Config.ENABLE_DEBUG) {
      console.log('sRC() failed creating new creep', spawnStatus)
    }
  }
}

export function run(room: Room, roomCreeps: object | undefined) {
  // console.log(`spawnManager() running in ${room} ${room.energyAvailable}/${room.energyCapacityAvailable}e`);
  
  // TODO check creep counts in room vs config counts
  if (roomCreeps === undefined) // any preemptive emergency spawn stuff
  for (let role in Roles) {
    // console.log('!', JSON.stringify(Roles[role], null, 2));
    let max: number = Roles[role].count[room.controller.level];
    let current: number = (!roomCreeps || !roomCreeps[role]) ? 0 : roomCreeps[role].length;
    console.log(`===> ${room} ${role}:[${current}/${max}]`);
    if (current < max) {
      spawnRequiredCreep(availableSpawns(room)[0], Roles[role].body, role);
    }
  }
  // // check room energy available, if its enough spawn creeps
  // if (room.energyAvailable === room.energyCapacityAvailable) {
  //   
  // }
}