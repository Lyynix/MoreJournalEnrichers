import { getDocument, invalidHtml } from "../helpers.js";

export async function toc(match, options) {
  return tableOfContents(match, options, true);
}
export async function otoc(match, options) {
  return tableOfContents(match, options, false);
}

export async function tableOfContents(match, options, ordered) {
  // extract data from match
  var journalID = match[1] ? match[1] : options.relativeTo.parent._id;
  var headerOffset;
  switch (match[2]) {
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
  var journal;
  try {
    journal = await getDocument(journalID, "JournalEntry");
  } catch (error) {
    return $(invalidHtml(game.i18n.localize(error)))[0];
  }
  var pages = journal.pages
    .map((e) => e)
    .sort((a, b) => {
      return a.sort - b.sort;
    });

  var tocHtml = ``;
  // tocHtml += /* html */`
  // <style>
  //   .system-dsa5 .window-app .window-content .journal-entry-content .scrollable article .journal-page-content
  //   ul.no-list-style > li::before {
  //       display: none;
  //   }
  // </style>
  // `
  var prevTitleLevel = 0;
  pages.forEach((page) => {
    // add tags for different indentations
    if (prevTitleLevel < page.title.level) {
      for (let i = 0; i < page.title.level - prevTitleLevel; i++) {
        if (ordered)
          tocHtml += /* html */ `
            <ul style="
                  list-style: none;
                  font-size: ${
                    (7 - (page.title.level + headerOffset)) * 2 + 6
                  }pt" 
                class="no-list-style">
          `;
        else
          tocHtml += /* html */ `
            <ol style="font-size: ${
              (7 - (page.title.level + headerOffset)) * 2 + 6
            }pt">
          `;
      }
    } else if (prevTitleLevel > page.title.level) {
      for (let i = 0; i < prevTitleLevel - page.title.level; i++) {
        if (ordered)
          tocHtml += /* html */ `
            </ul>
          `;
        else
          tocHtml += /* html */ `
            </ol>
          `;
      }
    }

    // add reference
    tocHtml += /* html */ `
      <li>
        <a class="LMJE-no-link content-link"
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

  if (ordered)
    tocHtml += /* html */ `
      </ul>
    `;
  else
    tocHtml += /* html */ `
      </ol>
    `;

  // console.log(tocHtml);
  // console.log($(tocHtml)[0]);

  return $(tocHtml)[0];
}
