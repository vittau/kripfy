import { Valuation } from "../dist/src/structures/valuation";
import { ERRORS } from "./errors";
import { Model } from "./structures/model";
import { State } from "./structures/state";

interface IKripkeOptions {
  states?: number;
  propositions?: number;
  accessibility?: boolean;
}

export class Kripfy {
  public createModel({
    states = 0,
    propositions = 0,
    accessibility = false
  }: IKripkeOptions = {}) {
    const options: IKripkeOptions = { states, propositions, accessibility };

    if (options.states && options.propositions) {
      throw new Error(ERRORS.PARAMS.INIT_WITH_STATES_AND_PROPS);
    }

    let setStates;
    if (options.states) {
      setStates = generateStates(options.states);
    } else if (options.propositions) {
      const statesValuations = generatePropositions(options.propositions);
      setStates = statesValuations.states;
    }

    const model = new Model();
    model.addStates(setStates);

    if (options.accessibility) {
      // TODO: Implement function to generate relations to fill up the graph with connections.
    }

    return model;
  }
}

function generateStates(quantity) {
  const setStates = new Set<State>();
  for (let i = 1; i <= quantity; i++) {
    setStates.add(new State(`s${i}`));
  }
  return setStates;
}

function generatePropositions(quantity) {
  // TODO: Implement generation of states given a quantity of propositions, according to the combinations of them.
  return null;
}
