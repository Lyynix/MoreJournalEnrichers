import { changelog_de, changelog_en } from "./changelog.js";
import { EnricherPattern } from "./enricherPattern.js";
import { chat, whisper } from "./enrichers/chatEnrichers.js";
import {
  compendiumFull,
  inlineCompendium,
} from "./enrichers/compendiumEnrichers.js";
import {
  toc,
  otoc,
  variable,
  insertPage,
  checkbox,
  ifChecked,
} from "./enrichers/journalEnrichers.js";
import { inlinePlaylist, playlistMenu } from "./enrichers/playlistEnrichers.js";
import { polyglot } from "./enrichers/polyglot.js";
import {
  rolltableFull,
  rolltableInline,
  rolltableMenu,
} from "./enrichers/rolltableEnrichers.js";
import {
  inlineScene,
  sceneFull,
  sceneMenu,
} from "./enrichers/sceneEnrichers.js";

export const templates = {
  prosemirror: {
    insertEnricher:
      "modules/lyynix-more-journal-enrichers/templates/prosemirror/inser-enricher.hbs",
    enterTextFormApplication:
      "modules/lyynix-more-journal-enrichers/templates/prosemirror/enterText-Application.hbs",
  },
  system: {
    welcomeMessage:
      "modules/lyynix-more-journal-enrichers/templates/system/welcomeMessage.hbs",
    changeLog:
      "modules/lyynix-more-journal-enrichers/templates/system/changeLog.hbs",
  },
  inline: "modules/lyynix-more-journal-enrichers/templates/inlineTemplate.hbs",
  whisperTable:
    "modules/lyynix-more-journal-enrichers/templates/whisperTable.hbs",
  chatTable: "modules/lyynix-more-journal-enrichers/templates/chatTable.hbs",
  rolltable: {
    full: "modules/lyynix-more-journal-enrichers/templates/rolltable/rolltableFull.hbs",
    menu: "modules/lyynix-more-journal-enrichers/templates/rolltable/rolltableMenu.hbs",
  },
  compendium: {
    inline:
      "modules/lyynix-more-journal-enrichers/templates/compendium/inlineCompendium.hbs",
    full: "modules/lyynix-more-journal-enrichers/templates/compendium/compendiumFull.hbs",
    menu: "modules/lyynix-more-journal-enrichers/templates/compendium/compendiumMenu.hbs",
  },
  scene: {
    full: "modules/lyynix-more-journal-enrichers/templates/scene/sceneFull.hbs",
  },
  journal: {
    chooseString:
      "modules/lyynix-more-journal-enrichers/templates/journal/chooseStringDialog.hbs",
    checkbox:
      "modules/lyynix-more-journal-enrichers/templates/journal/checkbox.hbs",
    editVariables:
      "modules/lyynix-more-journal-enrichers/templates/journal/editVariablesDialog.hbs",
    chooseVariable:
      "modules/lyynix-more-journal-enrichers/templates/journal/chooseVariableDialog.hbs",
    refPage:
      "modules/lyynix-more-journal-enrichers/templates/journal/refPage.hbs",
  },
  modules: {
    polyglot:
      "modules/lyynix-more-journal-enrichers/templates/polyglot/polyglot.hbs",
  },
};

