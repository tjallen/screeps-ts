import { actions } from './../actions';
const module : any = {
  body: <string[]> [MOVE],
  count: <object> {
    1: <number> 1,
    2: <number> 1,
    3: <number> 1,
    4: <number> 1,
  }
};
module.run = function run(creep: Creep) {
  actions.fakeAction(creep);
}
export default module;