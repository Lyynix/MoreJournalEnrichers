import { EnricherPattern } from "./enricherPattern.js";
import { characterDnD, characterPF2e } from "./enrichers/characterEnricher.js";
import { chat, whisper } from "./enrichers/chatEnrichers.js";
import { compendiumFull, inlineCompendium } from "./enrichers/compendiumEnrichers.js";
import { tableOfContents } from "./enrichers/journalEnrichers.js";
import { inlinePlaylist, playlistMenu } from "./enrichers/playlistEnrichers.js";
import { inlineScene, sceneMenu } from "./enrichers/sceneEnrichers.js";

export const templates = {
  whisperTable:
    "modules/lyynix-more-journal-enrichers/templates/whisperTable.hbs",
  chatTable: "modules/lyynix-more-journal-enrichers/templates/chatTable.hbs",
  character: {
    dnd: "modules/lyynix-more-journal-enrichers/templates/characterDnD.html",
    pf2e: "modules/lyynix-more-journal-enrichers/templates/characterPF2e.html",
  },
};

export const patterns = {
  toc: new EnricherPattern()
    .addName("ToC")
    .setReferenceTypes("IDENTIFIER", "SINGLE", true)
    .setConfigTypes("SIZE", "SINGLE", true)
    .getRegex(),
  character: new EnricherPattern()
    .addName("Character")
    .setReferenceTypes("IDENTIFIER", "SINGLE", false)
    .getRegex(),
  compendium: {
    full: new EnricherPattern()
      .addName("Compendium")
      .setReferenceTypes("IDENTIFIER", "SINGLE", false)
      .setLabelTypes("TEXT", "SINGLE", true)
      .getRegex(),
    inline: new EnricherPattern()
      .addName("InlineCompendium")
      .setReferenceTypes("IDENTIFIER", "SINGLE", false)
      .setLabelTypes("TEXT", "SINGLE", true)
      .getRegex()
  },
  chat: {
    chat: new EnricherPattern()
      .addName("Chat")
      .setLabelTypes("TEXT", "SINGLE", false)
      .getRegex(),
    whisper: new EnricherPattern()
      .addName("Whisper")
      .setLabelTypes("TEXT", "SINGLE", false)
      .getRegex(),
  },
  scene: {
    menu: new EnricherPattern()
      .addName("SceneMenu")
      .setReferenceTypes("IDENTIFIER", "MULTIPLE", false)
      .getRegex(),
    inline: new EnricherPattern()
      .addName("InlineScene")
      .setReferenceTypes("IDENTIFIER", "SINGLE", false)
      .setLabelTypes("TEXT", "SINGLE", true)
      .getRegex(),
  },
  playlist: {
    menu: new EnricherPattern()
      .addName("PlaylistMenu")
      .setReferenceTypes("IDENTIFIER", "MULTIPLE", false)
      .getRegex(),
    inline: new EnricherPattern()
      .addName("Playlist") // DEPRECATED
      .addName("InlinePlaylist")
      .setReferenceTypes("IDENTIFIER", "SINGLE", false)
      .setLabelTypes("TEXT", "SINGLE", true)
      .getRegex(),
  },
};

export const enricherFunctions = {
  toc: tableOfContents,
  character: {
    dnd: characterDnD,
    pf2e: characterPF2e,
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

export function invalidHtml(error) {
  return /* html */ `
    <a class="content-link broken" draggable="true" data-id="null" data-uuid="asd">
      <i class="fas fa-unlink"></i>LMJE: ${error}
    </a>
  `;
}
