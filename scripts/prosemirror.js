import { editVariables } from "./enrichers/journalEnrichers.js";
import { templates } from "./helpers.js";

// static variables
var activeSelectDocumentPromiseResolve;
var activeSelectDocumentPromiseReject;
var activeSelectDocumentPrevMaxed;
var activeSelectDocumentPrevWindows;

//#region initialization
export function initProsemirrorButtons() {
  game.keybindings.register(
    "lyynix-more-journal-enrichers",
    "escapeFromSelectDocument",
    {
      name: "Escape from select Socument",
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
          title: "LMJE.PROSEMIRROR.ENRICHERS.JOURNAL.Category",
          action: "journal-list",
          children: [
            {
              title: "LMJE.PROSEMIRROR.ENRICHERS.JOURNAL.Page",
              action: "journal-page",
              cmd: functions.insertPage.bind(options),
            },
            {
              title: "LMJE.PROSEMIRROR.ENRICHERS.JOURNAL.Variable",
              action: "journal-variable",
              cmd: functions.insertVariable.bind(options),
            },
            {
              title: "LMJE.PROSEMIRROR.ENRICHERS.JOURNAL.Checkbox",
              action: "journal-checkbox",
              cmd: functions.insertCheckbox.bind(options),
            },
            {
              title: "LMJE.PROSEMIRROR.ENRICHERS.JOURNAL.IfChecked",
              action: "journal-ifchecked",
              cmd: functions.insertIfChecked.bind(options),
            },
          ],
        },
        {
          title: "LMJE.PROSEMIRROR.ENRICHERS.SCENES.Category",
          action: "scene-list",
          children: [
            // {
            //   title: "LMJE.PROSEMIRROR.ENRICHERS.SCENES.Menu",
            //   action: "scene-menu",
            //   cmd: functions.insertMenu.bind(options, "Scene", "Scene"),
            // },
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
            // {
            //   title: "LMJE.PROSEMIRROR.ENRICHERS.ROLLTABLES.Menu",
            //   action: "rolltable-menu",
            //   cmd: functions.insertMenu.bind(options, "RollTable", "RollTable"),
            // },
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
            // {
            //   title: "LMJE.PROSEMIRROR.ENRICHERS.PLAYLIST.Menu",
            //   action: "playlist-menu",
            //   cmd: functions.insertMenu.bind(options, "Playlist", "Playlist"),
            // },
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
        {
          title: "LMJE.PROSEMIRROR.ENRICHERS.Polyglot",
          action: "polyglot",
          cmd: functions.insertPolyglot.bind(options),
        },
      ],
    };
  });
}
//#endregion

