// Module specific code goes here. See https://foundryvtt.com/article/module-development/ for help.

Hooks.on("init", () => {
  console.log("LMJE | Initializing generic enrichers");

  CONFIG.TextEditor.enrichers.push(
    //#region @SceneMenu[...]
    {
      pattern: /@SceneMenu\[((\s*[a-zA-Z0-9]+)+\s*?)\]/g,
      enricher: async (match, options) => {
        const uuids = match[1].split(/\s+/g);

        var menuHtml = /* html */ `
      <table>
        <tr>
          <td colspan="2">${game.i18n.localize("LMJE.SCENEMENU.Title")}</td>
        </tr>
      `;

        for (var i = 0; i < uuids.length; i++) {
          var uuid = uuids[i];

          var sceneDocument = game.scenes.get(uuid);
          if (!sceneDocument) continue;

          var sceneName = sceneDocument.navName
            ? `${sceneDocument.navName} (${sceneDocument.name})`
            : sceneDocument.name;

          var sceneControl = /* html */ `
        <a title="${game.i18n.localize(
          "LMJE.SCENEMENU.Tooltip.Show"
        )}" onclick="
          game.scenes.get('${uuid}')?.view(); 
          return false;
          ">
          <i class="fas fa-eye" style="margin: 5px"></i>
        </a>
        <a title="${game.i18n.localize(
          "LMJE.SCENEMENU.Tooltip.Activate"
        )}" onclick="
            game.scenes.get('${uuid}')?.activate(); 
            return false;
            ">
          <i class="fas fa-bullseye" style="margin: 5px"></i>
        </a>
        <a title="${game.i18n.localize(
          "LMJE.SCENEMENU.Tooltip.ToggleNav"
        )}" onclick="
            var document = game.scenes.get('${uuid}'); 
            document.update({navigation: !document.navigation})
            return false;
            ">
          <i class="fas fa-compass" style="margin: 5px"></i>
        </a>
        <a title="${game.i18n.localize(
          "LMJE.SCENEMENU.Tooltip.Edit"
        )}" onclick="
            new SceneConfig(game.scenes.get('${uuid}')).render(true);
            return false;
            ">
          <i class="fas fa-cogs" style="margin: 5px"></i>
        </a>
        `;

          menuHtml += /* html */ `    
        <tr>
          <td>${sceneName}</td>
          <td style="display: flex; justify-content: flex-end">${sceneControl}</td>
        </tr>
        `;
        }

        menuHtml += /* html */ `
      </table>
      `;

        return $(menuHtml)[0];
      },
    },
    //#endregion
    //#region @ToC
    {
      pattern: /(@ToC)(?!\[)/g,
      enricher: async (match, options) => {
        //console.log(options.relativeTo.parent);

        var tocHtml = ``;

        var journal = options.relativeTo.parent;
        var thisPageId = options.relativeTo._id;

        var pages = journal.pages
          .map((e) => e)
          .sort((a, b) => {
            return a.sort - b.sort;
          });
        //console.log(pages);

        var prevTitleLevel = 0;
        pages.forEach((page) => {
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
          tocHtml += /* html */ `
          <li>
            <a class="content-link"
              style="background: none; border: none; font-size: ${
                (4 - page.title.level) * 3 + 13
              }pt"
              data-uuid="JournalEntry.${journal._id}.JournalEntryPage.${
            page._id
          }"
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
      },
    },
    //#endregion
    //#region @ToC[journalID]
    {
      pattern: /@ToC\[(\s*[a-zA-Z0-9]+)\]/g,
      enricher: async (match, options) => {
        var tocHtml = ``;

        //console.log(match)
        var journal = game.journal.get(match[1]);

        var pages = journal.pages
          .map((e) => e)
          .sort((a, b) => {
            return a.sort - b.sort;
          });
        //console.log(pages);

        var prevTitleLevel = 0;
        pages.forEach((page) => {
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
          tocHtml += /* html */ `
          <li>
            <a class="content-link"
              style="background: none; border: none; font-size: ${
                (4 - page.title.level) * 3 + 13
              }pt"
              data-uuid="JournalEntry.${journal._id}.JournalEntryPage.${
            page._id
          }"
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
      },
    },
    //#endregion
    //#region @Playlist[playlistID]
    {
      pattern: /@Playlist\[(\s*[a-zA-Z0-9]+)\]/g,
      enricher: async (match, options) => {
        var playlist = game.playlists.get(match[1])

        console.log(playlist)

        var html = /* html */`
        <div>
        <a 
          class="content-link" 
          draggable="true" 
          data-uuid="Playlist.${match[0]}" 
          data-id="${match[0]}" 
          data-type="Playlist" 
          data-tooltip="Playlist"
          > 
            ${playlist.name}
        </a>
        <a> 
            <i class="fas fa-backward-fast"></i>
        </a> 
        <a> 
            <i class="fas fa-play-pause"></i>
        </a> 
        <a> 
            <i class="fas fa-forward-fast"></i>
        </a>
        </div>
        `

        return $(html)[0]
      }
    }
    //#endregion
  );
});