export const patterns = {
  journal: {
    checkbox: new EnricherPattern()
      .addName("Checkbox")
      .addName("CB")
      .setReferenceTypes("IDENTIFIER", "SINGLE", false)
      .setLabelTypes("TEXT", "SINGLE", true)
      .getRegex(),
    ifChecked: new EnricherPattern()
      .addName("IfChecked")
      .setReferenceTypes("IDENTIFIER", "SINGLE", false)
      .setLabelTypes("TEXT", "SINGLE", false)
      .getRegex(),
    variable: new EnricherPattern()
      .addName("Var")
      .addName("Replace")
      .setReferenceTypes("IDENTIFIER", "SINGLE", false)
      .getRegex(),
    page: new EnricherPattern()
      .addName("Page")
      .setReferenceTypes("IDENTIFIER", "SINGLE", false)
      .setConfigTypes("IDENTIFIER", "SINGLE", true)
      .getRegex(),
  },
  toc: {
    unordered: new EnricherPattern()
      .addName("ToC")
      .addName("TableOfContents")
      .setReferenceTypes("IDENTIFIER", "SINGLE", true)
      .setConfigTypes("SIZE", "SINGLE", true)
      .getRegex(),
    ordered: new EnricherPattern()
      .addName("OrderedToC")
      .addName("OrderedTableOfContents")
      .setReferenceTypes("IDENTIFIER", "SINGLE", true)
      .setConfigTypes("SIZE", "SINGLE", true)
      .getRegex(),
  },
  rolltable: {
    full: new EnricherPattern()
      .addName("RollTableFull")
      .setReferenceTypes("IDENTIFIER", "SINGLE", false)
      .setLabelTypes("TEXT", "SINGLE", true)
      .getRegex(),
    menu: new EnricherPattern()
      .addName("RollTableMenu")
      .setReferenceTypes("IDENTIFIER", "MULTIPLE", false)
      .setLabelTypes("TEXT", "SINGLE", true)
      .getRegex(),
    inline: new EnricherPattern()
      .addName("RollTableInline")
      .setReferenceTypes("IDENTIFIER", "SINGLE", false)
      .setLabelTypes("TEXT", "SINGLE", true)
      .getRegex(),
  },
  compendium: {
    full: new EnricherPattern()
      .addName("CompendiumFull")
      .setReferenceTypes("IDENTIFIER", "SINGLE", false)
      .setConfigTypes("IDENTIFIER", "SINGLE", true)
      .setLabelTypes("TEXT", "SINGLE", true)
      .getRegex(),
    inline: new EnricherPattern()
      .addName("CompendiumInline")
      .setReferenceTypes("IDENTIFIER", "SINGLE", false)
      .setConfigTypes("IDENTIFIER", "SINGLE", true)
      .setLabelTypes("TEXT", "SINGLE", true)
      .getRegex(),
  },
  chat: {
    chat: new EnricherPattern()
      .addName("ChatPost")
      .setLabelTypes("TEXT", "SINGLE", false)
      .getRegex(),
    whisper: new EnricherPattern()
      .addName("ChatWhisper")
      .setLabelTypes("TEXT", "SINGLE", false)
      .getRegex(),
  },
  scene: {
    menu: new EnricherPattern()
      .addName("SceneMenu")
      .setReferenceTypes("IDENTIFIER", "MULTIPLE", false)
      .setLabelTypes("TEXT", "SINGLE", true)
      .getRegex(),
    full: new EnricherPattern()
      .addName("SceneFull")
      .setReferenceTypes("IDENTIFIER", "SINGLE", false)
      .setLabelTypes("TEXT", "SINGLE", true)
      .getRegex(),
    inline: new EnricherPattern()
      .addName("SceneInline")
      .setReferenceTypes("IDENTIFIER", "SINGLE", false)
      .setLabelTypes("TEXT", "SINGLE", true)
      .getRegex(),
  },
  playlist: {
    menu: new EnricherPattern()
      .addName("PlaylistMenu")
      .setReferenceTypes("IDENTIFIER", "MULTIPLE", false)
      .setLabelTypes("TEXT", "SINGLE", true)
      .getRegex(),
    inline: new EnricherPattern()
      .addName("Playlist")
      .addName("PlaylistInline")
      .setReferenceTypes("IDENTIFIER", "SINGLE", false)
      .setLabelTypes("TEXT", "SINGLE", true)
      .getRegex(),
  },
  modules: {
    polyglot: new EnricherPattern()
      .addName("Polyglot")
      .addName("Translate")
      .setReferenceTypes("TEXT", "SINGLE", false)
      .setLabelTypes("TEXT", "MULTIPLE", false)
      .getRegex(),
  },
};

export const enricherFunctions = {
  journal: {
    checkbox: checkbox,
    ifChecked: ifChecked,
    variable: variable,
    page: insertPage,
  },
  toc: {
    unordered: toc,
    ordered: otoc,
  },
  rolltable: {
    full: rolltableFull,
    menu: rolltableMenu,
    inline: rolltableInline,
  },
  compendium: {
    full: compendiumFull,
    inline: inlineCompendium,
  },
  chat: {
    chat: chat,
    whisper: whisper,
  },
  scene: {
    menu: sceneMenu,
    full: sceneFull,
    inline: inlineScene,
  },
  playlist: {
    menu: playlistMenu,
    inline: inlinePlaylist,
  },
  modules: {
    polyglot: polyglot,
  },
};

