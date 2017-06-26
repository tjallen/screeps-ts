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
  // run creep manager for each creep
  CreepManager.run(Game.creeps);
  // run room-specific stuff
  for (let i in Game.rooms) {
    // source mineable spots for future use
/*    const sources = Game.rooms[i].find<Source>(FIND_SOURCES);
    sources.forEach(s => {
      const terrain = s.room.lookForAtArea(LOOK_TERRAIN, s.pos.y-1, s.pos.x-1, s.pos.y+1, s.pos.x+1, true);
      const spots = _.filter(terrain, (tile) => {
        return tile.terrain === 'plain' || tile.terrain === 'swamp';
      });
      console.log(s.id, s.energy, spots.length);
    });*/
    let room: Room = Game.rooms[i];
    let roomCreeps: object = ALL_CREEPS_SORTED[room.name];
    SpawnManager.run(room, roomCreeps);
    if (Config.ENABLE_DEBUG && Game.time % Config.DEBUG_THROTTLE === 0) Utils.debugInfo(room, roomCreeps);
  }
}

export const loop = Config.ENABLE_PROFILER ? Profiler.wrap(mainLoop) : mainLoop;