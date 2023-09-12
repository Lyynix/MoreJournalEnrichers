import { getDocument, templates } from "../helpers.js";

export async function rolltableFull(match, options) {
  return "RT FULL"
}

export async function rolltableMenu(match, options) {
  return "RT MENU"
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
      type: rolltable.documentName
    },
    buttons: [
      {
        tooltip: "Draw one",
        faIcon: "fa-dice-d20",
        onclick: `
          game.tables.get('${rolltable.id}').draw();
          return false;
        `
      },
      {
        tooltip: "Edit",
        faIcon: "fa-cogs",
        onclick: `
          new RollTableConfig(game.tables.get('${rolltable.id}')).render(true);
          return false;
        `
      }
    ]
  }

  return $(await renderTemplate(templates.inline, rolltableData))[0]
}