export async function getDocument(identifier, expectedDocumentType) {
  // try identifier as uuid
  // console.log("LMJE |", identifier)
  var doc = await fromUuid(identifier);
  if (doc !== null) {
    if (
      expectedDocumentType === undefined ||
      doc.documentName === expectedDocumentType
    ) {
      return doc;
    } else {
      throw "LMJE.SYSTEM.getDocument.wrongType";
    }
  }
  // get collection from expected type
  var collection;
  switch (expectedDocumentType) {
    case undefined:
      throw "LMJE.SYSTEM.getDocument.noExpectedDocumentType";
    case "Actor":
      collection = game.actors;
      break;
    case "Scene":
      collection = game.scenes;
      break;
    case "Playlist":
      collection = game.playlists;
      break;
    case "JournalEntry":
      collection = game.journal;
      break;
    case "JournalEntryPage":
      var journals = game.journal.filter((j) => {
        return j.pages.get(identifier) || j.pages.getName(identifier);
      });
      if (journals.length === 0)
        throw "LMJE.SYSTEM.getDocument.noDocumentFound";
      if (journals.length > 1)
        throw "LMJE.SYSTEM.getDocument.multiplePagesFound";
      collection = journals[0].pages;
      break;
    case "RollTable":
      collection = game.tables;
      break;

    default:
      throw "LMJE.SYSTEM.getDocument.expectedTypeNotFound";
  }

  // try identifier as ID
  doc = collection.get(identifier);
  if (doc) {
    // console.log("LMJE |", "found doc with id", doc)
    return doc;
  }
  // try identifier as Name
  doc = collection.getName(identifier);
  if (doc) {
    // console.log("LMJE |", "found doc with name", doc)
    return doc;
  }

  throw "LMJE.SYSTEM.getDocument.noDocumentFound";
}

export function initHandlebarsHelpers() {
  Handlebars.registerHelper("isdefined", function (value) {
    return value !== undefined;
  });
  Handlebars.registerHelper("ifCond", function (v1, operator, v2) {
    switch (operator) {
      case "==":
        return v1 == v2;
      case "===":
        return v1 === v2;
      case "!=":
        return v1 != v2;
      case "!==":
        return v1 !== v2;
      case "<":
        return v1 < v2;
      case "<=":
        return v1 <= v2;
      case ">":
        return v1 > v2;
      case ">=":
        return v1 >= v2;
      case "&&":
        return v1 && v2;
      case "||":
        return v1 || v2;
      default:
        return options.inverse(this);
    }
  });
}

export async function postWelcomeMessage() {
  if (!game.users.current.isGM) return;

  var data = {
    isGerman: game.settings.get("core", "language") === "de",
  };
  var html = await foundry.applications.handlebars.renderTemplate(templates.system.welcomeMessage, data);
  ChatMessage.create({
    user: game.users.current,
    whisper: [game.users.current._id],
    speaker: { alias: "Lyynix" },
    content: html,
  });
  game.settings.set("lyynix-more-journal-enrichers", "intro-message", false);
  log("Sent welcome message");
}

export async function postChangelogDifference(current, lastLogged) {
  // const allVersions = ["1.0.0", "1.1.0", "1.2.0", "1.2.1", "1.3.0"];
  const allVersions = Object.keys(changelog_en).reverse();
  // log(allVersions)
  log("version difference detected", current, lastLogged);

  var firstIndex = allVersions.findIndex((e) => e === lastLogged);
  if (firstIndex < 0) throw "LMJE | unknown version";
  var unloggedVersions = allVersions.slice(firstIndex + 1);

  log("unlogged versions:", unloggedVersions)

  var unloggedChangelog;
  switch (game.i18n.lang) {
    case "de":
      unloggedChangelog = {
        versions: unloggedVersions.map((v) => changelog_de[v]),
      };
      break;

    default:
      unloggedChangelog = {
        versions: unloggedVersions.map((v) => changelog_en[v]),
      };
      break;
  }
  var html = await foundry.applications.handlebars.renderTemplate(
    templates.system.changeLog,
    unloggedChangelog
  );
  // console.log("LMJE |", unloggedChangelog);
  // console.log("LMJE |", html);

  ChatMessage.create({
    user: game.users.current,
    whisper: [game.users.current._id],
    speaker: { alias: "Lyynix" },
    content: html,
  });
  game.settings.set(
    "lyynix-more-journal-enrichers",
    "lastLoggedVersion",
    game.modules.get("lyynix-more-journal-enrichers").version
  );
  log("created changelog");
}

/**
 * Splits a String into multiple <p> at a separator
 * @param {String} content The string that should be split at the given separator
 * @param {RegExp | String} separator The separator at wich the content gets split
 * @returns String as html with multiple <p> elements
 */
export function splitMultiline(content, separator) {
  let lines = content.split(separator);
  if (lines.length > 1)
    return `<span><p>${lines.join("</p><p>")}</p></span>`;
  else 
    return `<span>${lines[0]}</span>`
}

export function invalidHtml(error) {
  return /* html */ `
    <a class="content-link broken" draggable="true" data-id="null" data-uuid="asd">
      <i class="fas fa-unlink"></i>LMJE: ${error}
    </a>
  `;
}

export function log(...args) {
  console.log("LMJE |", ...args)
}
