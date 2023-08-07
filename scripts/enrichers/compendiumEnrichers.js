import { EnricherPattern } from "../enricherPattern.js";
import { invalidHtml, templates } from "../helpers.js";

export default function getCompendium(label, packageName) {
  //get all packs with matching label
  var packslist = game.packs.filter((p) => p.metadata.label === label);

  var pack;
  switch (packslist.length) {
    case 0:
      throw "LMJE.COMPENDIUM.ERROR.NotFound"
    
    case 1:
      pack = packslist[0];
      break;
  
    default: // >1
      // if no packageName is given throw error
      if (!packageName) throw "LMJE.COMPENDIUM.ERROR.Multiple"
      // if multiple packs have the same label, look for pack with matching packageName
      pack = packslist.find((p) => p.metadata.packageName === packageName);
      break;
  }

  return pack;
}

export async function compendiumFull(match, options) {
  return match[0];
}

export async function inlineCompendium(match, options) {
  var packInfo = match[1].split(EnricherPattern.SEPARATOR);
  var label = packInfo[0]
  var packageName = packInfo[1]

  var compendium
  try {
    compendium = getCompendium(label, packageName)
  } catch (error) {
    return $(invalidHtml(game.i18n.localize(error)))[0]
  }

  var compendiumData = {
    label: label,
    packageName: packageName,
    id: compendium.metadata.id
  }

  var returnHtml = await renderTemplate(templates.compendium.inline, compendiumData)
  return $(returnHtml)[0];
}

export async function compendiumMenu(match, options) {
  var menuData = {
    title: match[1] !== undefined ? match[1] : game.i18n.localize("LMJE.COMPENDIUM.MENU.Title"),
    packs: []
  }
  return match[0];
}
