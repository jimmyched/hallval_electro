import assert from "node:assert/strict";
import test from "node:test";
import { resolveTheme, themedHref } from "../lib/theme.ts";

test("only the two supported values select an alternate theme", () => {
  assert.equal(resolveTheme("1"), "1");
  assert.equal(resolveTheme("2"), "2");
  for (const value of [null, undefined, "", "0", "3", "ocean", " 1"]) {
    assert.equal(resolveTheme(value), "default");
  }
});

test("internal destinations retain queries and anchors with the selected theme", () => {
  assert.equal(themedHref("/science", "1"), "/science?theme=1");
  assert.equal(themedHref("/product/albea#preorder", "2"), "/product/albea?theme=2#preorder");
  assert.equal(themedHref("/fr/science?source=nav#evidence", "1"), "/fr/science?source=nav&theme=1#evidence");
  assert.equal(themedHref("/?tag=a&tag=b", "2"), "/?tag=a&tag=b&theme=2");
});

test("explicit destination themes override the inherited theme", () => {
  assert.equal(themedHref("/science?theme=2#evidence", "1"), "/science?theme=2#evidence");
  assert.equal(themedHref("/?theme=default", "1"), "/?theme=default");
});

test("external destinations and local anchors are unchanged", () => {
  for (const href of ["https://example.com/paper", "//example.com", "mailto:hello@example.com", "#preorder"]) {
    assert.equal(themedHref(href, "1"), href);
  }
});

test("default links keep the exact existing URL", () => {
  assert.equal(themedHref("/fr/science?source=a%20b#evidence", "default"), "/fr/science?source=a%20b#evidence");
});
