import { EnricherPattern } from "../enricherPattern.js";
import { getDocument, templates } from "../helpers.js";

export async function rolltableFull(match, options) {
  var id = match[1];
  var rolltable;
  try {
    rolltable = await getDocument(id, "RollTable");
  } catch (error) {
    return $(invalidHtml(game.i18n.localize(error)))[0];
  }

  var rolltableName = match[2] === undefined ? rolltable.name : match[2];

  var rolltableData = {
    label: rolltableName,
    documentData: {
      uuid: rolltable.uuid,
      id: rolltable.id,
      type: rolltable.documentName,
    },
    formula: rolltable.formula,
    description: rolltable.description,
    results: [],
  };

  var results = await rolltable.results.contents;
  for (let i = 0; i < results.length; i++) {
    const result = results[i];
    var resultData = {
      type: result.type,
      range: result.range,
      text: result.text,
      img: result.img,
    };

    switch (result.type) {
      case 1:
        var doc = game.collections
          .get(result.documentCollection)
          .get(result.documentId);
        resultData.document = {
          id: result.documentId,
          uuid: doc.uuid,
          type: result.documentCollection,
        };
        break;

      case 2:
        var doc = game.packs
          .get(result.documentCollection)
          .index.get(result.documentId);
        resultData.document = {
          id: result.documentId,
          uuid: doc.uuid,
          type: result.documentCollection,
        };
        break;

      default:
        break;
    }

    rolltableData.results.push(resultData);
  }

  // log("", rolltable);
  // log("", rolltableData);

  return $(await renderTemplate(templates.rolltable.full, rolltableData))[0];
}

export async function rolltableMenu(match, options) {
  const ids = match[1].split(EnricherPattern.SEPARATOR);
  const title =
    match[2] !== undefined
      ? match[2]
      : game.i18n.localize("LMJE.PLAYLIST.Title");

  var menuData = {
    title: title,
    rolltables: [],
  };
  for (let i = 0; i < ids.length; i++) {
    const id = ids[i];
    var document;
    var label;
    var docId;
    try {
      document = await getDocument(id, "RollTable");
      label = document.name;
      docId = document.uuid;
    } catch (error) {
      label = game.i18n.localize(error);
      docId = "";
    }
    menuData.rolltables.push({
      label: label,
      uuid: docId,
    });
  }

  return $(await renderTemplate(templates.rolltable.menu, menuData))[0];
}

export async function rolltableInline(match, options) {
  var id = match[1];
  var rolltable;
  try {
    rolltable = await getDocument(id, "RollTable");
  } catch (error) {
    return $(invalidHtml(game.i18n.localize(error)))[0];
  }

  var rolltableName = match[2] === undefined ? rolltable.name : match[2];

  var rolltableData = {
    faIcon: "fa-th-list",
    label: rolltableName,
    documentData: {
      uuid: rolltable.uuid,
      id: rolltable.id,
      type: rolltable.documentName,
    },
    buttons: [
      {
        tooltip: "Draw one",
        faIcon: "fa-dice-d20",
        onclick: `
          fromUuid('${rolltable.uuid}').then(doc => {return doc.draw()});
          return false;
        `,
      },
      {
        tooltip: "Edit",
        faIcon: "fa-cogs",
        onclick: `
          fromUuid('${rolltable.uuid}').then(doc => {return new RollTableConfig(doc).render(true)});
          return false;
        `,
      },
    ],
  };

  return $(await renderTemplate(templates.inline, rolltableData))[0];
}
