import { templates } from "./helpers.js";

var activeSelectDocumentPromiseResolve
var activeSelectDocumentPromiseReject

export function initProsemirrorButtons() {
  game.keybindings.register("lyynix-more-journal-enrichers", "escapeFromSelectDocument", {
    name: "Excape from select Socument",
    editable: [
      {key: "Escape"}
    ],
    onDown: () => {
      if (activeSelectDocumentPromiseReject != undefined)
        activeSelectDocumentPromiseReject("Cancelled select document")
    }
  })
  
  Hooks.on("getProseMirrorMenuDropDowns", (proseMirrorMenu, dropdowns) => {
    // console.log("LMJE |", proseMirrorMenu, dropdowns);

    let options = {
      prosemirror: proseMirrorMenu,
    };

    dropdowns.journalEnrichers = {
      action: "enricher",
      // icon: '<i class="fa-solid fa-wand-magic"></i>',
      title: "LMJE.PROSEMIRROR.ENRICHERS.MenuTitle",
      entries: [
        {
          title: "LMJE.PROSEMIRROR.ENRICHERS.TOC.Category",
          action: "toc-list",
          children: [
            {
              title: "LMJE.PROSEMIRROR.ENRICHERS.TOC.toc",
              action: "toc",
              cmd: functions.insertToC.bind(options, false, false),
            },
            {
              title: "LMJE.PROSEMIRROR.ENRICHERS.TOC.tocs",
              action: "tocs",
              cmd: functions.insertToC.bind(options, true, false),
            },
            {
              title: "LMJE.PROSEMIRROR.ENRICHERS.TOC.otoc",
              action: "otoc",
              cmd: functions.insertToC.bind(options, false, true),
            },
            {
              title: "LMJE.PROSEMIRROR.ENRICHERS.TOC.otocs",
              action: "otocs",
              cmd: functions.insertToC.bind(options, true, true),
            },
          ],
        },
        {
          title: "LMJE.PROSEMIRROR.ENRICHERS.SCENES.Category",
          action: "scene-list",
          children: [
            {
              title: "LMJE.PROSEMIRROR.ENRICHERS.SCENES.Menu",
              action: "scene-menu",
              cmd: functions.insertMenu.bind(options, "Scene", "Scene"),
            },
            {
              title: "LMJE.PROSEMIRROR.ENRICHERS.SCENES.Full",
              action: "scene-full",
              cmd: functions.insertFull.bind(options, "Scene", "Scene"),
            },
            {
              title: "LMJE.PROSEMIRROR.ENRICHERS.SCENES.Inline",
              action: "scene-inline",
              cmd: functions.insertInline.bind(options, "Scene", "Scene"),
            },
          ],
        },
        {
          title: "LMJE.PROSEMIRROR.ENRICHERS.ROLLTABLES.Category",
          action: "roltable-list",
          children: [
            {
              title: "LMJE.PROSEMIRROR.ENRICHERS.ROLLTABLES.Menu",
              action: "rolltable-menu",
              cmd: functions.insertMenu.bind(options, "RollTable", "RollTable"),
            },
            {
              title: "LMJE.PROSEMIRROR.ENRICHERS.ROLLTABLES.Full",
              action: "rolltable-full",
              cmd: functions.insertFull.bind(options, "RollTable", "RollTable"),
            },
            {
              title: "LMJE.PROSEMIRROR.ENRICHERS.ROLLTABLES.Inline",
              action: "rolltable-inline",
              cmd: functions.insertInline.bind(options, "RollTable", "RollTable"),
            },
          ],
        },
        {
          title: "LMJE.PROSEMIRROR.ENRICHERS.PLAYLIST.Category",
          action: "playlist-list",
          children: [
            {
              title: "LMJE.PROSEMIRROR.ENRICHERS.PLAYLIST.Menu",
              action: "playlist-menu",
              cmd: functions.insertMenu.bind(options, "Playlist", "Playlist"),
            },
            {
              title: "LMJE.PROSEMIRROR.ENRICHERS.PLAYLIST.Inline",
              action: "playlist-inline",
              cmd: functions.insertInline.bind(options, "Playlist", "Playlist"),
            },
          ],
        },
        {
          title: "LMJE.PROSEMIRROR.ENRICHERS.COMPENDIUM.Category",
          action: "compendium-list",
          children: [
            {
              title: "LMJE.PROSEMIRROR.ENRICHERS.COMPENDIUM.Full",
              action: "compendium-full",
              cmd: functions.insertFull.bind(options, "Compendium", "CompendiumCollection"),
            },
            {
              title: "LMJE.PROSEMIRROR.ENRICHERS.COMPENDIUM.Inline",
              action: "compendium-inline",
              cmd: functions.insertInline.bind(options, "Compendium", "CompendiumCollection"),
            },
          ],
        },
        {
          title: "LMJE.PROSEMIRROR.ENRICHERS.CHAT.Category",
          action: "chat-list",
          children: [
            {
              title: "LMJE.PROSEMIRROR.ENRICHERS.CHAT.Post",
              action: "chat-post",
              cmd: functions.insertChat.bind(options, "Post"),
            },
            {
              title: "LMJE.PROSEMIRROR.ENRICHERS.CHAT.Whisper",
              action: "chat-whisper",
              cmd: functions.insertChat.bind(options, "Whisper"),
            },
          ],
        },
      ],
    };
  });
}

