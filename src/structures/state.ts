export class State {
  private identifier: string;

  constructor(identifier: string) {
    this.identifier = identifier;
  }

  public getIdentifier() {
    return this.identifier;
  }
}
