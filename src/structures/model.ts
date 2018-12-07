import { ERRORS } from "../errors";
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

  public addStates(...states: State[]) {
    this.states = new Set(states);
  }

  public hasState(state: State) {
    return this.states.has(state);
  }
  public getStateByIdentifier(identifier: string) {
    for (const currentState of this.states) {
      if (currentState.getIdentifier() === identifier) {
        return currentState;
      }
    }
    return null;
  }

  public sizeStates() {
    return this.states.size;
  }

  public getInitialState() {
    return this.initialState;
  }

  public setInitialState(state: State) {
    if (!this.hasState(state)) {
      this.addState(state);
    }
    this.initialState = state;
  }

  public setInitialStateByIdentifier(identifier: string) {
    const state = this.getStateByIdentifier(identifier);
    if (!state) {
      throw new Error(ERRORS.PARAMS.STATE_WITH_IDENTIFIER_NOT_FOUND);
    }
    this.setInitialState(state);
  }
}
