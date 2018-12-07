import { Model } from "../src/structures/model";
import { State } from "../src/structures/state";

const model = new Model();

test("add state A and then retrieve it", () => {
  const state = new State();
  state.name = "A";
  model.addState(state);
  expect(model.hasState(state)).toBeTruthy();
  expect(model.hasStateByName("A")).toBeTruthy();
  expect(model.hasStateByName("B")).toBeFalsy();
});
