import { characterDnD, characterPF2e } from "./enrichers/characterEnricher.js";
import { chat, whisper } from "./enrichers/chatEnrichers.js";
import { toc } from "./enrichers/journalEnrichers.js";
import { playlistMenu, inlinePlaylist } from "./enrichers/playlistEnrichers.js";
import { sceneMenu, inlineScene } from "./enrichers/sceneEnrichers.js";
import { patterns, templates } from "./helpers.js";

Hooks.on("init", () => {
  //load templates for generic enrichers
  try {
    loadTemplates([templates.whisperTable, templates.chatTable]);
    console.log("LMJE | Loaded templates");
  } catch (error) {
    console.error("LMJE | Failed to load templates\n", error);
  }

  //add generic enrichers to TextEditor
  try {
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
    console.log("LMJE | Initialized generic enrichers");
  } catch (error) {
    console.error("LMJE | Failed to initialize generic enrichers\n", error);
  }

  // Repeat for system specific enrichers
  switch (game.system.id) {
    case "dnd5e":
      try {
        loadTemplates([templates.character.dnd]);
        console.log("LMJE | Loaded templates for dnd5e");
      } catch (error) {
        console.error("LMJE | Failed to load dnd5 templates\n", error);
      }

      try {
        CONFIG.TextEditor.enrichers.push({
          pattern: patterns.character,
          enricher: characterDnD,
        });
        console.log("LMJE | Initialized enrichers for dnd5e");
      } catch (error) {
        console.error("LMJE | Failed to initialize dnd5 enrichers\n", error);
      }
      break;

    case "pf2e":
      try {
        loadTemplates([templates.character.pf2e]);
        console.log("LMJE | Loaded templates for pf2e");
      } catch (error) {
        console.error("LMJE | Failed to load pf2e templates\n", error);
      }

      try {
        CONFIG.TextEditor.enrichers.push({
          pattern: patterns.character,
          enricher: characterPF2e,
        });
        console.log("LMJE | Initialized enrichers for pf2e");
      } catch (error) {
        console.error("LMJE | Failed to initialize pf2e enrichers\n", error);
      }
      break;

    default:
      break;
  }
});
