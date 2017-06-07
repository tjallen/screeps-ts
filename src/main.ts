import * as Config from './config';
import * as SpawnManager from './components/spawnManager';
import * as CreepManager from './components/creepManager';
import * as Profiler from 'screeps-profiler';

if (Config.ENABLE_PROFILER) {
  Profiler.enable();
}

function mainLoop() {
  for (let i in Game.rooms) {
    const room: Room = Game.rooms[i];
    
    SpawnManager.run(room);
    CreepManager.run(room);
  }
}

export const loop = Config.ENABLE_PROFILER ? Profiler.wrap(mainLoop) : mainLoop;