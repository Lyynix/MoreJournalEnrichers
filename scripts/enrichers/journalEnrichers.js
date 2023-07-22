import { invalidHtml } from "../helpers.js";

export async function toc(match, options) {
  // extract data from match
  var journalID = match[3] ? match[3] : options.relativeTo.parent._id;
  var headerOffset;
  switch (match[5]) {
    case "big":
      headerOffset = 0;
      break;
    case "bigger":
      headerOffset = 1;
      break;
    case "medium":
      headerOffset = 2;
      break;
    case "smaller":
      headerOffset = 3;
      break;
    case "small":
      headerOffset = 4;
      break;

    default:
      headerOffset = 0;
      break;
  }

  // get referenced pages
  var journal = game.journal.get(journalID);
  if (!journal) return $(invalidHtml("invalid journalID"))[0];
  var pages = journal.pages
    .map((e) => e)
    .sort((a, b) => {
      return a.sort - b.sort;
    });

  var tocHtml = ``;
  var prevTitleLevel = 0;
  pages.forEach((page) => {
    // add tags for different indentations
    if (prevTitleLevel < page.title.level) {
      for (let i = 0; i < page.title.level - prevTitleLevel; i++) {
        tocHtml += /* html */ `
          <ul style="list-style: none;">
        `;
      }
    } else if (prevTitleLevel > page.title.level) {
      for (let i = 0; i < prevTitleLevel - page.title.level; i++) {
        tocHtml += /* html */ `
          </ul>
        `;
      }
    }

    // add reference
    tocHtml += /* html */ `
      <li>
        <a class="content-link"
          style="background: none; border: none; font-size: ${
            (7 - (page.title.level + headerOffset)) * 2 + 6
          }pt"
          data-uuid="JournalEntry.${journal._id}.JournalEntryPage.${page._id}"
          data-id="${page._id}"
          data-type="JournalEntryPage"
          data-tooltip="${journal.name}: ${page.name}">
            ${page.name}
        </a>
      </li>
    `;

    prevTitleLevel = page.title.level;
  });

  tocHtml += /* html */ `
    </ul>
  `;

  return $(tocHtml)[0];
}
