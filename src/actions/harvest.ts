export function harvest (creep: Creep, source: Source): void {
  creep.say(`harvest`);
  if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
    creep.moveTo(source);
  }
}