async function selectDocument(expectedType) {
  // array to store all maximized windows
  let prevMaximized = [];
  let prevWindows = [];

  // loop over all windows
  Object.values(ui.windows).forEach(async (w) => {
    prevWindows.push(w);
    // ignore minimized windows
    if (w._minimized) return;

    // add maximized window and position to list
    prevMaximized.push({
      window: w,
      position: { ...w.position },
      minimized: w._minimized,
      id: w.id,
    });

    // minimize window and move to top left
    await w.maximize();
    w.setPosition({ ...w.position, ...{ left: 0, top: 0 } });
    w.minimize();
  });

  let result = new Promise((resolve, reject) => {
    activeSelectDocumentPromiseResolve = resolve;
    activeSelectDocumentPromiseReject = reject;
  });

  let hook
  let sidebarTab
  switch (expectedType) {
    case "CompendiumCollection":
      hook = "renderCompendium"
      sidebarTab = "compendium"
      break;
    case "Scene":
      hook = "renderDocumentSheet"
      sidebarTab = "scenes"
      break;
    case "Playlist":
      hook = "renderDocumentSheet"
      sidebarTab = "playlists"
      break;
    case "RollTable":
      hook = "renderDocumentSheet"
      sidebarTab = "tables"
      break;
    case "JournalEntry":
      hook = "renderDocumentSheet"
      sidebarTab = "journal"
      break;
  
    default:
      hook = "renderDocumentSheet"
      sidebarTab = ui.sidebar.activeTab
      break;
  }

  ui.sidebar.activateTab(sidebarTab)

  // Hooks on open Document Sheet (needs to be edited)
  Hooks.once(hook, (config, dom, options) => {
    setTimeout(() => {
      Object.values(ui.windows).forEach((window) => {
        let included = false;
        prevWindows.forEach((prevWindow) => {
          if (window.id === prevWindow.id) {
            included = true;
            // console.log("windows have same id: ", window, prevWindow)
          }
        });
        if (!included) window.close();
      });

      prevMaximized.forEach((prev) => {
        prev.window.setPosition(prev.position);
        if (!prev.minimized) prev.window.maximize();
      });

      switch (expectedType) {
        case "CompendiumCollection":
          if (config.collection.name === expectedType) {
            activeSelectDocumentPromiseResolve(config.collection);
          } else {
            activeSelectDocumentPromiseReject("Wrong Type. Expected: " + expectedType + " and got: " + config.collection.name);
          }
          break;
      
        default:
          if (config.document.documentName === expectedType) {
            activeSelectDocumentPromiseResolve(config.document);
          } else {
            console.log(expectedType)
            activeSelectDocumentPromiseReject("Wrong Type. Expected: " + expectedType + " and got: " + config.document.documentName);
          }
          break;
      }
      activeSelectDocumentPromiseResolve = undefined
      activeSelectDocumentPromiseReject = undefined
    }, 500);
  });

  return result;
}

var functions = {
  prosemirror: null,
  insertToC: function (selfDocument, ordered) {
    // console.log("LMJE |", this.prosemirror);

    if (selfDocument) {
      this.prosemirror.view.dispatch(
        this.prosemirror.view.state.tr
          .insertText(`@${ordered ? "Ordered" : ""}ToC`)
          .scrollIntoView()
      );
    } else {
      selectDocument("JournalEntry")
        .then((document) => {
          // console.log(document);
          this.prosemirror.view.dispatch(
            this.prosemirror.view.state.tr
              .insertText(`@${ordered ? "Ordered" : ""}ToC${getIdentifier(document)}`)
              .scrollIntoView()
          );
        })
        .catch((reason) => {
          ui.notifications.warn("Test Warning: " + reason);
        });
    }
  },
  insertMenu: function (type, docType ) {
    // TODO select multiple documents
  },
  insertFull: function (type, docType ) {
    selectDocument(docType)
      .then((document) => {
        // console.log(document);
        this.prosemirror.view.dispatch(
          this.prosemirror.view.state.tr
            .insertText(`@${type}Full${getIdentifier(document, docType)}`)
            .scrollIntoView()
        );
      })
      .catch((reason) => {
        ui.notifications.warn("Test Warning: " + reason);
      });
  },
  insertInline: function (type, docType) {
    selectDocument(docType)
      .then((document) => {
        // console.log(document);
        this.prosemirror.view.dispatch(
          this.prosemirror.view.state.tr
            .insertText(`@${type}Inline${getIdentifier(document, docType)}`)
            .scrollIntoView()
        );
      })
      .catch((reason) => {
        ui.notifications.warn("Test Warning: " + reason);
      });
  },
  insertChat: function (type) {
    this.prosemirror.view.dispatch(
      this.prosemirror.view.state.tr
        .insertText(`@Chat${type}{}`)
        .scrollIntoView()
    );
  },
};

function getIdentifier(document, docType = "nan") {
  switch (docType) {
    case "CompendiumCollection":
      return `[${document.title}](${document.metadata.packageName})`
  
    default:
      return `[${document.uuid}]`
  }
}
