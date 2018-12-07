import { Model } from "../src/structures/model";
import { State } from "../src/structures/state";

describe("model", () => {
  test("add state A and then retrieve it", () => {
    const model = new Model();

    const state = new State("A");

    model.addState(state);

    expect(model.hasState(state)).toBeTruthy();
    expect(model.hasStateByIdentifier("A")).toBeTruthy();
    expect(model.hasStateByIdentifier("B")).toBeFalsy();
  });
});
