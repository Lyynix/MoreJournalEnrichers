import { templates } from "./helpers.js";

export function initProsemirrorButtons() {
  Hooks.on("getProseMirrorMenuDropDowns", (proseMirrorMenu, dropdowns) => {
    // console.log("LMJE |", proseMirrorMenu, dropdowns);

    let options = {
      prosemirror: proseMirrorMenu,
    };

    dropdowns.journalEnrichers = {
      cssClass: "enricher",
      // icon: '<i class="fa-solid fa-wand-magic"></i>',
      title: "Enricher",
      entries: [
        {
          title: "Table of Content",
          action: "toc",
          cmd: functions.insertToC.bind(options),
        },
      ],
    };
  });
}

async function selectDocument(expectedType) {
  // array to store all maximized windows
  let prevMaximized = []
  let prevWindows = []

  // loop over all windows
  Object.values(ui.windows).forEach(async (w) => {
    prevWindows.push(w)
    if (w._minimized) return

    // add maximized window and position to list
    prevMaximized.push({
      window: w,
      position: { ...w.position },
      minimized: w._minimized,
      id: w.id,
    });

    // minimize window and move to top left
    await w.maximize()
    w.setPosition({ ...w.position, ...{ left: 0, top: 0 } });
    w.minimize();
  });

  let promiseResolve;
  let promiseReject;
  let result = new Promise((resolve, reject) => {
    promiseResolve = resolve;
    promiseReject = reject;
  });

  // Hooks on open Document Sheet (needs to be edited)
  Hooks.once("renderDocumentSheet", (config, dom, options) => {
    setTimeout(
      () => {
        Object.values(ui.windows).forEach(window => {
          let included = false
          prevWindows.forEach(prevWindow => {
            if (window.id === prevWindow.id) {
              included = true;
              // console.log("windows have same id: ", window, prevWindow)
            }

          })
          if (!included) window.close() 
        });

        prevMaximized.forEach((prev) => {
          prev.window.setPosition(prev.position);
          if (!prev.minimized) prev.window.maximize();
        });
    
        if (config.document.documentName === expectedType) {
          promiseResolve(config.document);
        } else {
          promiseReject("Wrong Type");
        }
      },
      500
    )
  });

  return result;
}

var functions = {
  prosemirror: null,
  insertToC: function () {
    // console.log("LMJE |", this.prosemirror);
    selectDocument("JournalEntry")
      .then((document) => {
        // console.log(document);
        this.prosemirror.view.dispatch(
          this.prosemirror.view.state.tr
            .insertText(`@ToC[${document.uuid}]`)
            .scrollIntoView()
        );
      })
      .catch((reason) => {
        ui.notifications.warn("Test Warning: " + reason);
      });
  },
};
