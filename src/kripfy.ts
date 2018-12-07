import { Model } from "./structures/model";
import { State } from "./structures/state";

interface IKripkeOptions {
  states?: number;
  relations?: boolean;
}

export class Kripfy {
  public createModel({
    states = 0,
    relations = false
  }: IKripkeOptions = {}): Model {
    const options: IKripkeOptions = { states, relations };

    const setStates = new Set<State>();
    if (options.states) {
      for (let i = 1; i <= options.states; i++) {
        setStates.add(new State(`s${i}`));
      }
    }
    const model = new Model(setStates);

    return model;
  }
}
