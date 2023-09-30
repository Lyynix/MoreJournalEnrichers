import { enricherFunctions, initHandlebarsHelpers, patterns, postWelcomeMessage, templates } from "./helpers.js";

Hooks.on("init", () => {
  
  //load templates for generic enrichers
  try {
    loadTemplates([
      templates.system.welcomeMessage,
      templates.inline,
      templates.whisperTable,
      templates.chatTable,
      templates.compendium.inline,
      templates.compendium.full,
      templates.rolltable.full,
      templates.rolltable.menu
    ]);
    console.log("LMJE | Loaded templates");
  } catch (error) {
    console.error("LMJE | Failed to load templates\n", error);
  }

  //add Handlebars helpers
  initHandlebarsHelpers()
  
  game.settings.register('lyynix-more-journal-enrichers', 'welcome-message', {
    name: game.i18n.localize('LMJE.SYSTEM.welcomeMessage.name'),
    hint: game.i18n.localize('LMJE.SYSTEM.welcomeMessage.hint'),
    scope: 'world',     // "world" = sync to db, "client" = local storage
    config: true,       // false if you dont want it to show in module config
    type: Boolean,       // Number, Boolean, String, Object
    default: true,
  });
  console.log("LMJE | Registered settings");

  //add generic enrichers to TextEditor
  try {
    CONFIG.TextEditor.enrichers.push(
      {
        label: "LMJE - Journal - Table of Contents",
        pattern: patterns.toc.unordered,
        enricher: enricherFunctions.toc.unordered,
      },
      {
        label: "LMJE - Journal - Ordered Table of Contents",
        pattern: patterns.toc.ordered,
        enricher: enricherFunctions.toc.ordered,
      },
      {
        label: "LMJE - Scene - Menu",
        pattern: patterns.scene.menu,
        enricher: enricherFunctions.scene.menu,
      },
      {
        label: "LMJE - Scene - Full",
        pattern: patterns.scene.full,
        enricher: enricherFunctions.scene.full
      },
      {
        label: "LMJE - Scene - Inline",
        pattern: patterns.scene.inline,
        enricher: enricherFunctions.scene.inline,
      },
      {
        label: "LMJE - Rolltable - Full",
        pattern: patterns.rolltable.full,
        enricher: enricherFunctions.rolltable.full,
      },
      {
        label: "LMJE - Rolltable - Menu",
        pattern: patterns.rolltable.menu,
        enricher: enricherFunctions.rolltable.menu,
      },
      {
        label: "LMJE - Rolltable - Inline",
        pattern: patterns.rolltable.inline,
        enricher: enricherFunctions.rolltable.inline,
      },
      {
        label: "LMJE - Compendium - Full",
        pattern: patterns.compendium.full,
        enricher: enricherFunctions.compendium.full,
      },
      {
        label: "LMJE - Compendium - Inline",
        pattern: patterns.compendium.inline,
        enricher: enricherFunctions.compendium.inline,
      },
      {
        label: "LMJE - Playlist - Menu",
        pattern: patterns.playlist.menu,
        enricher: enricherFunctions.playlist.menu,
      },
      {
        label: "LMJE - Playlist - Inline",
        pattern: patterns.playlist.inline,
        enricher: enricherFunctions.playlist.inline,
      },
      {
        label: "LMJE - Chat - Post",
        pattern: patterns.chat.chat,
        enricher: enricherFunctions.chat.chat,
      },
      {
        label: "LMJE - Chat - Whisper",
        pattern: patterns.chat.whisper,
        enricher: enricherFunctions.chat.whisper,
      }
    );
    console.log("LMJE | Initialized generic enrichers");
  } catch (error) {
    console.error("LMJE | Failed to initialize generic enrichers\n", error);
  }
  //TODO: remove to add system specific enrichers
  return;

  
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

Hooks.on('ready', () => {
  if (game.settings.get('lyynix-more-journal-enrichers', 'welcome-message')) 
    postWelcomeMessage()
})
