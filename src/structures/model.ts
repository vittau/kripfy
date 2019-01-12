import { ERRORS } from "../errors";
import { Proposition } from "./proposition";
import { State } from "./state";

export class Model {
  private states: Set<State>;

  private initialState: State;

  private accessibility: Map<State, State[]>;

  private valuations: Map<State, Proposition[]>;

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
  public getState(identifier: string): State {
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

  public setInitialState(state: State | string): void {
    if (state instanceof State) {
      if (!this.hasState(state)) {
        this.addState(state);
      }
      this.initialState = state;
    } else if (typeof state === "string") {
      const actualState = this.getState(state);
      if (!actualState) {
        throw new Error(ERRORS.PARAMS.STATE_WITH_IDENTIFIER_NOT_FOUND);
      }
      this.setInitialState(actualState);
    }
  }

  public setValuations(valuations: Map<State, Proposition[]>): void {
    this.valuations = valuations;
  }

  public getValuations(state: State): Proposition[] {
    return this.valuations.get(state);
  }
}
