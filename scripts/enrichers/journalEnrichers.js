import { getDocument, invalidHtml, templates } from "../helpers.js";

export async function insertPage(match, options) {
  var page;
  try {
    // Try to get JournalEntryPage with Reference from match[1] {}
    page = await getDocument(match[1], "JournalEntryPage");
  } catch (error) {
    // When failed, try to get journal from Reference at match[2] ()
    if (match[2] !== undefined) {
      try {
        // get Journal
        var journal = await getDocument(match[2], "JournalEntry");
        // try to get Page from Journal
        page = journal.pages.get(match[1]);
        if (page === undefined) page = journal.pages.getName(match[1]);
        if (page === undefined)
          // if no page is found, return error message
          return $(
            invalidHtml(
              "Page: " +
                game.i18n.localize("LMJE.SYSTEM.getDocument.noDocumentFound")
            )
          )[0];
      } catch (error) {
        // if no Journal is found, return error message
        return $(invalidHtml("Journal: " + game.i18n.localize(error)))[0];
      }
    } else {
      // if no match[2] () is given, return error message
      return $(invalidHtml(game.i18n.localize(error)))[0];
    }
  }

  if (options.relativeTo.uuid === page.uuid)
    return $(
      invalidHtml(game.i18n.localize("LMJE.SYSTEM.getDocument.selfReference"))
    )[0];

  switch (page.type) {
    case "text":
      var enrichedContent = await TextEditor.enrichHTML(page.text.content);
      console.log("LMJE | enriched Page", $(enrichedContent));
      var decodedHtml = await TextEditor.decodeHTML(enrichedContent);
      console.log("LMJE | decoded HTML", decodedHtml);

      return $(/* html */`
        <table class="LMJE-Table LMJE-PageMedia">
          <tr>
            <th align="left">
              <i class="fas fa-text"></i>
              <a class="content-link LMJE-no-link"
                draggable="false"
                data-uuid="${page.uuid}" 
                data-id="${page.id}" 
                data-type="${page.documentName}">
                ${page.name}
              </a>
            </th>
          </tr>
          <tr>
            <th class="LMJE-Table-body">
              <div class="LMJE-InsertPage">
                ${decodedHtml}
              </div>
            </th>
          </tr>
        </table>`)[0];

    case "image":
      return $(/* html */ `
      <table class="LMJE-Table LMJE-PageMedia">
        <tr>
          <th align="left">
            <i class="fas fa-image"></i>
            <a class="content-link LMJE-no-link"
              draggable="false"
              data-uuid="${page.uuid}" 
              data-id="${page.id}" 
              data-type="${page.documentName}">
              ${page.name}
            </a>
          </th>
        </tr>
        <tr>
          <th class="LMJE-Table-body">
            <figure>
              <img src="${page.src}" alt="${page.name}">
              <figcaption>${page.image.caption}</figcaption>
            </figure> 
          </th>
        </tr>
      </table>`)[0];

    case "video":
      return $(/* html */ `
      <table class="LMJE-Table LMJE-PageMedia">
        <tr>
          <th align="left">
            <i class="fas fa-video"></i>
            <a class="content-link LMJE-no-link"
              draggable="false"
              data-uuid="${page.uuid}" 
              data-id="${page.id}" 
              data-type="${page.documentName}">
              ${page.name}
            </a>
          </th>
        </tr>
        <tr>
          <th class="LMJE-Table-body">
            <figure class="flex-ratio">
              <video
                src="${page.src}" 
                ${page.video.controls ? `controls=""` : ``}
                ${page.video.autoplay ? `autoplay=""` : ``}
                ${page.video.loop ? `loop=""` : ``}"></video>
            </figure>
          </th>
        </tr>
      </table>`)[0];

    default:
      return $(
        invalidHtml(
          game.i18n.localize("LMJE.JOURNAL.PAGE.pageTypeNotSupported")
        )
      )[0];
  }
}

export function variable(match, options) {
  var vars = game.settings.get("lyynix-more-journal-enrichers", "variables");
  var val = vars[match[1]];
  if (val !== undefined) return vars[match[1]];
  else
    return $(
      invalidHtml(game.i18n.localize("LMJE.JOURNAL.VARIABLE.keyNotFound"))
    )[0];
}

export function editVariables() {
  var vars = game.settings.get("lyynix-more-journal-enrichers", "variables");

  renderTemplate(templates.journal.editVariables, { keys: vars.keys }).then(
    (html) => {
      var dialog = new Dialog({
        title: game.i18n.localize(
          "LMJE.JOURNAL.VARIABLE.editVariablesDialog.title"
        ),
        content: html,
        buttons: {
          submit: {
            label: game.i18n.localize(
              "LMJE.JOURNAL.VARIABLE.editVariablesDialog.submit"
            ),
            callback: () => {
              var vars = game.settings.get(
                "lyynix-more-journal-enrichers",
                "variables"
              );

              var key = document.getElementById("LMJE_key").value;
              var value = document.getElementById("LMJE_val").value;
              vars[key] = value;
              if (!vars.keys.includes(key)) vars.keys.push(key);

              game.settings.set(
                "lyynix-more-journal-enrichers",
                "variables",
                vars
              );
              ui.notifications.info(
                game.i18n.localize(
                  "LMJE.JOURNAL.VARIABLE.editVariablesDialog.submitResponse"
                )
              );
              console.log("LMJE | Variables updated");
            },
            icon: `<i class="fas fa-save"></i>`,
          },
          delete: {
            label: game.i18n.localize(
              "LMJE.JOURNAL.VARIABLE.editVariablesDialog.delete"
            ),
            callback: () => {
              var vars = game.settings.get(
                "lyynix-more-journal-enrichers",
                "variables"
              );
              var key = document.getElementById("LMJE_key").value;

              var newKeys = vars.keys.filter((value) => {
                return value !== key;
              });
              vars.keys = newKeys;

              vars[key] = undefined;

              game.settings.set(
                "lyynix-more-journal-enrichers",
                "variables",
                vars
              );
              ui.notifications.info(
                game.i18n.localize(
                  "LMJE.JOURNAL.VARIABLE.editVariablesDialog.deleteResponse"
                )
              );
              console.log("LMJE | Variable removed");
            },
            icon: `<i class="fas fa-x"></i>`,
          },
        },
        default: "submit",
      }).render(true);
    }
  );
}

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
          data-uuid="${page.uuid}"
          data-id="${page._id}"
          data-type="JournalEntryPage"
          data-tooltip="${journal.name}: ${page.name}"
          style="white-space: normal;">
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
