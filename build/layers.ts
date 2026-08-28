import { existsSync, readdirSync } from "node:fs";

/**
 * Liste les layers Nuxt montes localement sous `layers/`.
 *
 * Le dossier est ignore par Git : il est vide sur une installation propre, et le
 * projet doit alors builder normalement. Cette fonction est extraite de
 * nuxt.config pour etre testable — c'est le repli sans layer qui compte.
 */
export function scannerLayers(racine = "layers"): string[] {
  if (!existsSync(racine)) return [];
  return readdirSync(racine, { withFileTypes: true })
    .filter((entree) => entree.isDirectory())
    .map((entree) => `./${racine}/${entree.name}`);
}