//#region Functions
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
          game.i18n.localize(
            "LMJE.PROSEMIRROR.TEXTINPUTDIALOG.DESCRIPTION.Alias"
          ),
          false
        ).then((text) => {
          this.prosemirror.view.dispatch(
            this.prosemirror.view.state.tr
              .insertText(
                !text
                  ? `@${type}Full${getIdentifier(document, docType)}`
                  : `@${type}Full${getIdentifier(document, docType)}{${text}}`
              )
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
          game.i18n.localize(
            "LMJE.PROSEMIRROR.TEXTINPUTDIALOG.DESCRIPTION.Alias"
          ),
          false
        ).then((text) => {
          this.prosemirror.view.dispatch(
            this.prosemirror.view.state.tr
              .insertText(
                !text
                  ? `@${type}Inline${getIdentifier(document, docType)}`
                  : `@${type}Inline${getIdentifier(document, docType)}{${text}}`
              )
              .scrollIntoView()
          );
        });
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
      text = convertLineBreak(text);

      this.prosemirror.view.dispatch(
        this.prosemirror.view.state.tr
          .insertText(`@Chat${type}{${text}}`)
          .scrollIntoView()
      );
    } catch (error) {}
  },
  insertVariable: async function () {
    getVariableName().then(
      (key) => {
        this.prosemirror.view.dispatch(
          this.prosemirror.view.state.tr
            .insertText(`@Var[${key}]`)
            .scrollIntoView()
        );
      },
      () => {}
    );
  },
  insertCheckbox: async function () {
    let cbname = await getTextInputWithDialog(
      game.i18n.localize("LMJE.PROSEMIRROR.TEXTINPUTDIALOG.TITLE.Checkbox"),
      game.i18n.localize(
        "LMJE.PROSEMIRROR.TEXTINPUTDIALOG.DESCRIPTION.Checkbox"
      ),
      false
    );
    let cbalias;
    cbalias = await getTextInputWithDialog(
      game.i18n.localize("LMJE.PROSEMIRROR.TEXTINPUTDIALOG.TITLE.CBLabel"),
      game.i18n.localize(
        "LMJE.PROSEMIRROR.TEXTINPUTDIALOG.DESCRIPTION.CBLabel"
      ),
      false
    ).catch(() => (cbalias = ""));
    this.prosemirror.view.dispatch(
      this.prosemirror.view.state.tr
        .insertText(!cbalias ? `@CB[${cbname}]` : `@CB[${cbname}]{${cbalias}}`)
        .scrollIntoView()
    );
  },
  insertIfChecked: async function () {
    let checkboxes = game.settings.get(
      "lyynix-more-journal-enrichers",
      "checkboxes"
    );
    let checkboxnames = Object.keys(checkboxes);

    let cbname = await getTextInputWithDialog(
      game.i18n.localize("LMJE.PROSEMIRROR.TEXTINPUTDIALOG.TITLE.IfChecked"),
      game.i18n.localize(
        "LMJE.PROSEMIRROR.TEXTINPUTDIALOG.DESCRIPTION.IfChecked"
      ),
      false,
      checkboxnames
    );
    let cbcontent = await getTextInputWithDialog(
      game.i18n.localize(
        "LMJE.PROSEMIRROR.TEXTINPUTDIALOG.TITLE.IfCheckedContent"
      ),
      game.i18n.localize(
        "LMJE.PROSEMIRROR.TEXTINPUTDIALOG.DESCRIPTION.IfCheckedContent"
      ),
      true
    );
    cbcontent = convertLineBreak(cbcontent);

    this.prosemirror.view.dispatch(
      this.prosemirror.view.state.tr
        .insertText(`@IfChecked[${cbname}]{${cbcontent}}`)
        .scrollIntoView()
    );
  },
  insertPolyglot: async function () {
    let polyglotLanguage = await getTextInputWithDialog(
      game.i18n.localize(
        "LMJE.PROSEMIRROR.TEXTINPUTDIALOG.TITLE.PolyglotLanguage"
      ),
      game.i18n.localize(
        "LMJE.PROSEMIRROR.TEXTINPUTDIALOG.DESCRIPTION.PolyglotLanguage"
      ),
      false,
      game.polyglot.knownLanguages
    );
    let polyglotText = await getTextInputWithDialog(
      game.i18n.localize("LMJE.PROSEMIRROR.TEXTINPUTDIALOG.TITLE.PolyglotText"),
      game.i18n.localize(
        "LMJE.PROSEMIRROR.TEXTINPUTDIALOG.DESCRIPTION.PolyglotText"
      ),
      true
    );

    this.prosemirror.view.dispatch(
      this.prosemirror.view.state.tr
        .insertText(
          `@Polyglot[${polyglotLanguage}]{${convertLineBreak(polyglotText)}}`
        )
        .scrollIntoView()
    );
  },
  insertPage: function () {
    selectDocument("JournalEntry", false).then((document) => {
      var pageNames = document.pages.contents.map((d) => d.name);

      setTimeout(() => {
        document.sheet.minimize();
      }, 150);

      getFromListWithDialog(
        "LMJE.PROSEMIRROR.TEXTINPUTDIALOG.TITLE.Page",
        "LMJE.PROSEMIRROR.TEXTINPUTDIALOG.DESCRIPTION.Page",
        pageNames
      ).then((pageName) => {
        var page = document.pages.getName(pageName);

        resetPrevWindows();

        this.prosemirror.view.dispatch(
          this.prosemirror.view.state.tr
            .insertText(`@Page[${page.uuid}]`)
            .scrollIntoView()
        );
      });
    });
  },
};

