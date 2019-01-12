// Code from: https://codereview.stackexchange.com/a/154883
export class Powerset {
  public static powerSet(list: string[]): string[][] {
    const results = [[]];
    for (const value of list) {
      const copy = [...results];
      for (const prefix of copy) {
        results.push(prefix.concat(value));
      }
    }
    return results;
  }
}
