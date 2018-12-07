import { Model } from "../src/structures/model";
import { State } from "../src/structures/state";

const model = new Model();

describe("model", () => {
  test("add state A and then retrieve it", () => {
    const state = new State("A");
    model.addState(state);
    expect(model.hasState(state)).toBeTruthy();
    expect(model.hasStateByIdentifier("A")).toBeTruthy();
    expect(model.hasStateByIdentifier("B")).toBeFalsy();
  });
});
