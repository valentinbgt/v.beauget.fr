import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { scannerLayers } from "../build/layers";

/**
 * Le portfolio peut etre etendu par des layers Nuxt montes localement, dans un
 * dossier ignore par Git. Ces tests couvrent le cas qui compte : sur une
 * installation propre, ou le dossier est absent ou vide, le projet doit builder
 * normalement.
 */
describe("scannerLayers", () => {
  let racine: string;

  beforeEach(() => {
    racine = mkdtempSync(join(tmpdir(), "layers-"));
  });

  afterEach(() => {
    rmSync(racine, { recursive: true, force: true });
  });

  it("retourne une liste vide quand le dossier n'existe pas", () => {
    expect(scannerLayers(join(racine, "absent"))).toEqual([]);
  });

  it("retourne une liste vide quand le dossier est vide", () => {
    expect(scannerLayers(racine)).toEqual([]);
  });

  it("retourne un chemin relatif par sous-dossier", () => {
    mkdirSync(join(racine, "alpha"));
    mkdirSync(join(racine, "beta"));
    expect(scannerLayers(racine).sort()).toEqual([
      `./${racine}/alpha`,
      `./${racine}/beta`,
    ]);
  });

  it("ignore les fichiers et ne retient que les dossiers", () => {
    mkdirSync(join(racine, "alpha"));
    writeFileSync(join(racine, "LISEZMOI.md"), "");
    expect(scannerLayers(racine)).toEqual([`./${racine}/alpha`]);
  });
});
