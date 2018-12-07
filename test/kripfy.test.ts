import { Kripfy } from "../src/kripfy";

const kripfy = new Kripfy();

describe("kripfy", () => {
  test("create model with no options should contain 0 states", () => {
    const model = kripfy.createModel();
    expect(model.sizeStates()).toBe(0);
  });

  const NUM_STATES = 3;
  test(`create model with ${NUM_STATES} states should contain ${NUM_STATES} states`, () => {
    const model = kripfy.createModel({ states: NUM_STATES });
    expect(model.sizeStates()).toBe(NUM_STATES);
    for (let i = 1; i <= NUM_STATES; i++) {
      expect(model.hasStateByIdentifier(`s${NUM_STATES}`)).toBeTruthy();
    }
  });
});
