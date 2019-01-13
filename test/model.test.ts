import { ERRORS } from "../src/errors";
import { Model } from "../src/structures/model";
import { Proposition } from "../src/structures/proposition";
import { State } from "../src/structures/state";

describe("model", () => {
  test("add state A and then retrieve it", () => {
    const model = new Model();

    const state = new State("A");

    model.addState(state);

    expect(model.hasState(state)).toBeTruthy();
    expect(model.getState("A")).toBe(state);
    expect(model.getState("B")).toBeNull();
  });

  test("add 3 states and set one as initial", () => {
    const model = new Model();

    const stateA = new State("A");
    const stateB = new State("B");
    const stateC = new State("C");

    model.setStates(stateA, stateB, stateC);

    model.setInitialState("B");

    expect(model.getInitialState()).toBe(stateB);
  });

  test("add 2 states and add another one as initial", () => {
    const model = new Model();

    const stateA = new State("A");
    const stateB = new State("B");
    const stateC = new State("C");

    model.setStates(stateA, stateB);

    model.setInitialState(stateC);

    expect(model.getInitialState()).toBe(stateC);
  });

  test("setting an initial state with an incorrect identifier should be an error", () => {
    const model = new Model();

    const stateA = new State("A");
    const stateB = new State("B");

    model.setStates(stateA, stateB);

    expect(() => model.setInitialState("C")).toThrowError(ERRORS.PARAMS.STATE_WITH_IDENTIFIER_NOT_FOUND);
  });

  test("add 2 states and filter the model removing one state", () => {
    const model = new Model();

    const stateA = new State("A");
    const stateB = new State("B");

    model.setStates(stateA);

    model.setInitialState(stateB);

    const fn = (state: State): boolean => {
      return state.getIdentifier() === "A";
    };

    const newModel = model.filter(fn);

    expect(newModel.getState("A")).toBeNull();
    expect(newModel.getState("B")).toBe(stateB);
  });

  test("add 2 states and another one as initial and filter the model removing the initial state", () => {
    const model = new Model();

    const stateA = new State("A");
    const stateB = new State("B");
    const stateC = new State("C");

    model.setStates(stateA, stateB);

    model.setInitialState(stateC);

    const fn = (state: State): boolean => {
      return state.getIdentifier() === "C";
    };

    const newModel = model.filter(fn);

    expect(newModel.getState("A")).toBe(stateA);
    expect(newModel.getState("B")).toBe(stateB);
    expect(newModel.getState("C")).toBeNull();
    expect(newModel.getInitialState()).toBeUndefined();
  });

  test("filtering should leave the original model unchanged", () => {
    const model = new Model();

    const stateA = new State("A");
    const stateB = new State("B");

    model.setStates(stateA);

    model.setInitialState(stateB);

    const fn = (state: State): boolean => {
      return state.getIdentifier() === "A";
    };

    model.filter(fn);

    expect(model.getState("A")).toBe(stateA);
    expect(model.getState("B")).toBe(stateB);
  });

  test("add 2 states and map them to states with different identifiers", () => {
    const model = new Model();

    const stateA = new State("A");
    const stateB = new State("B");

    model.setStates(stateA);

    model.setInitialState(stateB);

    const fn = (state: State, propositions: Proposition[]): { state: State; propositions: Proposition[] } => {
      return {
        propositions,
        state: new State(`new${state.getIdentifier()}`)
      };
    };

    const newModel = model.map(fn);

    expect(newModel.getState("newA")).toBeInstanceOf(State);
    expect(newModel.getState("newB")).toBeInstanceOf(State);
  });

  test("mapping should leave the original model unchanged", () => {
    const model = new Model();

    const stateA = new State("A");
    const stateB = new State("B");

    model.setStates(stateA);

    model.setInitialState(stateB);

    const fn = (state: State, propositions: Proposition[]): { state: State; propositions: Proposition[] } => {
      return {
        propositions,
        state: new State(`new${state.getIdentifier()}`)
      };
    };

    model.map(fn);

    expect(model.getState("A")).toBe(stateA);
    expect(model.getState("B")).toBe(stateB);
  });
});
