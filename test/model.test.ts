import { ERRORS } from "../src/errors";
import { Model } from "../src/structures/model";
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

    model.addStates(stateA, stateB, stateC);

    model.setInitialState("B");

    expect(model.getInitialState()).toBe(stateB);
  });

  test("add 2 states and add another one as initial", () => {
    const model = new Model();

    const stateA = new State("A");
    const stateB = new State("B");
    const stateC = new State("C");

    model.addStates(stateA, stateB);

    model.setInitialState(stateC);

    expect(model.getInitialState()).toBe(stateC);
  });

  test("setting an initial state with an incorrect identifier should be an error", () => {
    const model = new Model();

    const stateA = new State("A");
    const stateB = new State("B");

    model.addStates(stateA, stateB);

    expect(() => model.setInitialState("C")).toThrowError(
      ERRORS.PARAMS.STATE_WITH_IDENTIFIER_NOT_FOUND
    );
  });
});
