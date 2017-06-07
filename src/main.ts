import * as SpawnManager from "./components/spawnManager";
import * as CreepManager from "./components/creepManager";

function mainLoop() {
  for (let i in Game.rooms) {
    const room: Room = Game.rooms[i];
    
    SpawnManager.run(room);
    CreepManager.run(room);
  }
}

export const loop = mainLoop;