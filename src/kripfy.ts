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
    accessibility = false,
    propositions = 0,
    states = 0
  }: IKripkeOptions = {}): Model {
    const options: IKripkeOptions = { accessibility, propositions, states };

    if (options.states && options.propositions) {
      throw new Error(ERRORS.PARAMS.INIT_WITH_STATES_AND_PROPS);
    }

    let arrStates: State[] = [];
    if (options.states) {
      arrStates = generateStates(options.states);
    } else if (options.propositions) {
      const statesValuations = generatePropositions(options.propositions);
      arrStates = statesValuations.states;
    }

    const model = new Model();
    model.addStates(...arrStates);

    if (options.accessibility) {
      // TODO: Implement function to generate relations to fill up the graph with connections.
    }

    return model;
  }
}

function generateStates(quantity): State[] {
  const arrStates: State[] = [];
  for (let i = 1; i <= quantity; i++) {
    arrStates.push(new State(`s${i}`));
  }
  return arrStates;
}

function generatePropositions(quantity): { states: State[] } {
  const arrStates: State[] = [];
  // TODO: Implement generation of states given a quantity of propositions, according to the combinations of them.
  return { states: arrStates };
}
