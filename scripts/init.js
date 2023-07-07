// Module specific code goes here. See https://foundryvtt.com/article/module-development/ for help.
export function invalidHtml(error) {
  return /* html */ `
    <a class="content-link broken" draggable="true" data-id="null" data-uuid="asd">
      <i class="fas fa-unlink"></i>LMJE: ${error}
    </a>
  `;
}

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
      pattern: /(@ToC)(\[([a-zA-Z0-9]+)\])?(\{(big|bigger|medium|smaller|small)?\})?/g,
      enricher: async (match, options) => {

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
    //#region @InlineScene[sceneID]{alias}
    {
      pattern: /@InlineScene\[([a-zA-Z0-9]+)\](\{(.+)\})?/g,
      enricher: async (match, options) => {
        var uuid = match[1];
        var sceneDocument = game.scenes.get(uuid);
        if (!sceneDocument) return $(invalidHtml("invalid sceneID"))[0];

        console.log(match);

        var sceneName =
          match[2] === undefined
            ? sceneDocument.navName
              ? `${sceneDocument.navName} (${sceneDocument.name})`
              : sceneDocument.name
            : match[3];

        var sceneHtml = /* html */ `
        <i style="
          border: 1px var(--color-border-dark-tertiary) solid;
          border-radius: 3px;
          padding: 1px 4px;
          margin-right: 0.3em;

          white-space: nowrap;
          word-break: break-all;

          background: #DDD;
        ">
        ${sceneName}
        <a 
          title="${game.i18n.localize("LMJE.SCENEMENU.Tooltip.Show")}" 
          onclick="
            game.scenes.get('${uuid}')?.view(); 
            return false;
          ">
            <i class="fas fa-eye" style="margin-left: 4px; color: var(--color-text-dark-inactive);"></i>
        </a>
        <a 
          title="${game.i18n.localize("LMJE.SCENEMENU.Tooltip.Activate")}" 
          onclick="
            game.scenes.get('${uuid}')?.activate(); 
            return false;
          ">
            <i class="fas fa-bullseye" style="color: var(--color-text-dark-inactive);"></i>
        </a>
        <a 
          title="${game.i18n.localize("LMJE.SCENEMENU.Tooltip.ToggleNav")}" 
          onclick="
            var document = game.scenes.get('${uuid}'); 
            document.update({navigation: !document.navigation})
            return false;
          ">
            <i class="fas fa-compass" style="color: var(--color-text-dark-inactive);"></i>
        </a>
        <a 
          title="${game.i18n.localize("LMJE.SCENEMENU.Tooltip.Edit")}" 
          onclick="
            new SceneConfig(game.scenes.get('${uuid}')).render(true);
            return false;
          ">
            <i class="fas fa-cogs" style="color: var(--color-text-dark-inactive);"></i>
        </a>
        </i>
        `;

        return $(sceneHtml)[0];
      },
    },
    //#endregion
    //#region @Playlist[playlistID]{alias}
    {
      pattern: /@Playlist\[(\s*[a-zA-Z0-9]+)\](\{(.+)\})?/g,
      enricher: async (match, options) => {
        var uuid = match[1];
        var playlist = game.playlists.get(uuid);
        if (!playlist) return $(invalidHtml("invalid playlistID"))[0];

        var playlistName = match[2] === undefined ? playlist.name : match[3];

        var html = /* html */ `
        <i style="
          border: 1px var(--color-border-dark-tertiary) solid;
          border-radius: 3px;
          padding: 1px 4px;
          margin-right: 0.3em;

          white-space: nowrap;
          word-break: break-all;

          background: #DDD;
        ">
        ${playlistName}
        <a 
          title="${game.i18n.localize("LMJE.PLAYLIST.Tooltip.PlayPause")}" 
          onclick="
            var playlist = game.playlists.get('${uuid}')
            playlist?.playing ? playlist.stopAll() : playlist.playAll(); 
            return false;
          "> 
            <i class="fas fa-play-pause" style="margin-left: 4px; color: var(--color-text-dark-inactive);"></i>
        </a> 
        <a 
          title="${game.i18n.localize("LMJE.PLAYLIST.Tooltip.FastForward")}" 
          onclick="
          game.playlists.get('${uuid}')?.playNext(); 
            return false;
          "> 
            <i class="fas fa-forward-fast" style="color: var(--color-text-dark-inactive);"></i>
        </a>
        </i>
        `;

        return $(html)[0];
      },
    },
    //#endregion
    //#region @PlaylistMenu
    {
      pattern: /@PlaylistMenu\[((\s*[a-zA-Z0-9]+)+\s*?)\]/g,
      enricher: async (match, options) => {
        const uuids = match[1].split(/\s+/g);

        var menuHtml = /* html */ `
      <table>
        <tr>
          <td colspan="2">${game.i18n.localize("LMJE.PLAYLIST.Title")}</td>
        </tr>
      `;

        for (var i = 0; i < uuids.length; i++) {
          var uuid = uuids[i];

          var playlistDocument = game.playlists.get(uuid);
          if (!playlistDocument) continue;

          var playlistName = playlistDocument.name;

          var playlistControl = /* html */ `
          <a 
            title="${game.i18n.localize("LMJE.PLAYLIST.Tooltip.PlayPause")}" 
            onclick="
              var playlist = game.playlists.get('${uuid}')
              playlist?.playing ? playlist.stopAll() : playlist.playAll(); 
              return false;
            "> 
              <i class="fas fa-play-pause" style="margin: 5px"></i>
          </a> 
          <a 
            title="${game.i18n.localize("LMJE.PLAYLIST.Tooltip.FastForward")}" 
            onclick="
            game.playlists.get('${uuid}')?.playNext(); 
              return false;
            "> 
              <i class="fas fa-forward-fast" style="margin: 5px"></i>
          </a>
          <a 
            title="${game.i18n.localize("LMJE.PLAYLIST.Tooltip.Edit")}" 
            onclick="
              new PlaylistConfig(game.playlists.get('${uuid}')).render(true);
              return false;
            ">
              <i class="fas fa-cogs" style="margin: 5px"></i>
          </a>
        `;

          menuHtml += /* html */ `    
        <tr>
          <td>${playlistName}</td>
          <td style="display: flex; justify-content: flex-end">${playlistControl}</td>
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
    //#region @Whisper
    {
      pattern: /@Whisper(\[([a-zA-Z0-9]+)\])?\{([\s\S]+?)\}/gm,
      enricher: async (match, options) => {
        var whisperTarget = match[2]
        var selectWhisperTarget = match[2] === undefined
        var message = match[3]

        console.log({
          target: whisperTarget,
          needs_to_be_selected: selectWhisperTarget,
          whisperMessage: message,
        })

        // fa-walkie-talkie
        var html = /* html */ `
        <table>
          <tr>
            <th>
              ${game.i18n.localize("LMJE.WHISPER.Title")}
            </th>
            <th>
              <a onclick="
                var message = document.getElementById('LMJE-Whisper_Message').textContent.trim()
                console.log(message)
              ">
                <i class="fas fa-message"></i> 
              </a>
            </th>
          </tr>
          <tr>
            <td colspan="2" id="LMJE-Whisper_Message">
              ${message}
            </td>
          </tr>
        </table>
        `

        return $(html)[0]
      }
    },
    //#endregion
  );
});
