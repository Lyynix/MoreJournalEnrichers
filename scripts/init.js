import { characterDnD, characterPF2e } from "./enrichers/characterEnricher.js";
import { chat, whisper } from "./enrichers/chatEnrichers.js";
import { toc } from "./enrichers/journalEnrichers.js";
import { playlistMenu, inlinePlaylist } from "./enrichers/playlistEnrichers.js";
import { sceneMenu, inlineScene } from "./enrichers/sceneEnrichers.js";
import { patterns, templates } from "./helpers.js";

Hooks.on("init", () => {
  console.log("LMJE | Loading templates");
  loadTemplates([templates.whisperTable, templates.chatTable]);

  console.log("LMJE | Initializing generic enrichers");
  CONFIG.TextEditor.enrichers.push(
    {
      pattern: patterns.scene.menu,
      enricher: sceneMenu,
    },
    {
      pattern: patterns.toc,
      enricher: toc,
    },
    {
      pattern: patterns.scene.inline,
      enricher: inlineScene,
    },
    {
      pattern: patterns.playlist.inline,
      enricher: inlinePlaylist,
    },
    {
      pattern: patterns.playlist.menu,
      enricher: playlistMenu,
    },
    {
      pattern: patterns.chat.whisper,
      enricher: whisper,
    },
    {
      pattern: patterns.chat.chat,
      enricher: chat,
    }
  );

  switch (game.system.id) {
    case "dnd5e":
      console.log("LMJE | Loading templates for dnd5e");
      loadTemplates([templates.character.dnd]);

      console.log("LMJE | Initializing enrichers for dnd5e");

      CONFIG.TextEditor.enrichers.push({
        pattern: patterns.character,
        enricher: characterDnD,
      });
      break;

    case "pf2e":
      console.log("LMJE | Loading templates for pf2e");
      loadTemplates([templates.character.pf2e]);

      console.log("LMJE | Initializing enrichers for pf2e");

      CONFIG.TextEditor.enrichers.push({
        pattern: patterns.character,
        enricher: characterPF2e,
      });

    default:
      break;
  }
});
