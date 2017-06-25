import { actions } from './../actions';
const module : any = {
  body: <string[]> [WORK, CARRY, MOVE],
  count: <object> {
    1: <number> 4,
    2: <number> 3,
    3: <number> 2,
    4: <number> 1,
  }
};
module.run = function run(creep: Creep): void {
  if (creep.carry.energy < creep.carryCapacity) {
    const sources = creep.room.find<Source>(FIND_SOURCES);
    const source: Source = creep.pos.findClosestByPath(sources);
    actions.harvest(creep, source);
  } else {
    const target = creep.room.find(FIND_MY_SPAWNS)[0];
    actions.fill(creep, target);
  }
}
export default module;