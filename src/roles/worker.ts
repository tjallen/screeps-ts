const module : any = {
  body: <string[]> [WORK, CARRY, MOVE],
  count: <object> {
    1: <number> 4,
    2: <number> 3,
    3: <number> 2,
    4: <number> 1,
  }
};
module.run = function run(creep: Creep) {
  creep.say(`worker`);
}
export default module;