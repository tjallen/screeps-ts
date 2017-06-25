import * as _  from 'lodash';
import * as Config from './config';
import * as SpawnManager from './components/spawnManager';
import * as CreepManager from './components/creepManager';
import * as Profiler from 'screeps-profiler';
import * as Utils from './utils';

if (Config.ENABLE_PROFILER) {
  Profiler.enable();
}

function mainLoop(): void {
  // top level creeps object, nested tree by room > role > creeps
  const ALL_CREEPS_SORTED: object = Utils.nestedGroupBy(Game.creeps, ['memory.spawnRoom', 'memory.role']);
  // console.log(JSON.stringify(ALL_CREEPS_SORTED, null, 2))
  // run creep manager for each creep
  CreepManager.run(Game.creeps);
  // run spawn manager for each room
  for (let i in Game.rooms) {
    let room: Room = Game.rooms[i];
    let roomCreeps: object = ALL_CREEPS_SORTED[room.name];
    SpawnManager.run(room, roomCreeps);
    if (Config.ENABLE_DEBUG) Utils.debugInfo(room, roomCreeps);
  }
}

export const loop = Config.ENABLE_PROFILER ? Profiler.wrap(mainLoop) : mainLoop;