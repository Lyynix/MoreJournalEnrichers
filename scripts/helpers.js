import { EnricherPattern } from "./enricherPattern.js";
import { characterDnD, characterPF2e } from "./enrichers/characterEnricher.js";
import { chat, whisper } from "./enrichers/chatEnrichers.js";
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
    .setReferenceTypes("ID", "SINGLE", true)
    .setConfigTypes("SIZE", "SINGLE", true)
    .getRegex(),
  character: new EnricherPattern()
    .addName("Character")
    .setReferenceTypes("ID", "SINGLE", false)
    .getRegex(),
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
      .setReferenceTypes("ID", "MULTIPLE", false)
      .getRegex(),
    inline: new EnricherPattern()
      .addName("InlineScene")
      .setReferenceTypes("ID", "SINGLE", false)
      .setLabelTypes("TEXT", "SINGLE", true)
      .getRegex(),
  },
  playlist: {
    menu: new EnricherPattern()
      .addName("PlaylistMenu")
      .setReferenceTypes("ID", "MULTIPLE", false)
      .getRegex(),
    inline: new EnricherPattern()
      .addName("Playlist") // DEPRECATED
      .addName("InlinePlaylist")
      .setReferenceTypes("ID", "SINGLE", false)
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

export function invalidHtml(error) {
  return /* html */ `
    <a class="content-link broken" draggable="true" data-id="null" data-uuid="asd">
      <i class="fas fa-unlink"></i>LMJE: ${error}
    </a>
  `;
}
