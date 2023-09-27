import { EnricherPattern } from "./enricherPattern.js";
import { chat, whisper } from "./enrichers/chatEnrichers.js";
import { compendiumFull, inlineCompendium } from "./enrichers/compendiumEnrichers.js";
import { toc, otoc } from "./enrichers/journalEnrichers.js";
import { inlinePlaylist, playlistMenu } from "./enrichers/playlistEnrichers.js";
import { rolltableFull, rolltableInline, rolltableMenu } from "./enrichers/rollTableEnrichers.js";
import { inlineScene, sceneFull, sceneMenu } from "./enrichers/sceneEnrichers.js";

export const templates = {
  inline: "modules/lyynix-more-journal-enrichers/templates/inlineTemplate.hbs",
  whisperTable:
    "modules/lyynix-more-journal-enrichers/templates/whisperTable.hbs",
  chatTable: "modules/lyynix-more-journal-enrichers/templates/chatTable.hbs",
  rolltable: {
    full: "modules/lyynix-more-journal-enrichers/templates/rolltable/rolltableFull.hbs",
    menu: "modules/lyynix-more-journal-enrichers/templates/rolltable/rolltableMenu.hbs"
  },
  compendium: {
    inline: "modules/lyynix-more-journal-enrichers/templates/compendium/inlineCompendium.hbs",
    full: "modules/lyynix-more-journal-enrichers/templates/compendium/compendiumFull.hbs",
    menu: "modules/lyynix-more-journal-enrichers/templates/compendium/compendiumMenu.hbs"
  },
  scene: {
    full: "modules/lyynix-more-journal-enrichers/templates/scene/sceneFull.hbs",
  }
};

export const patterns = {
  toc: {
    unordered: new EnricherPattern()
      .addName("ToC")
      .setReferenceTypes("IDENTIFIER", "SINGLE", true)
      .setConfigTypes("SIZE", "SINGLE", true)
      .getRegex(),
    ordered: new EnricherPattern()
      .addName("OrderedToC")
      .setReferenceTypes("IDENTIFIER", "SINGLE", true)
      .setConfigTypes("SIZE", "SINGLE", true)
      .getRegex()
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
      .getRegex()
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
      .getRegex()
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
};

export const enricherFunctions = {
  toc: {
    unordered: toc,
    ordered: otoc
  },
  rolltable: {
    full: rolltableFull,
    menu: rolltableMenu,
    inline: rolltableInline
  },
  compendium: {
    full: compendiumFull,
    inline: inlineCompendium
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
};


export async function getDocument(identifier, expectedDocumentType) {

  // try identifier as uuid
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
  var collection
  switch (expectedDocumentType) {
    case undefined:
      throw "LMJE.SYSTEM.getDocument.noExpectedDocumentType";
    case "Actor":
      collection = game.actors
      break;
    case "Scene":
      collection = game.scenes
      break;
    case "Playlist":
      collection = game.playlists
      break;
    case "JournalEntry":
      collection = game.journal
      break;
    case "RollTable":
      collection = game.tables
      break;

    default:
      throw "LMJE.SYSTEM.getDocument.expectedTypeNotFound";
  }

  // try identifier as ID
  doc = collection.get(identifier);
  if (doc) {
    return doc;
  }
  // try identifier as Name
  doc = collection.getName(identifier);
  if (doc) {
    return doc;
  }
  
  throw "LMJE.SYSTEM.getDocument.noDocumentFound";
}

export function initHandlebarsHelpers() {
  Handlebars.registerHelper('isdefined', function (value) {
    return value !== undefined;
  });  
  Handlebars.registerHelper('ifCond', function (v1, operator, v2, options) {

    switch (operator) {
        case '==':
            return (v1 == v2) ? options.fn(this) : options.inverse(this);
        case '===':
            return (v1 === v2) ? options.fn(this) : options.inverse(this);
        case '!=':
            return (v1 != v2) ? options.fn(this) : options.inverse(this);
        case '!==':
            return (v1 !== v2) ? options.fn(this) : options.inverse(this);
        case '<':
            return (v1 < v2) ? options.fn(this) : options.inverse(this);
        case '<=':
            return (v1 <= v2) ? options.fn(this) : options.inverse(this);
        case '>':
            return (v1 > v2) ? options.fn(this) : options.inverse(this);
        case '>=':
            return (v1 >= v2) ? options.fn(this) : options.inverse(this);
        case '&&':
            return (v1 && v2) ? options.fn(this) : options.inverse(this);
        case '||':
            return (v1 || v2) ? options.fn(this) : options.inverse(this);
        default:
            return options.inverse(this);
    }
});
}

export function invalidHtml(error) {
  return /* html */ `
    <a class="content-link broken" draggable="true" data-id="null" data-uuid="asd">
      <i class="fas fa-unlink"></i>LMJE: ${error}
    </a>
  `;
}
