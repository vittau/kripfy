import { ERRORS } from "../src/errors";
import { Kripfy } from "../src/kripfy";
import { Proposition } from "../src/structures/proposition";
import { State } from "../src/structures/state";

const kripfy = new Kripfy();
const NUM_STATES = 3;
const PROPOSITIONS = ["a", "b", "c"];

const PROP_LABEL_MAPPER = (i: Proposition): string => i.getLabel();

describe("kripfy", () => {
  test("create model with no options should contain 0 states", () => {
    const model = kripfy.createModel();

    expect(model.sizeStates()).toBe(0);
  });

  test(`create model with ${NUM_STATES} states should contain ${NUM_STATES} states`, () => {
    const PARAMS = {
      states: NUM_STATES
    };
    const model = kripfy.createModel(PARAMS);

    expect(model.sizeStates()).toBe(NUM_STATES);
    for (let i = 1; i <= NUM_STATES; i++) {
      expect(model.getState(`s${NUM_STATES}`)).toBeInstanceOf(State);
    }
  });

  test(`create model with propositions "a", "b", "c" should contain exactly states "_", "a", "b", "c", "ab", "ac", "bc", "abc"`, () => {
    const PARAMS = {
      propositions: PROPOSITIONS
    };
    const model = kripfy.createModel(PARAMS);

    expect(model.sizeStates()).toBe(8);
    expect(model.getState("_")).toBeInstanceOf(State);
    expect(model.getState("a")).toBeInstanceOf(State);
    expect(model.getState("b")).toBeInstanceOf(State);
    expect(model.getState("c")).toBeInstanceOf(State);
    expect(model.getState("ab")).toBeInstanceOf(State);
    expect(model.getState("ac")).toBeInstanceOf(State);
    expect(model.getState("bc")).toBeInstanceOf(State);
    expect(model.getState("abc")).toBeInstanceOf(State);
  });

  test(`create model with propositions "a", "b", "c" should contain state "bc" with propositions "b", "c"`, () => {
    const PARAMS = {
      propositions: PROPOSITIONS
    };
    const model = kripfy.createModel(PARAMS);

    const state = model.getState("bc");
    const valuations = model.getValuations(state).map(PROP_LABEL_MAPPER);

    expect(valuations).toContain("b");
    expect(valuations).toContain("c");
  });

  test("create model given both number of states and propositions should result in error", () => {
    const PARAMS = {
      propositions: PROPOSITIONS,
      states: NUM_STATES
    };

    expect(() => kripfy.createModel(PARAMS)).toThrowError(ERRORS.PARAMS.INIT_WITH_STATES_AND_PROPS);
  });
});