//#endregion

//#region Helpers

function convertLineBreak(text) {
  text = text.replace(/(\n+\s*)+/gm, "; ");
  return text;
}

async function getFromListWithDialog(title, description, strings) {
  return new Promise(async (resolve, reject) => {
    var html = await renderTemplate(templates.journal.chooseString, {
      description: description,
      strings: strings,
    });
    new Dialog({
      title: game.i18n.localize(title),
      content: html,
      buttons: {
        submit: {
          label: game.i18n.localize(
            "LMJE.JOURNAL.VARIABLE.chooseVariablesDialog.submit"
          ),
          callback: () => {
            var selected = document.querySelector('input[name="selectFromList"]:checked')
            resolve(
              selected.value
            );
          },
        },
      },
      default: "submit",
    }).render(true);
  });
}

/**
 * Lets the User pick a valid Variable key or create a new one.
 * @returns
 */
async function getVariableName() {
  return new Promise(async (resolve, reject) => {
    var vars = game.settings.get("lyynix-more-journal-enrichers", "variables");
    renderTemplate(templates.journal.chooseVariable, { keys: vars.keys }).then(
      (html) => {
        new Dialog({
          title: game.i18n.localize(
            "LMJE.JOURNAL.VARIABLE.chooseVariablesDialog.title"
          ),
          content: html,
          buttons: {
            submit: {
              label: game.i18n.localize(
                "LMJE.JOURNAL.VARIABLE.chooseVariablesDialog.submit"
              ),
              callback: () => {
                var key = document.getElementById("LMJE_choosekey").value;
                // console.log("LMJE |", key);

                if (key === "new") {
                  editVariables().then(
                    (edit) => {
                      if (edit.mode !== "edit") reject();

                      resolve(edit.key);
                    },
                    () => reject()
                  );
                } else {
                  resolve(key);
                }
              },
              icon: `<i class="fas fa-save"></i>`,
            },
          },
          default: "submit",
        }).render(true);
      }
    );
  });
}

/**
 * Prompts a Dialog window where the user should enter text.
 * @param {String} title The title of the dialog window
 * @param {String} description The description of the dialog window
 * @param {Boolean} multiline is the text input multiline
 * @returns
 */
async function getTextInputWithDialog(
  title,
  description,
  multiline,
  autocompletelist
) {
  return new Promise(async (resolve, reject) => {
    new Dialog({
      title: title,
      content: await renderTemplate(
        templates.prosemirror.enterTextFormApplication,
        {
          description: description,
          multiline: multiline,
          autocompletelist: autocompletelist,
        }
      ),
      buttons: {
        accept: {
          icon: '<i class="fas fa-check"></i>',
          label: game.i18n.localize("LMJE.PROSEMIRROR.TEXTINPUTDIALOG.Accept"),
          callback: () => {
            let text = $("#lmje-enricher-text").first().val().trim();
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

/**
 * Prompts the user to select a document by clicking.
 * @param {String} expectedType The type of the document (CompendiumCollection, Scene, Playlist, RollTable, JournalEntry)
 * @param {Boolean} resetWindows optionally does not reset opened windows. Need to be reset manually by calling resetPrevWindows()
 * @returns Promise that resolves into the document that got selected by the user
 */
async function selectDocument(expectedType, resetWindows = true) {
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
      if (resetWindows) resetPrevWindows();

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
            // console.log(expectedType);
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

//#endregion
