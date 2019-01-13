import { ERRORS } from "../errors";
import { Proposition } from "./proposition";
import { State } from "./state";

export class Model {
  private states: State[];

  private initialState: State;

  // TODO: Implement accessibility methods.
  private accessibility: Map<State, State[]>;

  private valuations: Map<State, Proposition[]>;

  constructor() {
    this.states = [];
    this.valuations = new Map<State, Proposition[]>();
  }

  public addState(state: State): void {
    this.states.push(state);
  }

  public setStates(...states: State[]): void {
    this.states = states;
  }

  public getState(identifier: string): State {
    for (const currentState of this.states) {
      if (currentState.getIdentifier() === identifier) {
        return currentState;
      }
    }
    return null;
  }

  public hasState(state: State): boolean {
    return !!this.states.find((value: State) => value === state);
  }

  public sizeStates(): number {
    return this.states.length;
  }

  public setInitialState(state: State | string): void {
    if (state instanceof State) {
      if (!this.hasState(state)) {
        this.addState(state);
      }
      this.initialState = state;
    } else {
      const actualState = this.getState(state);
      if (!actualState) {
        throw new Error(ERRORS.PARAMS.STATE_WITH_IDENTIFIER_NOT_FOUND);
      }
      this.setInitialState(actualState);
    }
  }

  public getInitialState(): State {
    return this.initialState;
  }

  public addValuations(state: State, propositions: Proposition[]): void {
    this.valuations.set(state, propositions);
  }

  public setValuations(valuations: Map<State, Proposition[]>): void {
    this.valuations = valuations;
  }

  public getValuations(state: State): Proposition[] {
    return this.valuations.get(state);
  }

  public filter(fn: (state: State, propositions: Proposition[]) => boolean): Model {
    const newModel = new Model();
    for (const state of this.states) {
      const valuations = this.valuations.get(state);
      if (!fn(state, valuations)) {
        newModel.addState(state);
        newModel.addValuations(state, valuations);
      }
      if (!fn(this.initialState, this.valuations.get(this.initialState))) {
        newModel.setInitialState(this.initialState);
      }
    }
    return newModel;
  }

  public map(fn: (state: State, propositions: Proposition[]) => { state: State; propositions: Proposition[] }): Model {
    const newModel = new Model();
    for (const state of this.states) {
      const valuations = this.valuations.get(state);
      const mapped = fn(state, valuations);
      newModel.addState(mapped.state);
      newModel.addValuations(mapped.state, mapped.propositions);
      if (this.initialState === state) {
        newModel.setInitialState(mapped.state);
      }
    }
    return newModel;
  }
}
