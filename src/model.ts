import { State } from "./state";

export class Model {
  private states: Set<State>;

  constructor() {
    this.states = new Set<State>();
  }
  public addState(state: State) {
    this.states.add(state);
  }

  public hasState(name: string): boolean {
    for (const currentState of this.states) {
      if (currentState.name === name) {
        return true;
      }
    }
    return false;
  }
}
