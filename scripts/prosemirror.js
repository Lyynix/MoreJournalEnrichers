import { templates } from "./helpers.js";

var functions = {
  prosemirror: null,
  insertToC: async function () {
    console.log("LMJE |", this.prosemirror);

    let prevWindows = []

    Object.values(ui.windows).forEach(w => {
      // check if window is maximized
      if (w._minimized) return;
      // add maximized window and position to list
      prevWindows.push({
        window: w,
        position: { ...w.position }
      })

      w.minimize();
      w.setPosition({ ...w.position, ...{left: 0, top: 0} })
    })

    setTimeout(() => {
      prevWindows.forEach(prev => {
        prev.window.setPosition(prev.position)
        prev.window.maximize()
      })
    }, 2000)

    this.prosemirror.view.dispatch(
      this.prosemirror.view.state.tr
        .insertText(`@ToC[${await navigator.clipboard.readText()}]`)
        .scrollIntoView()
    );
  },
};

export function initProsemirrorButtons() {
  // Hooks.on("createProseMirrorEditor", (...args) => {
  //   console.log("LMJE |", args)
  // })
  // Hooks.on("getProseMirrorMenuItems", (...args) => {
  //   console.log("LMJE |", args)
  // })
  Hooks.on("getProseMirrorMenuDropDowns", (proseMirrorMenu, dropdowns) => {
    console.log("LMJE |", proseMirrorMenu, dropdowns);

    let options = {
      prosemirror: proseMirrorMenu,
    };

    dropdowns.journalEnrichers = {
      cssClass: "enricher",
      // icon: '<i class="fa-solid fa-wand-magic"></i>',
      title: "Enricher",
      entries: [
        {
          action: "table of content",
          active: false,
          group: 1,
          title: "Table of Content",
          cmd: functions.insertToC.bind(options),
        },
      ],
    };
  });
}

class InsertEnrichFVerForm extends FormApplication {
  constructor(options) {
    super();
    this.options = options;
  }

  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["form"],
      height: 200,
      width: 400,
      popOut: true,
      template: templates.prosemirror.insertEnricher,
      id: "insert-enricher",
      title: "LMJE.PROSEMIRROR.InsertEnricher",
    });
  }

  async _updateObject() {
    this.render();
  }
}
