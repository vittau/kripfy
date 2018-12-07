import { Accessibility } from "./accessibility";
import { State } from "./state";
import { Valuation } from "./valuation";

export class Model {
  private states: Set<State>;

  private initialState: State;

  private accessibility: Accessibility;

  private valuation: Valuation;

  constructor(states: Set<State> = new Set<State>()) {
    this.states = states;
  }

  public addState(state: State) {
    this.states.add(state);
  }

  public hasState(state: State): boolean {
    return this.states.has(state);
  }
  public hasStateByIdentifier(identifier: string): boolean {
    for (const currentState of this.states) {
      if (currentState.getIdentifier() === identifier) {
        return true;
      }
    }
    return false;
  }

  public sizeStates(): number {
    return this.states.size;
  }
}
