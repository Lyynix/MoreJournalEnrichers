import { EnricherPattern } from "../enricherPattern.js";
import { invalidHtml, templates } from "../helpers.js";

export default function getCompendium(label, packageName) {
  //get all packs with matching label
  var packslist = game.packs.filter((p) => p.metadata.label === label);

  var pack;
  switch (packslist.length) {
    case 0:
      throw "LMJE.COMPENDIUM.ERROR.NotFound";

    case 1:
      pack = packslist[0];
      break;

    default: // >1
      // if no packageName is given throw error
      if (!packageName) throw "LMJE.COMPENDIUM.ERROR.Multiple";
      // if multiple packs have the same label, look for pack with matching packageName
      pack = packslist.find((p) => p.metadata.packageName === packageName);
      break;
  }

  return pack;
}

export async function compendiumFull(match, options) {
  var label = match[1];
  var packageName = match[2];

  var compendium;
  try {
    compendium = getCompendium(label, packageName);
  } catch (error) {
    return $(invalidHtml(game.i18n.localize(error)))[0];
  }

  var contents = compendium.index.contents;
  var folders = compendium.folders;

  var dataFolders = {};
  var dataContents = [];

  console.log("LMJE | Folders: ", folders)

  contents.forEach((item) => {
    if (item.folder == null) dataContents.push(item);
    else {
      if (dataFolders[item.folder] === undefined) {
        var folderName = undefined;
        try {
          // console.log("LMJE | Get Folder:", folders.get(item.folder))
          // console.log("LMJE | Saved Folder:", item.folder)

          folderName = folders.get(item.folder).name;
        } catch (error) {}
        dataFolders[item.folder] = {
          name: folderName,
          content: [],
        };
      }
      dataFolders[item.folder].content.push(item);
    }
  });

  var sortFn = function (a, b) {
    if (a.sort === b.sort) 
      return a.name.localeCompare(b.name)
    return a.sort - b.sort
  }

  dataContents.sort(sortFn)
  Object.values(dataFolders).forEach(folder => {
    folder.content.sort(sortFn)
  })

  var compendiumData = {
    label: label,
    packageName: packageName,
    id: compendium.metadata.id,
    packType: compendium.metadata.type,
    folders: dataFolders,
    contents: dataContents,
  };
  // console.log("LMJE |", compendiumData);

  var returnHtml = await renderTemplate(
    templates.compendium.full,
    compendiumData
  );
  return $(returnHtml)[0];
}

export async function inlineCompendium(match, options) {
  var label = match[1];
  var packageName = match[2];

  var compendium;
  try {
    compendium = getCompendium(label, packageName);
  } catch (error) {
    return $(invalidHtml(game.i18n.localize(error)))[0];
  }

  var compendiumData = {
    label: label,
    packageName: packageName,
    id: compendium.metadata.id,
  };

  var returnHtml = await renderTemplate(
    templates.compendium.inline,
    compendiumData
  );
  return $(returnHtml)[0];
}

export async function compendiumMenu(match, options) {
  var menuData = {
    title:
      match[1] !== undefined
        ? match[1]
        : game.i18n.localize("LMJE.COMPENDIUM.MENU.Title"),
    packs: [],
  };
  return match[0];
}
