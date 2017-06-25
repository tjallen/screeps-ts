import * as _  from 'lodash';
import * as Config from './../config';
import * as Utils from './../utils';
import Roles from './../roles';

function availableSpawns(room: Room): Spawn[] {
  const spawns: Spawn[] = room.find<Spawn>(FIND_MY_SPAWNS, {
    filter: (spawn: Spawn) => {
      return spawn.spawning === null;
    }
  });
  // console.log(`availableSpawns() ${spawns.length} spawns available`);
  return spawns;
}

function spawnRequiredCreep(room: Room, parts: string[], role: string): void {
  const spawns = availableSpawns(room);
  if (spawns.length === 0) {
    // console.log(`sRC() no spawns currently available, probably busy. returning`);
    return;
  }
  const spawn = spawns[0];
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

export function run(room: Room, roomCreeps: object | undefined): void {
  // check creep counts in room vs config counts
  for (let role in Roles) {
    let max: number = Roles[role].count[room.controller.level];
    let current: number = (!roomCreeps || !roomCreeps[role]) ? 0 : roomCreeps[role].length;
    if (current < max) {
      spawnRequiredCreep(room, Roles[role].body, role);
    }
  }
}