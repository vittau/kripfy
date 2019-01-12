export class Proposition {
  private label: string;

  constructor(label: string) {
    this.label = label;
  }

  public getLabel(): string {
    return this.label;
  }
}
