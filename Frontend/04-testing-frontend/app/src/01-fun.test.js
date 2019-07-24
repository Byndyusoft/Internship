import sum from "./01-fun";

test("sum is alright", () => {
  expect(sum(1, 2)).toBe(3);
});

test("sum is alright extended", () => {
  let params = [1, 2];

  let expectedResult = 3;

  let actualResult = sum(...params);

  expect(actualResult).toBe(expectedResult);
});
