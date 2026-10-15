import assert from "node:assert/strict";
import test from "node:test";
import {
  brandCatalog, brandIds, resolveBrand, productName, productDescriptor,
  brandText, brandData, brandedHref,
} from "../lib/brands.ts";
import { themedHref } from "../lib/theme.ts";

const names = {
  dayable: "Dayable", soluen: "Soluen", deartempo: "DearTempo",
  "good-measure": "Good Measure", ordelan: "Ordelan",
};

test("exactly the five selected identities have complete bilingual catalog entries", () => {
  assert.deepEqual(brandIds, Object.keys(names));
  assert.deepEqual(Object.keys(brandCatalog), brandIds);
  for (const [id, name] of Object.entries(names)) {
    const brand = brandCatalog[id];
    assert.equal(resolveBrand(id), id);
    assert.equal(brand.id, id);
    assert.equal(brand.name, name);
    for (const locale of ["en", "fr"]) {
      for (const key of ["territory", "line", "voice"]) assert.ok(brand[key][locale].trim());
    }
  }
});

test("unrecognized, absent and malformed query values preserve the default identity", () => {
  for (const value of [undefined, null, "", "albea", "DAYABLE", " dayable", "dayable ", "good measure", "__proto__"]) {
    assert.equal(resolveBrand(value), null);
  }
});

test("default copy, nested data identity and URLs remain exactly unchanged", () => {
  const copy = "Albea™ Pulse. L’approche d’Albea.";
  const data = { copy, items: [copy, { label: "Albea" }] };
  assert.equal(brandText(copy, null, "fr"), copy);
  assert.equal(brandData(data, null, "fr"), data);
  assert.equal(brandedHref("/fr/science?source=a%20b#evidence", null), "/fr/science?source=a%20b#evidence");
  assert.equal(productName(null, "en"), "Albea Pulse");
  assert.equal(productName(null, "fr"), "Albea Pulse");
});

test("all product labels use the selected name and the correct local descriptor", () => {
  for (const [id, name] of Object.entries(names)) {
    assert.equal(productName(id, "en"), `${name} · Foot wrap`);
    assert.equal(productName(id, "fr"), `${name} · Support pour le pied`);
  }
  assert.equal(productDescriptor("en"), "Foot stimulation wrap");
  assert.equal(productDescriptor("fr"), "Support de stimulation du pied");
});

test("old wordmark variants are replaced without borrowing trademarks or consuming punctuation", () => {
  for (const [id, name] of Object.entries(names)) {
    for (const original of ["Albea", "ALBEA™", "Albea®", "Albea Pulse", "Albea™ Pulse", "albea / pulse"]) {
      assert.equal(brandText(`${original}. More detail.`, id, "en"), `${name}. More detail.`);
    }
    assert.equal(brandText("Albea Pulse: a concept, not a clinical conclusion.", id, "en"), `${name}: a concept, not a clinical conclusion.`);
  }
});

test("French de elision agrees with the selected name", () => {
  for (const [id, name] of Object.entries(names)) {
    const expected = id === "ordelan" ? `d’${name}` : `de ${name}`;
    assert.equal(brandText("Le développement d’Albea.", id, "fr"), `Le développement ${expected}.`);
  }
});

test("French que elision agrees with the selected name in FAQ and evidence text", () => {
  for (const [id, name] of Object.entries(names)) {
    const expected = id === "ordelan" ? `qu’${name}` : `que ${name}`;
    assert.equal(brandText("Rien ne démontre qu’Albea modifie ce risque.", id, "fr"), `Rien ne démontre ${expected} modifie ce risque.`);
    assert.equal(brandText("Qu’est-ce qu’Albea, exactement ?", id, "fr"), `Qu’est-ce ${expected}, exactement ?`);
  }
});

test("French elision also handles straight apostrophes in editorial copy", () => {
  assert.equal(brandText("Le développement d'Albea.", "dayable", "fr"), "Le développement de Dayable.");
  assert.equal(brandText("Ce qu'Albea propose.", "soluen", "fr"), "Ce que Soluen propose.");
  assert.equal(brandText("Le développement d'Albea.", "ordelan", "fr"), "Le développement d'Ordelan.");
});

