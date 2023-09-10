import { enricherFunctions, initHandlebarsHelpers, patterns, templates } from "./helpers.js";

Hooks.on("init", () => {
  //load templates for generic enrichers
  try {
    loadTemplates([
      templates.whisperTable,
      templates.chatTable,
      templates.compendium.inline,
      templates.compendium.full,
    ]);
    console.log("LMJE | Loaded templates");
  } catch (error) {
    console.error("LMJE | Failed to load templates\n", error);
  }

  //add Handlebars helpers
  initHandlebarsHelpers()

  //add generic enrichers to TextEditor
  try {
    CONFIG.TextEditor.enrichers.push(
      {
        label: "LMJE - Table of Contents",
        pattern: patterns.toc.unordered,
        enricher: enricherFunctions.toc.unordered,
      },
      {
        label: "LMJE - Ordered Table of Contents",
        pattern: patterns.toc.ordered,
        enricher: enricherFunctions.toc.ordered,
      },
      {
        label: "LMJE - Scene menu",
        pattern: patterns.scene.menu,
        enricher: enricherFunctions.scene.menu,
      },
      {
        label: "LMJE - Inline scene",
        pattern: patterns.scene.inline,
        enricher: enricherFunctions.scene.inline,
      },
      {
        label: "LMJE - Full compendium",
        pattern: patterns.compendium.full,
        enricher: enricherFunctions.compendium.full,
      },
      {
        label: "LMJE - Inline Compendium",
        pattern: patterns.compendium.inline,
        enricher: enricherFunctions.compendium.inline,
      },
      {
        label: "LMJE - Playlist menu",
        pattern: patterns.playlist.menu,
        enricher: enricherFunctions.playlist.menu,
      },
      {
        label: "LMJE - Inline playlist",
        pattern: patterns.playlist.inline,
        enricher: enricherFunctions.playlist.inline,
      },
      {
        label: "LMJE - Chat post",
        pattern: patterns.chat.chat,
        enricher: enricherFunctions.chat.chat,
      },
      {
        label: "LMJE - Whisper post",
        pattern: patterns.chat.whisper,
        enricher: enricherFunctions.chat.whisper,
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
        // loadTemplates([]);
        console.log("LMJE | Loaded templates for dnd5e");
      } catch (error) {
        console.error("LMJE | Failed to load dnd5 templates\n", error);
      }

      try {
        // CONFIG.TextEditor.enrichers.push();
        console.log("LMJE | Initialized enrichers for dnd5e");
      } catch (error) {
        console.error("LMJE | Failed to initialize dnd5 enrichers\n", error);
      }
      break;

    case "pf2e":
      try {
        // loadTemplates([]);
        console.log("LMJE | Loaded templates for pf2e");
      } catch (error) {
        console.error("LMJE | Failed to load pf2e templates\n", error);
      }

      try {
        // CONFIG.TextEditor.enrichers.push();
        console.log("LMJE | Initialized enrichers for pf2e");
      } catch (error) {
        console.error("LMJE | Failed to initialize pf2e enrichers\n", error);
      }
      break;

    default:
      break;
  }
});
