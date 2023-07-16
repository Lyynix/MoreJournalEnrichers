import { sceneMenu } from "./enrichers/sceneEnrichers.js";
import { patterns } from "./helpers.js";

export function initConvertion() {
  Hooks.on("getJournalSheetHeaderButtons", (sheet, buttons) => {
    if (!sheet.options.editable) return;
    if (sheet.object.ownership[game.userId] != 3) return;

    var journalID = sheet.object._id;

    try {
      buttons.unshift({
        class: "lmje-convert",
        icon: "fas fa-arrow-progress",
        onclick: async () => {
          try {
            convertJournal(journalID);
            console.log(`LMJE | Converted journal "${journalID}" into new journal`)
          } catch (error) {
            console.error(`LMJE | Failed to convert journal "${journalID}"`)
          }
        },
      });
      console.log("LMJE | Added convertion button");
    } catch (error) {
      console.error("LMJE | Failed to add convertion button\n", error);
    }
  });

  Hooks.on("renderJournalSheet", (obj, html, data) => {
    html
      .find(".lmje-convert")
      .attr(
        "data-tooltip",
        game.i18n.localize("LMJE.CONVERT.Tooltip") +
          "<br><b style='color: gold'>" +
          game.i18n.localize("LMJE.CONVERT.TooltipWarning") +
          "<b>"
      );
  });
}

export async function convertJournal(journalID) {
  var journal = game.journal.get(journalID);

  // create new Journal with the data of original
  var newJournal = {
    name: `${journal.name} - ${game.i18n.localize("LMJE.CONVERT.NameSuffix")}`,
    folder: journal.folder,
    ownership: journal.ownership,
    flags: journal.flags,
    _stats: journal._stats,
  };
  var newJournalDocument = await JournalEntry.create(newJournal);

  // iterate over pages to create copies
  journal.pages.forEach(async (page) => {
    var oldContent = page.text.content;

    // change content of page
    var newContent =
      oldContent + "<p><strong>This Content has been edited!!!</strong></p>";

    // create new Page
    var newPage = {
      sort: page.sort,
      name: page.name,
      type: page.type,
      title: page.title,
      text: {
        format: page.text.format,
        content: newContent,
        markdown: page.text.markdown,
      },
    };
    var newPageDocument = await newJournalDocument.createEmbeddedDocuments(
      "JournalEntryPage",
      [newPage]
    );
  });
}
