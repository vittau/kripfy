import { Model } from "../src/model";
import { State } from "../src/state";

const model = new Model();

test("add state A and then retrieve it", () => {
  const state = new State();
  state.name = "A";
  model.addState(state);
  expect(model.hasState("A")).toBeTruthy();
  expect(model.hasState("B")).toBeFalsy();
});
