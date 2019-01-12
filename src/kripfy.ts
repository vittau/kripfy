import { ERRORS } from "./errors";
import { Powerset } from "./powerset";
import { Model } from "./structures/model";
import { Proposition } from "./structures/proposition";
import { State } from "./structures/state";

interface IKripkeOptions {
  states?: number;
  propositions?: string[];
  accessibility?: boolean;
}

export class Kripfy {
  public createModel({ accessibility = false, propositions = null, states = null }: IKripkeOptions = {}): Model {
    const options: IKripkeOptions = { accessibility, propositions, states };

    if (options.states && options.propositions) {
      throw new Error(ERRORS.PARAMS.INIT_WITH_STATES_AND_PROPS);
    }

    let arrStates: State[] = [];
    let valuations: Map<State, Proposition[]>;
    if (options.states) {
      arrStates = generateStates(options.states);
    } else if (options.propositions) {
      const statesValuations = generatePropositions(options.propositions);
      arrStates = statesValuations.states;
      valuations = statesValuations.valuations;
    }

    const model = new Model();
    model.addStates(...arrStates);
    model.setValuations(valuations);

    if (options.accessibility) {
      // TODO: Implement function to generate relations to fill up the graph with connections.
    }

    return model;
  }
}

function generateStates(quantity: number): State[] {
  const arrStates: State[] = [];
  for (let i = 1; i <= quantity; i++) {
    arrStates.push(new State(`s${i}`));
  }
  return arrStates;
}

function generatePropositions(props: string[]): { states: State[]; valuations: Map<State, Proposition[]> } {
  const states: State[] = [];
  const valuations = new Map<State, Proposition[]>();

  const propsPowerset = Powerset.powerSet(props);
  for (const set of propsPowerset) {
    let stateName = set.join("");
    if (!stateName) {
      stateName = "_";
    }
    const state = new State(stateName);
    states.push(state);

    const propositions: Proposition[] = [];
    for (const item of set) {
      propositions.push(new Proposition(item));
    }
    valuations.set(state, propositions);
  }
  return { states, valuations };
}
