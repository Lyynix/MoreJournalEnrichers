import { characterDnD, characterPF2e } from "./enrichers/characterEnricher.js";
import { chat, whisper } from "./enrichers/chatEnrichers.js";
import { toc } from "./enrichers/journalEnrichers.js";
import { playlistMenu, inlinePlaylist } from "./enrichers/playlistEnrichers.js";
import { sceneMenu, inlineScene } from "./enrichers/sceneEnrichers.js";
import { templates } from "./helpers.js";

Hooks.on("init", () => {
  console.log("LMJE | Loading templates");
  loadTemplates([templates.whisperTable, templates.chatTable]);

  console.log("LMJE | Initializing generic enrichers");
  CONFIG.TextEditor.enrichers.push(
    {
      pattern: /@SceneMenu\[((([a-zA-Z0-9])(\;\s[a-zA-Z0-9])*)+)\]/g,
      enricher: sceneMenu,
    },
    {
      pattern:
        /(@ToC)(\[([a-zA-Z0-9]+)\])?(\{(big|bigger|medium|smaller|small)?\})?/g,
      enricher: toc,
    },
    {
      pattern: /@InlineScene\[([a-zA-Z0-9]+)\](\{(.+)\})?/g,
      enricher: inlineScene,
    },
    {
      pattern: /@Playlist\[(\s*[a-zA-Z0-9]+)\](\{(.+)\})?/g,
      enricher: inlinePlaylist,
    },
    {
      pattern: /@PlaylistMenu\[((([a-zA-Z0-9])(\;\s[a-zA-Z0-9])*)+)\]/g,
      enricher: playlistMenu,
    },
    {
      pattern: /@Whisper\{([\s\S]+?)\}/gm,
      enricher: whisper,
    },
    {
      pattern: /@Chat\{([\s\S]+?)\}/gm,
      enricher: chat,
    }
  );

  switch (game.system.id) {
    case "dnd5e":
      console.log("LMJE | Loading templates for dnd5e");
      loadTemplates([
        "modules/lyynix-more-journal-enrichers/templates/characterDnD.html",
      ]);

      console.log("LMJE | Initializing enrichers for dnd5e");

      CONFIG.TextEditor.enrichers.push({
        pattern: /@Character\[([a-zA-Z0-9]+)\]/g,
        enricher: characterDnD,
      });
      break;

    case "pf2e":
      console.log("LMJE | Loading templates for pf2e");
      loadTemplates([
        "modules/lyynix-more-journal-enrichers/templates/characterPF2e.html",
      ]);

      console.log("LMJE | Initializing enrichers for pf2e");

      CONFIG.TextEditor.enrichers.push({
        pattern: /@Character\[([a-zA-Z0-9]+)\]/g /*(\{(((attr|bio)\s?)+)\})?*/,
        enricher: characterPF2e,
      });

    default:
      break;
  }
});
