export enum counter {
  Decrement = 'decrement',
  Increment = 'increment',
  Reset = 'reset',
  Set = 'set',
  IncrementRandom = 'incrementRandom',
  IncrementToOdd = 'incrementToOdd',
}

export interface CounterAction {
  type: counter;
  data?: CounterState;
}

export interface CounterState {
  count: number;
}
