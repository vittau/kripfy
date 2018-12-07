import { ERRORS } from "../src/errors";
import { Kripfy } from "../src/kripfy";
import { State } from "../src/structures/state";

const kripfy = new Kripfy();
const NUM_STATES = 3;
const NUM_PROPOSITIONS = 3;

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
      expect(model.getStateByIdentifier(`s${NUM_STATES}`)).toBeInstanceOf(
        State
      );
    }
  });

  test("create model given both number of states and propositions should result in error", () => {
    const PARAMS = {
      propositions: NUM_PROPOSITIONS,
      states: NUM_STATES
    };

    expect(() => kripfy.createModel(PARAMS)).toThrowError(
      ERRORS.PARAMS.INIT_WITH_STATES_AND_PROPS
    );
  });
});
