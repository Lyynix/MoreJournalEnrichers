import { getDocument } from "../helpers.js";

export async function rolltableFull(match, options) {
  return "RT FULL"
}

export async function rolltableMenu(match, options) {
  return "RT MENU"
}

export async function rolltableInline(match, options) {
  console.log("LMJE |", match)

  var id = match[1];
  var rolltable;
  try {
    rolltable = await getDocument(id, "RollTable");
  } catch (error) {
    return $(invalidHtml(game.i18n.localize(error)))[0];
  }

  var rolltableName = match[2] === undefined ? rolltable.name : match[2];

  

  return rolltableName
}