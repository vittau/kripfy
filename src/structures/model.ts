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

  public addState(state: State): void {
    this.states.add(state);
  }

  public addStates(...states: State[]): void {
    this.states = new Set(states);
  }

  public hasState(state: State): boolean {
    return this.states.has(state);
  }
  public getStateByIdentifier(identifier: string): State {
    for (const currentState of this.states) {
      if (currentState.getIdentifier() === identifier) {
        return currentState;
      }
    }
    return null;
  }

  public sizeStates(): number {
    return this.states.size;
  }

  public getInitialState(): State {
    return this.initialState;
  }

  public setInitialState(state: State): void {
    if (!this.hasState(state)) {
      this.addState(state);
    }
    this.initialState = state;
  }

  public setInitialStateByIdentifier(identifier: string): void {
    const state = this.getStateByIdentifier(identifier);
    if (!state) {
      throw new Error(ERRORS.PARAMS.STATE_WITH_IDENTIFIER_NOT_FOUND);
    }
    this.setInitialState(state);
  }
}
