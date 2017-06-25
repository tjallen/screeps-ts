export function fill (creep: Creep, target?: Spawn | Extension | Container | Storage): void | string {
  if (!target) target === creep.room.find(FIND_MY_SPAWNS)[0];
  if (creep.transfer(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
    creep.say(`fill move`);
    creep.moveTo(target);
    console.log(creep.name)
  } else {
    // console.log(creep, 'xfer',creep.transfer(target, RESOURCE_ENERGY));
    if (creep.transfer(target, RESOURCE_ENERGY) === ERR_FULL) {
      const dropPoint = new RoomPosition(target.pos.x, target.pos.y + 1, creep.pos.roomName);
      if (creep.pos.x === dropPoint.x && creep.pos.y === dropPoint.y) {
        console.log('=> ARRIVED', creep)
        creep.drop(RESOURCE_ENERGY);
        creep.say(`fill drop`);
        // console.log(creep, 'dropPoint move', creep.moveTo(dropPoint))
      } else {
        // console.log(creep.name, (JSON.stringify(creep.pos, null, 2)), (JSON.stringify(dropPoint, null, 2)))
        creep.moveTo(dropPoint);
        console.log('moving to drop')
      }
      
      
      
    }
  }
}