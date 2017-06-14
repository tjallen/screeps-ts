// true enables screeps-profiler
export const ENABLE_PROFILER: boolean = true;
// true enables debug msgs
export const ENABLE_DEBUG: boolean = true;
// generic worker count
// TODO move to worker.ts
// TODO edit count depending on sources & available tiles
export const CREEP_COUNT_WORKER: object = {
  RCL: {
    1: 4,
    2: 3,
    3: 2,
    4: 1,
  }
};
// generic worker body
// TODO multiply body size depending on RCL / energy avail
export const BODY_WORKER: string[] = [WORK, CARRY, MOVE];