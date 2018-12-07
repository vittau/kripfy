import { Kripfy } from "../src/kripfy";

const kripfy = new Kripfy();

test("add", () => {
  expect(kripfy.add(1, 2)).toBe(3);
});