test("source references, paths and product IDs survive editorial transformations", () => {
  for (const value of [
    "https://albea.example/Albea-Pulse#Albea", "http://albea.example/research",
    "/images/Albea-Pulse.png", "/product/albea", "//cdn.albea.example/image.png",
    "gid://shopify/Product/albea-pulse",
  ]) assert.equal(brandText(value, "soluen", "en"), value);
});

test("nested copy is transformed without mutating shared locale data", () => {
  const source = {
    title: "Albea Pulse.", data: ["Albea", { title: "d’Albea", image: "/images/Albea.png" }],
    url: "https://albea.example", count: 4, enabled: false, missing: null,
  };
  const original = structuredClone(source);
  const result = brandData(source, "dayable", "fr");
  assert.deepEqual(source, original);
  assert.notEqual(result, source);
  assert.notEqual(result.data, source.data);
  assert.notEqual(result.data[1], source.data[1]);
  assert.deepEqual(result, {
    title: "Dayable.", data: ["Dayable", { title: "de Dayable", image: "/images/Albea.png" }],
    url: "https://albea.example", count: 4, enabled: false, missing: null,
  });
  assert.equal(brandData(undefined, "dayable", "fr"), undefined);
  assert.equal(brandData(0, "dayable", "fr"), 0);
  assert.equal(brandData(false, "dayable", "fr"), false);
});

test("internal links retain locale, repeated query values and anchors", () => {
  assert.equal(brandedHref("/science", "dayable"), "/science?brand=dayable");
  assert.equal(brandedHref("/product/albea#preorder", "soluen"), "/product/albea?brand=soluen#preorder");
  assert.equal(brandedHref("/fr/science?source=nav#evidence", "deartempo"), "/fr/science?source=nav&brand=deartempo#evidence");
  assert.equal(brandedHref("/?tag=a&tag=b", "good-measure"), "/?tag=a&tag=b&brand=good-measure");
  assert.equal(brandedHref("/en?source=a%20b", "ordelan"), "/en?source=a+b&brand=ordelan");
});

test("explicit destination identities override the inherited identity", () => {
  assert.equal(brandedHref("/fr/science?brand=soluen#evidence", "dayable"), "/fr/science?brand=soluen#evidence");
  assert.equal(brandedHref("/?brand=", "dayable"), "/?brand=");
  assert.equal(brandedHref("/?brand=unknown", "dayable"), "/?brand=unknown");
});

test("neutral research and brand-comparison routes stay outside inherited branding", () => {
  for (const href of ["/research/naming.html", "/research/naming.html#history", "/brands", "/brands?view=all", "/brands/dayable", "/en/brands", "/fr/brands/soluen#packaging"]) {
    assert.equal(brandedHref(href, "dayable"), href);
  }
  assert.equal(brandedHref("/brands-extra", "dayable"), "/brands-extra?brand=dayable");
});

test("external links, protocol-relative links and in-page fragments are not rewritten", () => {
  for (const href of ["https://example.com/path?brand=x", "//example.com", "mailto:hello@example.com", "tel:123456", "#how-it-works", "data:image/png;base64,test"]) {
    assert.equal(brandedHref(href, "dayable"), href);
  }
});

test("brand and legacy theme links compose in either order without losing parameters", () => {
  const input = "/fr/product/albea?source=footer#details";
  for (const result of [brandedHref(themedHref(input, "2"), "dayable"), themedHref(brandedHref(input, "dayable"), "2")]) {
    const url = new URL(result, "https://example.test");
    assert.equal(url.pathname, "/fr/product/albea");
    assert.equal(url.searchParams.get("source"), "footer");
    assert.equal(url.searchParams.get("theme"), "2");
    assert.equal(url.searchParams.get("brand"), "dayable");
    assert.equal(url.hash, "#details");
  }
  assert.equal(brandedHref(themedHref("/science?theme=1&brand=soluen", "2"), "dayable"), "/science?theme=1&brand=soluen");
});
