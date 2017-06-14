import * as _  from 'lodash';
import * as Config from './../config';

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
    spawn.createCreep(parts, null, { role: role });
  } else {
    if (Config.ENABLE_DEBUG) {
      console.log('sRC() failed creating new creep', spawnStatus)
    }
  }
}

export function run(room: Room) {
  console.log(`spawnManager() running in ${room} ${room.energyAvailable}/${room.energyCapacityAvailable}e`);
  // TODO check creep counts in room vs config counts
  // check room energy available, if its enough spawn creeps
  if (room.energyAvailable === room.energyCapacityAvailable) {
    spawnRequiredCreep(availableSpawns(room)[0], Config.BODY_WORKER, 'worker');
  }
}