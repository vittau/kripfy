import { Accessibility } from "./accessibility";
import { State } from "./state";
import { Valuation } from "./valuation";

export class Model {
  private states: Set<State>;

  private initialState: State;

  private accessibility: Accessibility;

  private valuation: Valuation;

  constructor() {
    this.states = new Set<State>();
  }

  public addState(state: State) {
    this.states.add(state);
  }

  public addStates(states: Set<State>) {
    this.states = new Set(states);
  }

  public hasState(state: State) {
    return this.states.has(state);
  }
  public hasStateByIdentifier(identifier: string) {
    for (const currentState of this.states) {
      if (currentState.getIdentifier() === identifier) {
        return true;
      }
    }
    return false;
  }

  public sizeStates() {
    return this.states.size;
  }
}
