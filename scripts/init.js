import { enricherFunctions, patterns, templates } from "./helpers.js";

Hooks.on("init", () => {
  //load templates for generic enrichers
  try {
    loadTemplates(
      [
        templates.whisperTable,
        templates.chatTable,
        templates.compendium.inline,
      ]
    );
    console.log("LMJE | Loaded templates");
  } catch (error) {
    console.error("LMJE | Failed to load templates\n", error);
  }

  //add generic enrichers to TextEditor
  try {
    CONFIG.TextEditor.enrichers.push(
      {
        pattern: patterns.scene.menu,
        enricher: enricherFunctions.scene.menu,
      },
      {
        pattern: patterns.toc,
        enricher: enricherFunctions.toc,
      },
      {
        pattern: patterns.scene.inline,
        enricher: enricherFunctions.scene.inline,
      },
      {
        pattern: patterns.playlist.inline,
        enricher: enricherFunctions.playlist.inline,
      },
      {
        pattern: patterns.playlist.menu,
        enricher: enricherFunctions.playlist.menu,
      },
      {
        pattern: patterns.chat.whisper,
        enricher: enricherFunctions.chat.whisper,
      },
      {
        pattern: patterns.chat.chat,
        enricher: enricherFunctions.chat.chat,
      },
      {
        pattern: patterns.compendium.menu,
        enricher: enricherFunctions.compendium.menu,
      },
      {
        pattern: patterns.compendium.inline,
        enricher: enricherFunctions.compendium.inline,
      },
      {
        pattern: patterns.compendium.full,
        enricher: enricherFunctions.compendium.full,
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
          enricher: enricherFunctions.character.dnd,
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
          enricher: enricherFunctions.character.pf2e,
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
