import { expect, it } from "vitest";
import { Equal, Expect } from "../helpers/type-utils";

// async function fetchData<TResult>(
//   url: string
// ): Promise<
//   TResult extends {} ? TResult : "You must pass a type argument to fetchData"
// > {
//   const data = await fetch(url).then((response) => response.json());
//   return data;
// }

//solution with default in type argument
const fetchData = async <
  TResult = "You must pass a type argument to fetchData"
>(
  url: string
): Promise<TResult> => {
  const data = await fetch(url).then((response) => response.json());
  return data;
};

it("Should fetch data from an API", async () => {
  const data = await fetchData<{ name: string }>(
    "https://swapi.dev/api/people/1"
  );
  expect(data.name).toEqual("Luke Skywalker");

  type tests = [Expect<Equal<typeof data, { name: string }>>];
});

it("Should force you to add a type annotation with a helpful error message", async () => {
  const data = await fetchData("https://swapi.dev/api/people/1");

  type tests = [
    Expect<Equal<typeof data, "You must pass a type argument to fetchData">>
  ];
});
