export function fill (creep: Creep, target?: Spawn | Extension | Container | Storage): void | string {
  if (!target) target === creep.room.find(FIND_MY_SPAWNS)[0];
  if (creep.transfer(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
    creep.say(`mov->fill`);
    creep.moveTo(target);
  } else {
    if (creep.transfer(target, RESOURCE_ENERGY) === ERR_FULL) {
      const dropPoint = new RoomPosition(target.pos.x, target.pos.y + 1, creep.pos.roomName);
      if (creep.pos.x === dropPoint.x && creep.pos.y === dropPoint.y) {
        creep.drop(RESOURCE_ENERGY);
        creep.say(`dropped`);
      } else {
        creep.moveTo(dropPoint);
        creep.say('mov->drop')
      }
    }
  }
}