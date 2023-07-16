import { sceneMenu } from "./enrichers/sceneEnrichers.js";
import { patterns } from "./helpers.js";

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
