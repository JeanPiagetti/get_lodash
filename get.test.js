/**
 * get.test.js
 * 
 * npx jest --runTestsByPath get.test.js
 */

const { get } = require("./get.js");

describe("Get", function () {
  const fn = () => 0;
  const data = { a: [{ b: { c: 3 } }] };

  it("Invalid Path", function () {
    expect(get(1, data)).toBeUndefined();
    expect(get(fn, data)).toBeUndefined();
    expect(get({}, data)).toBeUndefined();
    expect(get(null, data)).toBeUndefined();
    expect(get(false, data)).toBeUndefined();
    expect(get(void 0, data)).toBeUndefined();
    expect(get(['a', 0, {}], data)).toBeUndefined();
    expect(get(['a', 0, 'b', {}], data)).toBeUndefined();
  });

  it("Invalid Data", function () {
    expect(get("a.b.c", 1)).toBeUndefined();
    expect(get("a.b.c", "")).toBeUndefined();
    expect(get("a.b.c", fn)).toBeUndefined();
    expect(get("a.b.c", null)).toBeUndefined();
    expect(get("a.b.c", false)).toBeUndefined();
    expect(get("a.b.c", void 0)).toBeUndefined();
  });

  it("Wrong Path", function () {
    expect(get("a.b.c", data)).toBeUndefined();
    expect(get("a.b.c[0]", data)).toBeUndefined();
    expect(get(["a", 1, "b", "c"], data)).toBeUndefined();
    expect(get(["a", "0", "b", "d"], data)).toBeUndefined();
  });

  it("Dot Syntax", function () {
    expect(get("a.0.b.c", data)).toEqual(3);
  });

  it("JSONPath Syntax", function () {
    expect(get("a[0].b.c", data)).toEqual(3);
  });

  it("Array Syntax", function () {
    expect(get(["a", 0, "b", "c"], data)).toEqual(3);
    expect(get(["a", "0", "b", "c"], data)).toEqual(3);
  });
});