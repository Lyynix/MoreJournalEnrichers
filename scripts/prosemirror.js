import { templates } from "./helpers.js";

var activeSelectDocumentPromiseResolve;
var activeSelectDocumentPromiseReject;
var activeSelectDocumentPrevMaxed;
var activeSelectDocumentPrevWindows;

export function initProsemirrorButtons() {
  game.keybindings.register(
    "lyynix-more-journal-enrichers",
    "escapeFromSelectDocument",
    {
      name: "Excape from select Socument",
      editable: [{ key: "Escape" }],
      onDown: () => {
        if (activeSelectDocumentPromiseReject != undefined)
          activeSelectDocumentPromiseReject("LMJE.PROSEMIRROR.INFO.Cancelled");
      },
    }
  );

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
              cmd: functions.insertInline.bind(
                options,
                "RollTable",
                "RollTable"
              ),
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
              cmd: functions.insertFull.bind(
                options,
                "Compendium",
                "CompendiumCollection"
              ),
            },
            {
              title: "LMJE.PROSEMIRROR.ENRICHERS.COMPENDIUM.Inline",
              action: "compendium-inline",
              cmd: functions.insertInline.bind(
                options,
                "Compendium",
                "CompendiumCollection"
              ),
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
  activeSelectDocumentPrevMaxed = [];
  activeSelectDocumentPrevWindows = [];

  // teach user how to cancel selection
  let humanBinding = KeybindingsConfig._humanizeBinding(
    game.keybindings.bindings.get(
      "lyynix-more-journal-enrichers.escapeFromSelectDocument"
    )[0]
  );
  ui.notifications.info(
    game.i18n.format("LMJE.PROSEMIRROR.INFO.Cancel", {
      keybinding: humanBinding,
    })
  );

  // loop over all windows
  Object.values(ui.windows).forEach(async (w) => {
    activeSelectDocumentPrevWindows.push(w);
    // ignore minimized windows
    if (w._minimized) return;

    // add maximized window and position to list
    activeSelectDocumentPrevMaxed.push({
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

  let hook;
  let sidebarTab;
  switch (expectedType) {
    case "CompendiumCollection":
      hook = "renderCompendium";
      sidebarTab = "compendium";
      break;
    case "Scene":
      hook = "renderDocumentSheet";
      sidebarTab = "scenes";
      break;
    case "Playlist":
      hook = "renderDocumentSheet";
      sidebarTab = "playlists";
      break;
    case "RollTable":
      hook = "renderDocumentSheet";
      sidebarTab = "tables";
      break;
    case "JournalEntry":
      hook = "renderDocumentSheet";
      sidebarTab = "journal";
      break;

    default:
      hook = "renderDocumentSheet";
      sidebarTab = ui.sidebar.activeTab;
      break;
  }

  ui.sidebar.activateTab(sidebarTab);

  // Hooks on open Document Sheet (needs to be edited)
  Hooks.once(hook, (config, dom, options) => {
    setTimeout(() => {
      resetPrevWindows();

      switch (expectedType) {
        case "CompendiumCollection":
          if (config.collection.name === expectedType) {
            activeSelectDocumentPromiseResolve(config.collection);
          } else {
            activeSelectDocumentPromiseReject(
              "LMJE.PROSEMIRROR.INFO.WrongType"
            );
          }
          break;

        default:
          if (config.document.documentName === expectedType) {
            activeSelectDocumentPromiseResolve(config.document);
          } else {
            console.log(expectedType);
            activeSelectDocumentPromiseReject(
              "LMJE.PROSEMIRROR.INFO.WrongType"
            );
          }
          break;
      }
      activeSelectDocumentPromiseResolve = undefined;
      activeSelectDocumentPromiseReject = undefined;
    }, 100);
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
      // teach user how to cancel selection
      notifyCancelBinding();

      selectDocument("JournalEntry")
        .then((document) => {
          // console.log(document);
          this.prosemirror.view.dispatch(
            this.prosemirror.view.state.tr
              .insertText(
                `@${ordered ? "Ordered" : ""}ToC${getIdentifier(document)}`
              )
              .scrollIntoView()
          );
        })
        .catch((reason) => {
          ui.notifications.warn(reason, { localize: true });
          resetPrevWindows();
        });
    }
  },
  insertMenu: async function (type, docType) {
    let cancelled = false;
    let selectedIds = [];

    notifyCancelBinding();

    while (!cancelled) {
      try {
        let document = await selectDocument(docType);

        // console.log(document);
        selectedIds.push(getIdentifier(document, docType).match(/\[(.*)\]/)[1]);
        ui.notifications.info(
          game.i18n.format("LMJE.PROSEMIRROR.INFO.AddedDocument", {
            docName: document.name,
          })
        );

        // close selected document
        setTimeout(() => {
          Object.values(ui.windows).forEach((window) => {
            let included = false;
            activeSelectDocumentPrevWindows.forEach((prevWindow) => {
              if (window.id === prevWindow.id) {
                included = true;
                // console.log("windows have same id: ", window, prevWindow)
              }
            });
            if (!included) window.close();
          });
        }, 50);
      } catch (reason) {
        switch (reason) {
          case "LMJE.PROSEMIRROR.INFO.WrongType":
            ui.notifications.warn(reason, { localize: true });
            break;

          default:
            cancelled = true;
            break;
        }
      }
    }
    resetPrevWindows();

    this.prosemirror.view.dispatch(
      this.prosemirror.view.state.tr
        .insertText(`@${type}Menu[${selectedIds.join("; ")}]`)
        .scrollIntoView()
    );
  },
  insertFull: function (type, docType) {
    notifyCancelBinding();

    selectDocument(docType)
      .then((document) => {
        // console.log(document);
        getTextInputWithDialog(
        game.i18n.localize("LMJE.PROSEMIRROR.TEXTINPUTDIALOG.TITLE.Alias"),
        game.i18n.localize("LMJE.PROSEMIRROR.TEXTINPUTDIALOG.DESCRIPTION.Alias"),
        false
      ).then((text) => {
          this.prosemirror.view.dispatch(
            this.prosemirror.view.state.tr
              .insertText(`@${type}Full${getIdentifier(document, docType)}{${text}}`)
              .scrollIntoView()
          );
        });
      })
      .catch((reason) => {
        ui.notifications.warn(reason, { localize: true });
        resetPrevWindows();
      });
  },
  insertInline: function (type, docType) {
    notifyCancelBinding();

    selectDocument(docType)
      .then((document) => {
        // console.log(document);

        getTextInputWithDialog(
          game.i18n.localize("LMJE.PROSEMIRROR.TEXTINPUTDIALOG.TITLE.Alias"),
          game.i18n.localize("LMJE.PROSEMIRROR.TEXTINPUTDIALOG.DESCRIPTION.Alias"),
          false
        ).then((text) => {
          this.prosemirror.view.dispatch(
            this.prosemirror.view.state.tr
              .insertText(`@${type}Inline${getIdentifier(document, docType)}{${text}}`)
              .scrollIntoView()
          );
        })
      })
      .catch((reason) => {
        ui.notifications.warn(reason, { localize: true });
        resetPrevWindows();
      });
  },
  insertChat: async function (type) {
    try {
      let text = await getTextInputWithDialog(
        game.i18n.localize("LMJE.PROSEMIRROR.TEXTINPUTDIALOG.TITLE.Chat"),
        game.i18n.localize("LMJE.PROSEMIRROR.TEXTINPUTDIALOG.DESCRIPTION.Chat"),
        true
      );
      text = text.replace(/\n\s*/gm, "; ")

      this.prosemirror.view.dispatch(
        this.prosemirror.view.state.tr
          .insertText(`@Chat${type}{${text}}`)
          .scrollIntoView()
      );
    } catch (error) {
            
    }
  },
};

/**
 * Prompts a Dialog window where the user should enter text.
 * @param {String} title The title of the dialog window
 * @param {String} description The description of the dialog window
 * @param {Boolean} multiline is the text input multiline
 * @returns 
 */
async function getTextInputWithDialog(title, description, multiline) {
  return new Promise(async (resolve, reject) => {
    new Dialog({
      title: title,
      content: await renderTemplate(templates.prosemirror.enterTextFormApplication, {description: description, multiline: multiline}),
      buttons: {
        accept: {
          icon: '<i class="fas fa-check"></i>',
          label: game.i18n.localize("LMJE.PROSEMIRROR.TEXTINPUTDIALOG.Accept"),
          callback: () => {
            let text = $("#lmje-enricher-text").first().val();
            resolve(text);
          },
        },
        cancel: {
          icon: '<i class="fas fa-times"></i>',
          label: game.i18n.localize("LMJE.PROSEMIRROR.TEXTINPUTDIALOG.Cancel"),
          callback: () => {
            reject();
          },
        },
      },
      default: "accept",
    }).render(true);
  });
}

function notifyCancelBinding() {
  let humanBinding = KeybindingsConfig._humanizeBinding(
    game.keybindings.bindings.get(
      "lyynix-more-journal-enrichers.escapeFromSelectDocument"
    )[0]
  );
  ui.notifications.info(
    game.i18n.format("LMJE.PROSEMIRROR.INFO.Cancel", {
      keybinding: humanBinding,
    })
  );
}

function resetPrevWindows() {
  Object.values(ui.windows).forEach((window) => {
    let included = false;
    activeSelectDocumentPrevWindows.forEach((prevWindow) => {
      if (window.id === prevWindow.id) {
        included = true;
        // console.log("windows have same id: ", window, prevWindow)
      }
    });
    if (!included) window.close();
  });
  activeSelectDocumentPrevMaxed.forEach((prev) => {
    prev.window.setPosition(prev.position);
    if (!prev.minimized) prev.window.maximize();
  });
}

function getIdentifier(document, docType = "nan") {
  switch (docType) {
    case "CompendiumCollection":
      return `[${document.title}](${document.metadata.packageName})`;

    default:
      return `[${document.uuid}]`;
  }
}
